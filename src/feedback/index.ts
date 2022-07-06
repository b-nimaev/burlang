import { Request, Response } from 'express'
import { Scenes, session, Telegraf, Context, Composer, Telegram } from 'telegraf'
import { User } from 'telegraf/typings/core/types/typegram';
import { get_feedback_managers, get_feedback_props } from '../bot/controller';

import { MyContext } from '../bot/model/Context'
import home from './home';

const fs = require('fs');
const key = fs.readFileSync('./ssl/localhost.decrypted.key');
const cert = fs.readFileSync('./ssl/localhost.crt');
const https = require('https');
const express = require("express")
require("dotenv").config()

const { enter, leave } = Scenes.Stage

const bot = new Telegraf<MyContext>(<string>process.env.BOT_TOKEN_FEEDBACK)
const app = express()
const port = 1337

const stage = new Scenes.Stage<MyContext>([home], {
    default: 'home'
})

bot.use(session())
bot.use(stage.middleware())
bot.use((ctx, next) => {
    // @ts-ignore
    ctx.myProp = ctx.chat?.first_name
    return next()
});

(async function () {

    let users = await get_feedback_managers()
    const message = await get_feedback_props()
        .then(messages => { return `Входящих отзывов ${messages.length}` })


    users.forEach(async (element: User) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        await bot.telegram.sendMessage(element.id, message, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Начать просмотр',
                            callback_data: 'view'
                        }
                    ]
                ]
            }
        })
    });

}())

// Backend
const secretPath = `/feedback/${bot.secretPathComponent()}`
// console.log(secretPath)
if (process.env.mode === "development") {
    bot.telegram.setWebhook(`https://844a-81-23-175-121.eu.ngrok.io${secretPath}`)
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