import { ExtraEditMessageText, ExtraReplyMessage } from "telegraf/typings/telegram-types";
import { MyContext } from "../../Model";
import UserContoller from '../../Controller/User/UserController'
import IUser from "../../Model/User/IUserModel";

export default async function section_render (ctx: MyContext) {
    try {

        let message = "<b>Настройки</b> \n"
        let update = ctx.updateType

        let user: IUser = await UserContoller.get_user(ctx)

        // message += `\nID профиля:`
        // message += `\nДата регистрациии:`
        message += `\n1) Имя пользователя: <b>${user.settings.username}</b>`
        // message += `\nПол:`

        let language = ''

        if (user.settings.interface_language === 'russian') {
            language = 'Русский'
        } else if (user.settings.interface_language === 'buryat') {
            language = 'Бурятский'
        } else if (user.settings.interface_language === 'english') {
            language = 'Английский'
        }

        message += `\n2) Язык интерфейса: <b>${language}</b>`
        // message += `\nПродвинутые возможности:`

        message += `\n\nОтправьте номер пункта, который хотите изменить`

        if (update === 'message') {
            let extra: ExtraReplyMessage = {
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
            ctx.reply(message, extra)
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

        ctx.wizard.selectStep(5)

    } catch (err) {
        console.log(err)
    }
    
}