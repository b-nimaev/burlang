import { Request, Response } from 'express'
import { Scenes, session, Telegraf, Context, Composer } from 'telegraf'
import blitz from './bot/blitz';
import dashboard from './bot/dashboard';
import home, { greeting } from './bot/home'
import { MyContext } from "./bot/model/Context"
import study from './bot/study';
import vocabular from './bot/vocabular';
import vocabularSettings from './bot/vocabular/settings';

const fs = require('fs');
const key = fs.readFileSync('./ssl/localhost.decrypted.key');
const cert = fs.readFileSync('./ssl/localhost.crt');
const https = require('https');
const express = require("express")
require("dotenv").config()

const { enter, leave } = Scenes.Stage

const bot = new Telegraf<MyContext>(<string>process.env.BOT_TOKEN)
const app = express()
const port = 8443

const stage = new Scenes.Stage<MyContext>([home, vocabular, dashboard, study, vocabularSettings, blitz], {
    default: 'home'
})

bot.use(session())
bot.use(stage.middleware())
bot.use((ctx, next) => {
    // @ts-ignore
    ctx.myProp = ctx.chat?.first_name
    return next()
})
// Backend
const secretPath = `/telegraf/${bot.secretPathComponent()}`
// console.log(secretPath)
if (process.env.mode === "development") {
    bot.telegram.setWebhook(`https://0f0b-81-23-175-121.eu.ngrok.io${secretPath}`)
        .then((status) => console.log('Webhook setted: ' + status))
} else {
    bot.telegram.setWebhook(`https://say-an.ru${secretPath}`)
        .then((status) => console.log('Webhook setted: ' + status))
}

app.get("/", (req: Request, res: Response) => res.send("Hello!"))
app.use(bot.webhookCallback(secretPath))
const server = https.createServer({ key, cert }, app);
server.listen(port, () => console.log("telegram bot launched!"))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))