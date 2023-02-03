import { Markup } from "telegraf";
import { ExtraEditMessageText } from "telegraf/typings/telegram-types";
import UserConrtoller from "../../Controller/User/UserController";
import VocbularController from "../../Controller/Vocabular/VocabularController";
import { MyContext } from "../../Model";
import ModerationModel, { ModerationInterface } from "../../Model/Moderation/IModeration";
import { IRussianTranslate, IRussianTranslates } from "../../Model/Translate/IRussianTranslates";
import { ObjectId } from "mongodb";
import IUser from "../../Model/User/IUserModel";

export default class vocabular_scene {

    static async greeting(ctx: MyContext) {

        let message: string = `Словарь представляет собой набор слов и их определений. \n\n<b>Это важный справочный инструмент для людей</b>, `
        message += `изучающих новый язык или ищущих значение незнакомого слова. \n`
        // message += `<i>Словарь помогает людям расширить словарный запас и улучшить понимание языка.</i>`

        const extra: ExtraEditMessageText = {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Добавить перевод',
                            callback_data: 'add'
                        }
                    ],
                    [
                        {
                            text: 'Слова на модерации',
                            callback_data: 'moderation'
                        }
                    ],
                    [
                        {
                            text: 'Назад',
                            callback_data: 'home'
                        },
                        {
                            text: 'Настройки',
                            callback_data: 'settings'
                        },
                    ],
                ]
            }
        }

        try {

            if (ctx.updateType == 'callback_query') {

                ctx.editMessageText(message, extra)
                ctx.answerCbQuery()
                ctx.wizard.selectStep(0)

            } else if (ctx.updateType == 'message') {
                ctx.reply(message, extra)
            }

        } catch (err) {
            console.log(err)
        }
    }

    static async moderation(ctx: MyContext) {
        try {

            if (await VocbularController.check_on_exists_moderation(ctx)) {

                if (ctx.scene.session.cursor) {
                    ctx.scene.enter('vocabular')
                }

                return ctx.answerCbQuery('У вас нет слов на модерации')

            } else {

                let words = await VocbularController.get_words_on_moderation(ctx)
                let message = 'Слова на проверке \n'
                let pages_per_row = 4
                let posts_per_page = 5

                let activePage: number | false = await VocbularController.get_page(ctx)
                let words_on_page: string[]

                if (activePage) {
                    message += `Страница ${activePage}/${Math.ceil(words.length / posts_per_page)} \n`

                    activePage--

                    words_on_page = await VocbularController.get_words_for_page_fixed(ctx, posts_per_page, activePage)
                    console.log(words_on_page)
                } else {
                    message += `Страница 1/${Math.ceil(words.length / posts_per_page)} \n`
                    words_on_page = await VocbularController.get_words_for_page(ctx, posts_per_page, 0)
                }

                message += `<b>Найдено: ${words.length}</b> \n\n`

                for (let i = 0; words_on_page.length > i; i++) {

                    let word: ModerationInterface = await VocbularController.get_word_on_moderation(ctx, words_on_page[i])
                    if (activePage) {
                        message += `${((activePage) * posts_per_page) + 1 + i}) ${word.russian_translate.name} — ${word.buryat_translate.name}\n`
                    }
                }

                let extra: ExtraEditMessageText = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: []
                    }
                }

                let row = []


                for (let i = 0; i < Math.ceil(words.length / posts_per_page); i++) {

                    if (i % pages_per_row == 0 && Math.ceil(words.length / posts_per_page) > 1) {
                        row = []
                        extra.reply_markup.inline_keyboard.push(row)
                        // extra.reply_markup.inline_keyboard.push(row)
                    }

                    if (activePage == i - 1) {
                        row.push({
                            text: `${i + 1}`,
                            callback_data: `page active`
                        })
                    } else {
                        row.push({
                            text: `${i + 1}`,
                            callback_data: `page ${i + 1}`
                        })
                    }
                }

                console.log(row)

                let arrows = []
                arrows.push({
                    text: 'Предыдущая страница',
                    callback_data: 'prev'
                })
                arrows.push({
                    text: 'Следующая страница',
                    callback_data: 'next'
                })

                // extra.reply_markup.inline_keyboard.push(arrows)
                extra.reply_markup.inline_keyboard.push([{
                    // text: '« назад',
                    text: 'Назад',
                    callback_data: 'back'
                }])

                let temp: ModerationInterface = await VocbularController.get_word_on_moderation(ctx, words_on_page[2])

                message += `\nОтправьте <b>номер</b> строки, чтобы отредактировать его`
                // message += `\nНапример чтобы получить <i><pre>3) ${temp.russian_translate.name} — ${temp.buryat_translate.name}, надо отправить сообщение содержащее 3</pre></i>`
                if (ctx.updateType == 'callback_query') {
                    await ctx.editMessageText(message, extra)
                } else if (ctx.updateType == 'message') {
                    await ctx.reply(message, extra)
                }

                ctx.answerCbQuery()
                ctx.wizard.selectStep(4)
                // render
            }
        } catch (err) {
            // err
        }
    }

    static async moderation_handler(ctx: MyContext) {
        try {
            if (ctx.updateType == 'callback_query') {


                // если нажатая кнопка является элементом пагинации
                if (ctx.update["callback_query"].data.indexOf('active') !== -1) {
                    return ctx.answerCbQuery('Вы на этой странице')
                }

                if (ctx.update["callback_query"].data.indexOf('page') == 0) {
                    console.log(ctx.update["callback_query"].data)
                    await VocbularController.set_page(ctx)

                    let page = parseInt(ctx.update["callback_query"].data.split(' ')[1])
                    let posts_per_page = 5
                    let words_on_page = await VocbularController.get_words_for_page(ctx, posts_per_page, page - 1)

                    let words = await VocbularController.get_words_on_moderation(ctx)
                    let message = 'Слова на проверке \n'
                    let activePage: number | false = await VocbularController.get_page(ctx)

                    if (activePage) {
                        message += `Страница ${activePage}/${Math.ceil(words.length / posts_per_page)} \n`
                    } else {
                        message += `Страница ${page * posts_per_page} - ${page * posts_per_page + posts_per_page}/${Math.ceil(words.length / posts_per_page)} \n`
                    }

                    message += `<b>Показано: ${posts_per_page * page + 1 - posts_per_page}-${((posts_per_page) * page) - (posts_per_page - words_on_page.length)}/${words.length}</b>`
                    let extra: ExtraEditMessageText = {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: []
                        }
                    }

                    let row = []

                    let pages_per_row = 4
                    for (let i = 0; i < Math.ceil(words.length / posts_per_page); i++) {

                        if (i % pages_per_row == 0) {
                            row = []
                            extra.reply_markup.inline_keyboard.push(row)
                            // extra.reply_markup.inline_keyboard.push(row)
                        }

                        if (page) {
                            if (page - 1 == i) {
                                row.push({
                                    text: `${page}`,
                                    callback_data: `page active`
                                })
                            } else {
                                row.push({
                                    text: `${i + 1}`,
                                    callback_data: `page ${i + 1}`
                                })
                            }
                        } else {
                            row.push({
                                text: `${i + 1}`,
                                callback_data: `page ${i + 1}`
                            })
                        }
                    }

                    message += '\n\n'

                    for (let i = 0; i < words_on_page.length; i++) {

                        let word: ModerationInterface = await VocbularController.get_word_on_moderation(ctx, words_on_page[i])
                        message += `${((posts_per_page * page) - posts_per_page) + i + 1}) ${word.buryat_translate.name} — ${word.russian_translate.name} \n`

                    }

                    extra.reply_markup.inline_keyboard.push([{
                        text: '« назад',
                        callback_data: 'back'
                    }])

                    message += `\nОтправьте <b>номер</b> строки, чтобы отредактировать его`

                    await ctx.editMessageText(message, extra)
                    ctx.answerCbQuery()
                }

                if (ctx.update["callback_query"].data == 'back') {
                    await this.greeting(ctx)
                }

                ctx.answerCbQuery()
            }

            if (ctx.updateType == 'message') {

                let index: number = parseFloat(ctx.update["message"].text)
                let all_words = await VocbularController.get_words_on_moderation(ctx)

                if (index < 1) {
                    await ctx.reply('Вы ввели недопустимое значение!')
                    return await this.moderation(ctx)
                }

                if (index > all_words.length) {
                    await ctx.reply('Вы ввели значение превышающее количества ваших слов находящихся на проверке')
                    return await this.moderation(ctx)
                }

                if (isNaN(index)) {
                    await ctx.reply(`Пожалуйста, отправьте числовое значение в пределах <b>от 1 до ${all_words.length}</b>`, { parse_mode: 'HTML' })
                    return await this.moderation(ctx)
                }

                let words: string[] = await this.get_words_on_page(ctx)
                let str: string = words[index - 1]
                let translate: ModerationInterface = await VocbularController.get_word_on_moderation(ctx, str)

                await UserConrtoller.save_selected_word(ctx, str)

                let message: string = '';
                // @ts-ignore
                message += `${translate.buryat_translate.name} — ${translate.russian_translate.name}`
                message += `\n<code>Дата создания: ${translate.createdAt}</code>`
                await ctx.reply(message, {
                    parse_mode: 'HTML', reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Удалить',
                                    callback_data: 'delete'
                                }
                            ],
                            [
                                {
                                    text: 'Назад',
                                    callback_data: 'back'
                                }
                            ]
                        ]
                    }
                });

                ctx.wizard.selectStep(5)
            }

        } catch (err) {
            console.log(err)
        }
    }

    static async get_words_on_page(ctx: MyContext) {
        let activePage: number | false = await VocbularController.get_page(ctx)
        let words_on_page: string[]
        let words = await VocbularController.get_words_on_moderation(ctx)
        // let pages_per_row = 4
        // let posts_per_page = 5

        // if (activePage) {
        //     words_on_page = await VocbularController.get_words_for_page(ctx, posts_per_page, activePage)
        // } else {
        //     words_on_page = await VocbularController.get_words_for_page(ctx, posts_per_page, 0)
        // }
        
        console.log('words ' + words)
        return words
    }

    static async word_handler(ctx: MyContext) {
        try {
            if (ctx.updateType == 'callback_query') {
                if (ctx.update['callback_query'].data == 'back') {
                    ctx.wizard.selectStep(4)
                    await this.moderation(ctx)
                }

                if (ctx.update["callback_query"].data == 'delete') {

                    await UserConrtoller.delete_selected_word(ctx)
                    ctx.answerCbQuery('Запись удалена из базы данных')
                    await this.moderation(ctx)

                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    static async remove_moderation(ctx: MyContext, str: string) {

        try {

            await ModerationModel.findByIdAndDelete({
                _id: new ObjectId(str)
            })

        } catch (err) {

            console.log(err)

        }

    }

    static async rules(ctx: MyContext) {
        try {
            if (ctx.updateType == 'callback_query') {

                let rules = `Правила \n\n`
                let extra: ExtraEditMessageText = {
                    parse_mode: 'HTML'
                }

                if (ctx.update['callback_query'].data == 'rules') {
                    await ctx.editMessageText(rules, extra)
                    await ctx.reply('Ознакомились с правилами?', Markup.keyboard([['Да, всё понятно']]).resize().oneTime())
                    return ctx.answerCbQuery()
                }

                if (ctx.update["callback_query"].data == 'back') {
                    await vocabular_scene.greeting(ctx)
                    ctx.wizard.selectStep(0)
                    return ctx.answerCbQuery()
                }

                if (ctx.update["callback_query"].data == 'start__') {
                    await this.render_add_words(ctx)
                }

                return ctx.answerCbQuery('Данной команды не найдено')

            }

            if (ctx.updateType == 'message') {
                await this.add_word(ctx)
            }
        } catch (err) {
            console.log(err)
        }
    }

    static async render_add_words(ctx: MyContext) {

        try {
            Markup.removeKeyboard()
            await VocbularController.reset_middleware(ctx)

            if (ctx.updateType == 'callback_query') {
                ctx.answerCbQuery()
                await ctx.editMessageText('Отправьте слово или фразу на <b>бурятском языке</b>', { parse_mode: 'HTML' })
            }

            if (ctx.updateType == 'message') {
                await ctx.reply('Отравьте слово')
            }

            ctx.wizard.selectStep(2)
        } catch (err) {

            //

        }

    }

    static async getting_tranlsates(ctx: MyContext) {
        try {
            if (ctx.updateType == 'message') {

                let word = ctx.update['message'].text
                let extra: ExtraEditMessageText = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: '« назад',
                                    callback_data: 'back'
                                }
                            ]
                        ]
                    }
                }

                // console.log(word)
                await VocbularController.insert_middleware(ctx)
                await VocbularController.get_translates(ctx).then(async (result: IRussianTranslates) => {

                    if (result) {
                        if (result.translates.length) {

                            await ctx.reply(`<b>${word}</b> существует в базе данных`, extra)

                            let str: string = ``
                            result.translates.forEach(async (element: IRussianTranslate, index: number) => {

                                if (index == result.translates.length - 1) {
                                    str = str + element.name
                                    return
                                }

                                str = str + element.name + ', '
                            })

                            await ctx.reply(str, { parse_mode: 'HTML' })
                            await ctx.reply(`<b>Можете отправить перевод к веденному тексту:</b> ${word}`, extra)
                        } else {
                            await ctx.reply(`<b>${word}</b> записан в базу данных`, { parse_mode: 'HTML' })
                            await ctx.reply(`<b>Теперь отправьте перевод к веденному тексту:</b> ${word}`, { parse_mode: 'HTML' })
                        }


                    } else {
                        await ctx.reply(`<b>${word}</b> записан в базу данных`, { parse_mode: 'HTML' })
                        await ctx.reply(`<b>Теперь отправьте перевод к веденному тексту:</b> ${word}`, { parse_mode: 'HTML' })
                    }
                })

                ctx.wizard.next()

            }
        } catch (err) {
            //
        }
    }

    static async set_translates(ctx: MyContext) {

        try {

            // Пользователь отправляет перевод слова
            if (ctx.updateType == 'message') {

                // сохраняем в промежуточный обработчик слово
                await VocbularController.insert_middleware_translate(ctx)


                let translates: [IRussianTranslate] = await VocbularController.get_russian_translates_after_insert(ctx)
                let russian_translates_concat: string = ``
                translates.forEach((russian_translate: IRussianTranslate, index: number) => {
                    console.log(russian_translate.name)
                    if (index == 0) {
                        russian_translates_concat = russian_translate.name
                    } else if (translates.length == index) {
                        russian_translates_concat = russian_translates_concat + ' ' + russian_translate.name
                    } else {
                        russian_translates_concat = russian_translates_concat + ', ' + russian_translate.name
                    }
                })

                let message: string = `Список добавленных переводов \n`
                let buryat_translate = await VocbularController.get_buryat_translate_from_middleware(ctx)
                let russian_translates = await VocbularController.get_russian_translates_after_insert(ctx)
                for (let i = 0; i < russian_translates.length; i++) {
                    message += `${i+1}) ${buryat_translate.toLowerCase()} — ${russian_translates[i].name.toLowerCase()} \n`
                }

                let extra: ExtraEditMessageText = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Завершить добавление слов',
                                    callback_data: 'back'
                                }
                            ], [
                                {
                                    text: 'Модерация',
                                    callback_data: 'moderation'
                                }
                            ]
                        ]
                    }
                }

                await ctx.reply(message, extra)
            }

            // Пользователь нажимает на кнопку Завершить добавление слов
            if (ctx.updateType == 'callback_query') {
                let data = ctx.update["callback_query"].data

                if (data == 'moderation') {
                    await this.moderation(ctx)
                }

                if (data == 'end') {

                    await vocabular_scene.greeting(ctx)
                    await VocbularController.reset_middleware(ctx)
                    ctx.wizard.selectStep(0)
                    return ctx.answerCbQuery('Перевод сохранён в базу данных')
                }

                if (data == 'back') {
                    ctx.answerCbQuery('Введенные значения сохранены в базе данных')
                    return await this.add_word(ctx)
                    // ctx.wizard.selectStep(2)
                }

                ctx.answerCbQuery('Команда не найдена')

            }

            // проверка на существование, далее обработка!
        } catch (err) {

            console.log(err)

        }
    }

    static async render_settings(ctx: MyContext) {

        try {

            let title = 'Настройки'
            let extra: ExtraEditMessageText = {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [

                        ]
                    ]
                }
            }

            await UserConrtoller.get_settings(ctx)
                .then(async (data: { rules: boolean }) => {
                    if (!data.rules) {
                        extra.reply_markup.inline_keyboard.push([
                            {
                                text: 'Проверка на ознакомление с правилами ✅',
                                callback_data: 'toggle_rules'
                            }
                        ])
                    } else {
                        extra.reply_markup.inline_keyboard.push([
                            {
                                text: 'Проверка на ознакомление с правилами ❌',
                                callback_data: 'toggle_rules'
                            }
                        ])
                    }
                })

            extra.reply_markup.inline_keyboard.push([
                {
                    text: 'Назад',
                    callback_data: 'back'
                }
            ])

            await ctx.editMessageText(title, extra)

        } catch (err) {

            //

        }
    }

    static async add_word(ctx: MyContext) {
        try {

            let message = `Обновление словаря`
            let extra: ExtraEditMessageText = {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: []
                }
            }

            await UserConrtoller.get_settings(ctx).then(async (res) => {
                if (!res) {
                    extra.reply_markup.inline_keyboard.push([
                        {
                            text: 'Прочитать правила',
                            callback_data: 'rules'
                        }
                    ], [
                        {
                            text: 'Назад',
                            callback_data: 'back'
                        }
                    ])
                } else {
                    extra.reply_markup.inline_keyboard.push([
                        {
                            text: 'Начать',
                            callback_data: 'start__'
                        }
                    ], [
                        {
                            text: 'Назад',
                            callback_data: 'back'
                        }
                    ])
                }
            })

            if (ctx.updateType == 'message') {
                ctx.reply(message, extra)
            }

            if (ctx.updateType == 'callback_query') {
                ctx.editMessageText(message, extra)
                if (ctx.session.__scenes.cursor == 3) {
                    ctx.wizard.selectStep(1)
                } else {
                    ctx.wizard.next()
                    ctx.answerCbQuery()
                }
            }
            await VocbularController.reset_middleware(ctx)
        } catch (err) {
            //
        }
    }

}