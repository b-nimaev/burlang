import { ObjectId } from "mongodb";
import { Composer, Scenes } from "telegraf";
import { ExtraEditMessageText, ExtraReplyMessage } from "telegraf/typings/telegram-types";
import ModerationController from "../../Controller/Moderation/ModerationController";
import { MyContext } from "../../Model";
import { ModerationInterface } from "../../Model/Moderation/IModeration";

const handler = new Composer<MyContext>();
const moderation = new Scenes.WizardScene(
    'moderation',
    handler
)

moderation.enter(async (ctx) => await moderation_greeting(ctx))

moderation.action('back', async (ctx) => ctx.scene.enter('home'))

moderation.on('message', async (ctx: MyContext) => {

    if (ctx.updateType == 'message') {
        
        try {

            let objectID = new ObjectId(ctx.update["message"].text)
            
            let word: ModerationInterface = await ModerationController.get_word_on_moderation(objectID)
            await ModerationController.set_current_word(ctx, ctx.update["message"].text)

            let message: string = `<b>Модерация</b>\n\n`
            message += `<code>${word.id}</code> \n\n`
            message += `<b>Бурятский</b> ${word.buryat_translate.name} \n`
            message += `<b>Русский</b> ${word.russian_translate.name}`

            let extra: ExtraReplyMessage = {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Подтвердить',
                                callback_data: 'agree'
                            }, 
                            {
                                text: 'Отклонить',
                                callback_data: 'decline'
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
            }

            await ctx.reply(message, extra)

        } catch (err) {
            await ctx.reply('Перепроверь отправленное')
            await moderation_greeting(ctx)
        }

    }

})

moderation.action('agree', async (ctx: MyContext) => {
    try {
        ctx.answerCbQuery()
        
    } catch (err) {
        console.log(err)
    }
})

moderation.action('decline', async (ctx: MyContext) => {
    try {
        ctx.answerCbQuery()
    } catch (err) {
        console.log(err)
    }
})

async function moderation_greeting (ctx: MyContext) {
    let words: ModerationInterface[] = await ModerationController.get_words_on_moderation()

    // Инициируем и работаем с текстом
    let message: string = `<b>Модерация</b>\n\n`
    message += `Найдено: ${words.length}\n\n`

    let words_on_page: number = 10
    let pages: number


    // Получаем количество страниц, на основе полученных слов
    if (words.length > words_on_page) {
        pages = Math.ceil(words.length / words_on_page)
    }


    if (ctx.updateType == 'callback_query') {

        let data: {
            message: string,
            extra: ExtraEditMessageText
        } = await render_keyboard(ctx, words, words_on_page, pages)
        await ctx.editMessageText(message + data.message, data.extra)

    } else {

        let data: {
            message: string,
            extra: ExtraEditMessageText
        } = await render_keyboard(ctx, words, words_on_page, pages)

        await ctx.reply(message + data.message, data.extra)
    }
}

async function render_keyboard (ctx: MyContext, words: ModerationInterface[], words_on_page: number, pages: number) {

    let extra: ExtraEditMessageText = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: []
        }
    }

    let message: string = ''

    for (let i = 0; i < words.length; i++) {

        // index iteration
        message += `${i + 1}) `

        let moderationItem: ModerationInterface = words[i]
        message += `<code>${moderationItem.id}</code>\n`
        
    }

    extra.reply_markup.inline_keyboard.push([{
        text: 'Назад',
        callback_data: 'back'
    }])

    return { message, extra}

}

export default moderation