import { MyContext } from "../../Model"

const extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'О проекте',
                    callback_data: 'about'
                },
                {
                    text: 'Подписка',
                    callback_data: 'subscription'
                }
            ],
            [
                {
                    text: 'Обратная связь',
                    callback_data: 'contact'
                },
            ],
            [
                {
                    text: 'На главную',
                    callback_data: 'home'
                }
            ],
        ]
    }
}

async function getMessageText(ctx) {

    let message = `<b>Личный кабинет</b> \n\nДобавлено слов: 0 \nРазмечено слов: 0`
    return message
}

async function greeting(ctx: MyContext) {

    let message = await getMessageText(ctx);

    // @ts-ignore
    ctx.update["message"] ? ctx.reply(message, extra) : ctx.editMessageText(message, extra)
}

export default greeting