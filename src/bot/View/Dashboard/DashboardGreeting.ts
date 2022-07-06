import { MyContext } from "../../Model/Context"

const message = "Личный кабинет"
const extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Обратная связь',
                    callback_data: 'contact'
                },
                {
                    text: 'На главную',
                    callback_data: 'home'
                }
            ],
        ]
    }
}
function greeting(ctx: MyContext) {
    // @ts-ignore
    ctx.update["message"] ? ctx.reply(message, extra) : ctx.editMessageText(message, extra)
}

export default greeting