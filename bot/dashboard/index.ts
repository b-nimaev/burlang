import { Composer, Scenes } from "telegraf";
import { MyContext } from "../model/Context";
import greeting from "./greeting";
require("dotenv").config()

const handler = new Composer<MyContext>();
const dashboard = new Scenes.WizardScene(
    "dashboard",
    handler,
    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"]) {
                try {
                    ctx.forwardMessage(process.env.channel_id).then(async () => {
                        await ctx.reply("Спасибо за обратную связь! \nВаше сообщение получено")
                        ctx.scene.enter("dashboard")
                    })
                } catch (err) {
                    ctx.copyMessage(process.env.channel_id).then(async () => {
                        await ctx.reply("Спасибо за обратную связь! \nВаше сообщение получено")
                        ctx.scene.enter("dashboard")
                    })
                }
            }
        }
    })
);

dashboard.enter(async (ctx) => greeting(ctx))

dashboard.action("home", async (ctx) => {
    ctx.scene.enter("home")
    ctx.answerCbQuery()
})
dashboard.action("contact", async (ctx) => {
    ctx.wizard.next()
    ctx.editMessageText("Отправьте сообщение, администрация ответит в ближайшее время")
    ctx.answerCbQuery()
})

// Получаем название сцены из массива и переходим, если это команда
dashboard.command(process.env.scenes.split(","), async (ctx) => ctx.scene.enter(ctx.update["message"].text.replace('/', '')))

// Обработка входящих
handler.on("message", async (ctx) => greeting(ctx))

export default dashboard