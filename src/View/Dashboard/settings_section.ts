import { ExtraEditMessageText } from "telegraf/typings/telegram-types";
import { MyContext } from "../../Model";
import greeting from "./DashboardGreeting";

export default async function settings_section(ctx: MyContext) {
    try {

        let update = ctx.updateType

        if (update === 'message') {
            
            let message = parseFloat(ctx.update['message'].text)

            if (isNaN(message) || (message > 2 || message < 1)) {
                ctx.reply('Отправьте числовое значение, в пределах от 1 до 2')
            } else {
                
                let str: string
                let extra: ExtraEditMessageText = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Русский',
                                    callback_data: 'russian'
                                }
                            ],
                            [
                                {
                                    text: 'Английский',
                                    callback_data: 'english'
                                }
                            ],
                            [
                                {
                                    text: 'Бурятский',
                                    callback_data: 'buryat'
                                }
                            ]
                        ]
                    }
                }
                // Изменение отоброжаемого имени
                if (message == 1) {
                    str = 'Отправьте имя, которое будет отображаться'
                    await ctx.reply(str)
                    ctx.wizard.next()
                }
                
                // Изменение языка
                if (message == 2) {
                    str = 'Выберите язык интерфейса'
                    await ctx.reply(str, extra)
                    ctx.wizard.next()
                }

            }

        }

        if (update === 'callback_query') {

            let data = ctx.update["callback_query"].data

            if (data === 'back') {
                await greeting(ctx)
            }
        }

    } catch (err) {
        console.log(err)
    }
}