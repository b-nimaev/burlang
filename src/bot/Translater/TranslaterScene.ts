import { Composer, Scenes } from "telegraf";
import { MyContext } from "../model/Context";
import greeting from "./TranslaterGreeting";
require("dotenv").config()

const handler = new Composer<MyContext>();
const scene = new Scenes.WizardScene(
    "translater",
    handler
);

scene.enter(async (ctx) => greeting(ctx))

scene.action("home", async (ctx) => {
    ctx.scene.enter("home")
    ctx.answerCbQuery()
})
scene.action("contact", async (ctx) => {
    ctx.wizard.next()
    ctx.editMessageText("Отправьте сообщение, администрация ответит в ближайшее время")
    ctx.answerCbQuery()
})

// Получаем название сцены из массива и переходим, если это команда
scene.command(process.env.scenes.split(","), async (ctx) => ctx.scene.enter(ctx.update["message"].text.replace('/', '')))

// Обработка входящих
handler.on("message", async (ctx) => greeting(ctx))

export default scene