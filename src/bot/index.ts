import { Request, Response } from 'express'
import { Scenes, session, Telegraf } from 'telegraf'
import blitz from './blitz';
import dashboard from './dashboard';
import home from './home'
import { MyContext } from "./model/Context"
import study from './study';
import vocabular from './vocabular';
import vocabularSettings from './vocabular/settings';
import translater from "./Translater/TranslaterScene";

const fs = require('fs');
const key = fs.readFileSync('./ssl/localhost.decrypted.key');
const cert = fs.readFileSync('./ssl/localhost.crt');
const https = require('https');
const express = require("express")
require("dotenv").config()

var bot_token: string
if (process.env.mode == "development") {
    bot_token = process.env.burlang_dev
} else {
    bot_token = process.env.BOT_TOKEN
}

const bot = new Telegraf<MyContext>(bot_token)
const app = express()
const port = 8443
const scenes = [
    home,
    vocabular,
    dashboard,
    study,
    vocabular,
    vocabularSettings,
    blitz,
    translater
]

const stage = new Scenes.Stage<MyContext>(scenes, {
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
    bot.telegram.setWebhook(`https://fe9a-81-23-175-121.eu.ngrok.io${secretPath}`)
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