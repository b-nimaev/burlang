import { Composer, Context, Scenes, Markup } from "telegraf";
import { ExtraEditMessageText, ExtraReplyMessage } from "telegraf/typings/telegram-types";
import vocabular_services from "../../Controller/vocabular";
import { MyContext } from "../../Model";
import { IUser } from "../../Model/UserModel";

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
                    text: 'Настройки',
                    callback_data: 'settings'
                },
                {
                    text: 'На главную',
                    callback_data: 'home'
                },
            ],
        ]
    }
}

const handler = new Composer<MyContext>();
const vocabular = new Scenes.WizardScene(
    "vocabular",
    handler,

    // rules
    async (ctx: MyContext) => {
        
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
                await greeting_vocabular(ctx)
                ctx.wizard.selectStep(0)
                return ctx.answerCbQuery()
            }

            return ctx.answerCbQuery('Данной команды не найдено')
            
        }

        if (ctx.updateType == 'message') {
            
            // проверка
            if (ctx.update['message'].text == 'Да, всё понятно') {
                Markup.removeKeyboard()
                await vocabular_services.reset_middleware(ctx)
                await ctx.reply('Отправьте слово')
                ctx.wizard.next()
            } else {
                let message = 'Пожалуйста, ознакомтесь с правилами'
                await ctx.reply(message, Markup.keyboard([['Да, всё понятно']]).resize().oneTime())
            }
            
        }
    },

    // get word & write
    async (ctx: MyContext) => {

        if (ctx.updateType == 'message') {

            let word = ctx.update['message'].text
            let extra: ExtraEditMessageText = {
                parse_mode: 'HTML'
            }

            await vocabular_services.insert_middleware(ctx)
            await vocabular_services.get_translates(ctx).then(async (result) => {
                if (result) {

                    if (result.length) {
                        await ctx.reply(`<b>${word}</b> существует в базе данных`, extra)
                        let str: string = ``

                        result.forEach(async (element: string) => {
                            str = str + element
                        })

                        await ctx.reply(str, extra)
                        await ctx.reply(`<b>Можете отправить перевод к веденному тексту:</b> ${word}`, extra)
                    } else {
                        await ctx.reply(`<b>${word}</b> записан в базу данных`, extra)
                        await ctx.reply(`<b>Теперь отправьте перевод к веденному тексту:</b> ${word}`, extra)
                    }


                } else {
                    await ctx.reply(`<b>${word}</b> записан в базу данных`, extra)
                    await ctx.reply(`<b>Теперь отправьте перевод к веденному тексту:</b> ${word}`, extra)
                }
            })

            ctx.wizard.next()
            
        }

    },

    async (ctx: MyContext) => {


        // Пользователь отправляет перевод слова
        if (ctx.updateType == 'message') {

            let word = ctx.update['message'].text
            let extra: ExtraEditMessageText = {
                parse_mode: 'HTML'
            }

            await vocabular_services.insert_middleware_translate(ctx)
            await vocabular_services.save_translate(ctx)
            await vocabular_services.get_middleware(ctx)
                .then(async (user: IUser) => {
                    if (user.middleware.word) {

                        let words_count = user.middleware.word.split(' ').length
                        let message: string

                        if (words_count > 1) {
                            message = 'Фраза'
                        } else {
                            message = 'Слово'
                        }

                        let extra: ExtraEditMessageText = {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: 'Завершить добавление слов',
                                            callback_data: 'end'
                                        }
                                    ]
                                ]
                            }
                        }

                        await ctx.reply(`${message} <b>${user.middleware.word}</b> имеет количество вариантов перевода: ${user.middleware.translate.length}`, extra)
                    }
                })

        }
        
        // Пользователь нажимает на кнопку Завершить добавление слов
        if (ctx.updateType == 'callback_query') {
            let data = ctx.update["callback_query"].data

            if (data == 'end') {

                await greeting_vocabular(ctx)
                ctx.wizard.selectStep(0)
                return ctx.answerCbQuery('Перевод сохранён в базу данных')
            }

            ctx.answerCbQuery('Команда не найдена')

        }

        // проверка на существование, далее обработка!

    }
);

async function greeting_vocabular (ctx: MyContext) {
    let message = `Словарь \n\n`

    if (ctx.updateType == 'callback_query') {

        ctx.editMessageText(message, extra)
        ctx.answerCbQuery()
    }

    if (ctx.updateType == 'message') {
        ctx.reply(message, extra)
    }
}

handler.on("message", async (ctx) => greeting_vocabular (ctx))

vocabular.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
vocabular.command("study", async (ctx) => ctx.scene.enter("study"))
vocabular.command("home", async (ctx) => ctx.scene.enter("home"))
vocabular.enter(async (ctx) => greeting_vocabular (ctx))

handler.action('home', async (ctx) => await ctx.scene.enter('home'))
handler.action('settings', async (ctx) => await ctx.answerCbQuery('Данный функционал ещё в разработке'))
handler.action('add', async (ctx) => {
    ctx.wizard.next()
    ctx.answerCbQuery()

    add_word(ctx)
})

async function add_word (ctx: MyContext) {
    let message = `Обновление словаря`
    let extra: ExtraEditMessageText = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Прочитать правила',
                        callback_data: 'rules'
                    },
                    {
                        text: 'Назад',
                        callback_data: 'back'
                    }
                ]
            ]
        }
    }

    if (ctx.updateType == 'message') {
        ctx.reply(message, extra)
    }

    if (ctx.updateType == 'callback_query') {
        ctx.editMessageText(message, extra)
    }
}

export default vocabular