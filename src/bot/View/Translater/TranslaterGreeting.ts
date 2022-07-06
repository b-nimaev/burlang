import { MyContext } from "../../Model"

const message = "<b>Переводчик</b> \n\nОтправьте текст для перевода"
const extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
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