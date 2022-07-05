import { Composer, Context, Scenes } from "telegraf";
import { ExtraEditMessageText, ExtraReplyMessage } from "telegraf/typings/telegram-types";
import { MyContext } from "../model/Context";
import { MongoClient } from "mongodb";
import { getstart } from "../controller";
require("dotenv").config();

const dbname = process.env.DB_NAME;
let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

export async function getProposals() {
    try {
        await client.connect()
        const result = await client.db(dbname).collection("users").find().toArray();
        if (result == null) {
            return 0
        } else {
            return result
        }
    } catch (err) {
        console.log(err);
    } finally {
        await client.close()
    }
}

let extra: ExtraReplyMessage = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [
                { text: "Самоучитель", callback_data: "study" },
                { text: "Словарь", callback_data: "vocabular" }
            ],
            [{ text: "Личный кабинет", callback_data: "dashboard" }]
        ]
    }
}

let __extra: ExtraEditMessageText = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [
                { text: "Самоучитель", callback_data: "study" },
                { text: "Словарь", callback_data: "vocabular" }
            ],
            [{ text: "Личный кабинет", callback_data: "dashboard" }]
        ]
    }
}

let message = `Самоучитель бурятского языка.\n\n Выберите нужный раздел, чтобы начать изучение 👇`

const handler = new Composer<MyContext>();
const vocabular = new Composer<MyContext>();
const study = new Composer<MyContext>();
const blitz = new Composer<MyContext>();
const home = new Scenes.WizardScene(
    "home",
    handler,
    vocabular,
    study
);

export function greeting(ctx: MyContext) {
    if (ctx.message) {
        ctx.reply(message, extra)
    } else {
        ctx.editMessageText(message, __extra);
        // ctx.answerCbQuery();
    }
}

home.enter((ctx) => greeting(ctx))
handler.on("message", async (ctx) => {
    greeting(ctx)
})

home.hears(/\/start/, async (ctx) => {
    console.log(ctx.update)
    greeting(ctx)

    let data: any = ctx.update["message"].from
    data.date = ctx.update["message"].date
    getstart(ctx.update["message"].from)
})

home.action("vocabular", async (ctx) => {
    ctx.answerCbQuery()
    ctx.scene.enter("vocabular")
})
home.action("study", async (ctx) => {
    ctx.answerCbQuery()
    ctx.scene.enter("study")
})
home.action("dashboard", async (ctx) => {
    ctx.answerCbQuery()
    ctx.scene.enter("dashboard")
})

home.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
home.command("study", async (ctx) => ctx.scene.enter("study"))
home.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))

home.action("study", async (ctx) => {
    ctx.answerCbQuery()
    ctx.wizard.selectStep(3)
    ctx.editMessageText("Обучение", {
        parse_mode: 'HTML', reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Приступить',
                        callback_data: 'start'
                    }
                ],
                [
                    {
                        text: 'Назад',
                        callback_data: 'home'
                    }
                ]
            ]
        }
    })
})
home.command("blitz", async (ctx) => {
    ctx.scene.enter("blitz")
})
export default home