import { Scenes, session, Telegraf, Context } from 'telegraf'
const localtunnel = require("localtunnel")
const express = require("express")
require("dotenv").config()

interface MySceneSession extends Scenes.SceneSessionData {
    myScenesSessionProp: number
}

interface MySession extends Scenes.SceneSession<MySceneSession> {
    mySessionProp: number
}

interface BContext extends Context {
    myProp?: string,
    session: MySession,
    scene: Scenes.SceneContextScene<BContext, MySceneSession>
}

const { enter, leave } = Scenes.Stage

const greeterScene = new Scenes.BaseScene<BContext>('greeter')
greeterScene.enter((ctx) => ctx.reply('greeter scene'))
greeterScene.leave((ctx) => ctx.reply('greeter scene exit'))
greeterScene.hears("Привет", (ctx) => ctx.scene.enter('greeter'))
greeterScene.on("message", (ctx) => ctx.replyWithMarkdown('Отправьте `Привет`'))

const echoScene = new Scenes.BaseScene<BContext>("echo")
echoScene.enter((ctx) => ctx.reply("сцена вывода"))
echoScene.leave((ctx) => ctx.reply("выход из сцены вывода"))
echoScene.command("back", leave<BContext>())
echoScene.on("text", (ctx) => ctx.reply(ctx.message.text))
echoScene.on("message", (ctx) => ctx.reply("Only text messages please"))

const bot = new Telegraf<BContext>(<string>process.env.BOT_TOKEN)
const app = express()

const stage = new Scenes.Stage<BContext>([greeterScene, echoScene], {
    ttl: 10
})
bot.use(session())
bot.use(stage.middleware())
bot.use((ctx, next) => {
    // @ts-ignore
    ctx.myProp = ctx.chat?.first_name
    return next()
})

bot.start((ctx) => {
    ctx.reply('Привет, ' + ctx.myProp + '!')
    console.log(ctx.myProp)
})
bot.command("greeter", (ctx) => ctx.scene.enter("greeter"))
bot.command("echo", (ctx) => ctx.scene.enter("echo"))
bot.on("message", (ctx) => ctx.reply("Try /echo or /greeter"))

// Backend
const secretPath = `/telegraf/${bot.secretPathComponent()}`
console.log(secretPath)
// @ts-ignore
bot.telegram.setWebhook('https://say-an.ru/' + secretPath)
app.use((secretPath))
app.listen(5000, () => console.log("telegram bot launched!"))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))