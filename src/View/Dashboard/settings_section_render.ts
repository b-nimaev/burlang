import { ExtraEditMessageText } from "telegraf/typings/telegram-types";
import { MyContext } from "../../Model";

export default async function section_render (ctx: MyContext) {
    try {

        let message = "Настройки"
        let update = ctx.updateType

        message += `\nID профиля:`
        message += `\nДата регистрациии:`
        message += `\nОтоброжаемое имя пользователя:`
        message += `\nПол:`
        message += `\nЯзык интерфейса:`
        message += `\nПродвинутые возможности:`

        if (update === 'message') {
            ctx.reply(message)
        }

        if (update === 'callback_query') {
            let extra: ExtraEditMessageText = {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Назад',
                                callback_data: 'back'
                            }
                        ]
                    ]
                }
            }
            ctx.editMessageText(message, extra)
        }

    } catch (err) {
        console.log(err)
    }
    
}