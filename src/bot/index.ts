import { Request, Response } from 'express'
import { Markup, Scenes, session, Telegraf } from 'telegraf'
import { MyContext } from "./Model"
import blitz from './View/Blitz/BlitzScene';
import dashboard from './View/Dashboard/DashboardScene';
import home from './View/Home/HomeScene'
import study from './View/Study/SudyScene';
import vocabular from './View/Vocabular/VocabularScene';
import vocabularSettings from './View/Vocabular/VocabularSettings';
import translater from "./View/Translater/TranslaterScene";

import alphabet from "./View/Study/Partials/Alphabet/AlphabetPartial"
import soundsAndLetters from "./View/Study/Partials/SoundsAndLetters/SoundsAndLettersPartial"
import wordFormation from "./View/Study/Partials/WordFormation/WordFormationPartial"
import partsOfSpeech from "./View/Study/Partials/PartsOfSpeech/PartsOfSpeechPartial"
import cases from "./View/Study/Partials/Cases/CasesPartial"
import verbs from "./View/Study/Partials/Verbs/VerbsPartial"
import sentences from "./View/Study/Partials/Sentences/SentencesPartial"
import negation from "./View/Study/Partials/Negation/NegationPartial"

const fs = require('fs');
const key = fs.readFileSync('./ssl/localhost.decrypted.key');
const cert = fs.readFileSync('./ssl/localhost.crt');
const https = require('https');
const express = require("express")
require("dotenv").config()

let scenes_: Array<string> = process.env.scenes.split(",")
let partials: Array<string> = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"]
scenes_ = scenes_.concat(partials)

var bot_token: string
if (process.env.mode == "development") {
    bot_token = process.env.burlang_dev
    console.log(bot_token)
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
    translater,

    alphabet,
    soundsAndLetters,
    wordFormation,
    partsOfSpeech,
    cases,
    verbs,
    sentences,
    negation
]

const stage = new Scenes.Stage<MyContext>(scenes, {
    default: 'home'
})
bot.use(session())
bot.use(stage.middleware())
bot.use((ctx, next) => {
    console.log(ctx)
    // @ts-ignore
    ctx.myProp = ctx.chat?.first_name
    return next()
})
bot.start((ctx) => ctx.scene.enter("home"))
bot.command(scenes_, async (ctx) => ctx.scene.enter(ctx.update["message"].text.replace('/', '')))
bot.action("start", async (ctx) => {
    ctx.answerCbQuery("index")
})

const shippingOptions = [
    {
        id: 'unicorn',
        title: 'Unicorn express',
        prices: [{ label: 'Working Time Machine', amount: 10000 }]
    },
    {
        id: 'slowpoke',
        title: 'Slowpoke mail',
        prices: [{ label: 'Working Time Machine', amount: 10000 }]
    }
]
const invoice = {
    provider_token: process.env.PROVIDER_TOKEN,
    provider_data: JSON.stringify({
        shopId: 841905
    }),
    start_parameter: 'time-machine-sku',
    title: 'Working Time Machine',
    description: 'Want to visit your great-great-great-grandparents? Make a fortune at the races? Shake hands with Hammurabi and take a stroll in the Hanging Gardens? Order our Working Time Machine today!',
    currency: 'RUB',
    photo_url: 'https://img.clipartfest.com/5a7f4b14461d1ab2caaa656bcee42aeb_future-me-fredo-and-pidjin-the-webcomic-time-travel-cartoon_390-240.png',
    is_flexible: false,
    prices: [
        { label: 'Working Time Machine', amount: 10000 }
    ],
    payload: JSON.stringify({
        coupon: 'BLACK FRIDAY'
    })
}
const replyOptions = Markup.inlineKeyboard([
    Markup.button.pay('💸 Buy'),
    Markup.button.url('❤️', 'http://telegraf.js.org')
])

bot.command('buy', (ctx) => ctx.replyWithInvoice(invoice, replyOptions))
// @ts-ignore
bot.on('shipping_query', (ctx) => ctx.answerShippingQuery(true, shippingOptions, "error"))
bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true))
bot.on('successful_payment', () => console.log('Woohoo'))
// Backend
const secretPath = `/telegraf/${bot.secretPathComponent()}`
// console.log(secretPath)
if (process.env.mode === "development") {
    bot.telegram.setWebhook(`${process.env.ngrok}${secretPath}`)
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