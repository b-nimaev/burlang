import { MyContext } from "../../Model"

const extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Настройки',
                    callback_data: 'common_settings'
                }
            ], [
                {
                    text: 'О проекте',
                    callback_data: 'about'
                }
            ], [
                {
                    text: 'Поддержка проекта',
                    callback_data: 'subscription'
                }
            ],
            [
                {
                    text: 'Назад',
                    callback_data: 'home'
                },
                {
                    text: 'Обратная связь',
                    callback_data: 'contact'
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