import { Request, Response } from 'express'
import { Scenes, session, Telegraf, Context, Composer } from 'telegraf'
import home from './bot/home/home'
import { MyContext } from "./bot/model/Context"

const localtunnel = require("localtunnel");
const express = require("express")
require("dotenv").config()

const { enter, leave } = Scenes.Stage

const bot = new Telegraf<MyContext>(<string>process.env.BOT_TOKEN)
const app = express()

const stage = new Scenes.Stage<MyContext>([home], {
    default: 'home'
})

bot.start((ctx) => { console.log(ctx.message.text) })
bot.use(session())
bot.use(stage.middleware())
bot.use((ctx, next) => {
    // @ts-ignore
    ctx.myProp = ctx.chat?.first_name
    return next()
})

// Backend
const secretPath = `/telegraf/${bot.secretPathComponent()}`
if (process.env.mode === "development") {
    console.log(secretPath)
    localtunnel({ port: 3000 }).then((result: any) => {
        // console.log(secretPath)
        // bot.telegram.setWebhook(`${result.url}${secretPath}`).then(data => console.log(data))
        // bot.telegram.deleteWebhook();
    })
} else {
    bot.telegram.setWebhook(`https://say-an.ru${secretPath}`)
        .then((data) => console.log(data))
}

app.get("/", (req: Request, res: Response) => res.send("Hello!"))
app.use(bot.webhookCallback(secretPath))
app.listen(5000, () => console.log("telegram bot launched!"))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))