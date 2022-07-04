import { Composer, Scenes } from "telegraf";
import { MyContext } from "../model/Context";
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
    if (ctx.update["callback_query"]) {
        // @ts-ignore
        ctx.editMessageText(message, extra)
    } else {
        // @ts-ignore
        ctx.reply(message, extra)
    }
}

const handler = new Composer<MyContext>();
const dashboard = new Scenes.WizardScene(
    "dashboard",
    handler,
    (async (ctx) => {
        if (ctx.update["message"]) {
            console.log(ctx.update)
        }
    })
);

handler.on("message", async (ctx) => greeting(ctx))

dashboard.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
dashboard.command("study", async (ctx) => ctx.scene.enter("study"))
dashboard.command("home", async (ctx) => ctx.scene.enter("home"))
dashboard.enter(async (ctx) => greeting(ctx))

dashboard.action("home", async (ctx) => {
    ctx.answerCbQuery()
    ctx.scene.enter("home")
})
dashboard.action("contact", async (ctx) => {
    ctx.answerCbQuery()
    ctx.wizard.next()
    ctx.editMessageText("Отправьте сообщение, администрация ответит в ближайшее время")
})

export default dashboard