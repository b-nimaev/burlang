/* eslint-disable @typescript-eslint/no-floating-promises */
import { Scenes, session, Telegraf } from 'telegraf'

// Scenes
import home from './View/Home/HomeScene';
import study from './View/Study/SudyScene';
import { MyContext } from './Model';
import alphabet from './View/Study/Partials/Alphabet/AlphabetPartial';
import dashboard from './View/Dashboard/DashboardScene';
import { database } from './Controller/database';
import vocabular from './View/Vocabular/VocabularScene';
import { connect } from 'mongoose';
import moderation from './View/ModerationScene/ModerationScene';

import soundsAndLetters from './View/Study/Partials/SoundsAndLetters/SoundsAndLettersPartial';
import wordFormation from './View/Study/Partials/WordFormation/WordFormationPartial';
import partsOfSpeech from './View/Study/Partials/PartsOfSpeech/PartsOfSpeechPartial';
import cases from './View/Study/Partials/Cases/CasesPartial';
import verbs from './View/Study/Partials/Verbs/VerbsPartial';
import sentences from './View/Study/Partials/Sentences/SentencesPartial';
import negation from './View/Study/Partials/Negation/NegationPartial';
let uri = process.env.db__localhost

export async function run() {
    // 4. Connect to MongoDB
    await connect(uri, { dbName: 'burlang' })
}
run()

const fs = require('fs');
const key = fs.readFileSync('./ssl/localhost.decrypted.key');
const cert = fs.readFileSync('./ssl/localhost.crt');
const https = require('https');

const morgan = require("morgan")
const cors = require("cors")
const BodyParser = require("body-parser")

// Server
require("dotenv").config()
const express = require("express")

// Bot token check
const token = process.env.token

if (token === undefined) {
     throw new Error('BOT_TOKEN must be provided!')
}


// Init scenes & set secretPath for requires from bot
const scenes = [home, dashboard, vocabular, study, moderation, alphabet, soundsAndLetters, wordFormation, partsOfSpeech, cases, verbs, sentences, negation]
export const bot = new Telegraf<MyContext>(token)

export default bot
const app = express()
const port = process.env.port
const secretPath = `/telegraf/${bot.secretPathComponent()}`;

const stage = new Scenes.Stage<MyContext>(scenes, {
    default: 'home',
})

// Set webhook
async function set_webhook () {
    if (process.env.mode === "development") {

        try {
            const fetch = require('node-fetch')

            await fetch('http://localhost:4040/api/tunnels')
                .then(res => res.json())
                .then(json => json.tunnels.find(tunnel => tunnel.proto === 'https'))
                .then(secureTunnel => bot.telegram.setWebhook(secureTunnel.public_url + secretPath))
                .then(status => { console.log(status) })
        } catch (err) {
            console.log(err)
        }

    } else {
        try {
            await bot.telegram.setWebhook(`https://anoname.xyz${secretPath}`).then((status) => {
                console.log(secretPath)
                console.log(status)
            }).catch(err => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    }
}

set_webhook()

bot.use(session())
bot.use((ctx, next) => {
    const now = new Date()
    return next()
})

bot.command("register", async (ctx) => {
    try {
        await database.write_admin(ctx)
    } catch (err) {
        // err
    }
})

bot.use(stage.middleware())
app.use(cors());
app.use(BodyParser.json());
app.use(
    BodyParser.urlencoded({
        extended: true,
    })
);
app.use(morgan("dev"));

// @ts-ignore
app.get("/", (req: Request, res: Response) => res.send("Бот запущен!"))
app.use(bot.webhookCallback(secretPath))

app.listen(5000)
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))