import { ExtraEditMessageText, ExtraReplyMessage } from "telegraf/typings/telegram-types";
import InterfaceContoller from "../../../Controller/Bin/CommonInterface";
import { MyContext } from "../../../Model";
import { BinModel, IBin } from "../../../Model/Bin/IBin";

export default async function about_project (ctx: MyContext) {
    try {
        let interface_translates: IBin = await InterfaceContoller.get_translate('about_project')

        ctx.answerCbQuery()
        ctx.wizard.selectStep(7)

        if (ctx.updateType === 'callback_query') {

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

            ctx.editMessageText(interface_translates.translates.russian, extra)
            console.log('edited')
        }

        if (ctx.updateType == 'message') {

            console.log(ctx.update["message"])

            if (ctx.update["message"].text == 'change') {
                ctx.wizard.selectStep(7)
                ctx.reply('отправьте текст')
            }

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

            ctx.reply(interface_translates.translates.russian, extra)

        }

    } catch (err) {
        console.log(err)
    }
}