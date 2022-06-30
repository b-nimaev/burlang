import { Composer, Context, Scenes } from "telegraf";
import { ExtraEditMessageText, ExtraReplyMessage } from "telegraf/typings/telegram-types";
import { MyContext } from "../model/Context";

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
const dashboard = new Composer<MyContext>();
const vocabular = new Composer<MyContext>();
const study = new Composer<MyContext>();
const home = new Scenes.WizardScene(
    "home",
    handler,
    dashboard, // 1
    vocabular,
    study
);

function greeting(ctx: MyContext) {
    if (ctx.message) {
        ctx.reply(message, extra)
    } else {
        ctx.editMessageText(message, __extra);
        // ctx.answerCbQuery();
    }
}

home.enter((ctx) => greeting(ctx))
home.hears(/\/start/, async (ctx) => greeting(ctx))
home.action("dashboard", async (ctx) => {
    ctx.answerCbQuery()
    ctx.wizard.selectStep(1)
    ctx.editMessageText("Личный кабинет", {
        parse_mode: 'HTML', reply_markup: {
            inline_keyboard: [
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
home.action("vocabular", async (ctx) => {
    ctx.answerCbQuery()
    ctx.wizard.selectStep(2)
    ctx.editMessageText("Словарь", {
        parse_mode: 'HTML', reply_markup: {
            inline_keyboard: [
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

study.action("start", async (ctx) => {
    ctx.answerCbQuery()
})
study.on("message", async (ctx) => {
    ctx.reply("Обучение", {
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

vocabular.on("message", async (ctx) => {
    ctx.reply(ctx.message.from.first_name)
})

home.action("home", async (ctx) => {
    ctx.answerCbQuery()
    ctx.wizard.selectStep(0)
    greeting(ctx)
})

export default home