import { Composer, Scenes } from "telegraf";
import { MyContext } from "../model/Context";
const message = "Настройки \n<code>Подтверждение правильности ввода: ВКЛ \nБексонечное добавление слов: ВЫКЛ</code> \n"
const extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Подтверждение правильности ввода',
                    callback_data: 'confirm'
                },
            ],
            [
                {
                    text: 'Бесконечное добавление слов',
                    callback_data: 'infinity_adding'
                },
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
function greeting(ctx: MyContext) {
    if (ctx.message) {
        // @ts-ignore
        ctx.reply(message, extra)
    } else {
        // @ts-ignore
        ctx.editMessageText(message, extra)
    }
}

const handler = new Composer<MyContext>();
const vocabularSettings = new Scenes.WizardScene(
    "vocabular-settings",
    handler,
);

handler.on("message", async (ctx) => greeting(ctx))
handler.on("callback_query", async (ctx) => {
    // Обработка настроек
    if (ctx.update["callback_query"]) {
        if (ctx.update["callback_query"].data !== null) {
            if (ctx.update["callback_query"].data == 'confirm') {
                ctx.answerCbQuery('Подтверждение правильности ввода: ВЫКЛ')
            }

            if (ctx.update["callback_query"].data == 'infinity_adding') {
                ctx.answerCbQuery('Бесконечное добавление слов: ВКЛ')
            }

            if (ctx.update["callback_query"].data == 'back') {
                ctx.answerCbQuery()
                ctx.scene.enter("vocabular")
            }
        }
    }
})
vocabularSettings.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
vocabularSettings.command("study", async (ctx) => ctx.scene.enter("study"))
vocabularSettings.command("home", async (ctx) => ctx.scene.enter("home"))
vocabularSettings.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
vocabularSettings.enter(async (ctx) => greeting(ctx))

export default vocabularSettings