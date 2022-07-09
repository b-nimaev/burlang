import { Request, Response } from 'express'
import { Scenes, session, Telegraf } from 'telegraf'
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
    // @ts-ignore
    ctx.myProp = ctx.chat?.first_name
    return next()
})
bot.start((ctx) => ctx.scene.enter("home"))
// bot.command(scenes_, async (ctx) => ctx.scene.enter(ctx.update["message"].text.replace('/', '')))

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