import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model";
import greeting from "./DashboardGreeting";
require("dotenv").config()
const subscribe_message = `<b>Личный кабинет / Подписка</b>`;
const subscribe_extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Оформить подписку',
                    callback_data: 'subscribe'
                },
                {
                    text: 'Назад',
                    callback_data: 'back'
                }
            ]
        ]
    }
}

const payment_extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Назад',
                    callback_data: 'back'
                }
            ]
        ]
    }
}


const handler = new Composer<MyContext>();
const dashboard = new Scenes.WizardScene(
    "dashboard",
    handler,
    (async (ctx) => {
        if (ctx.update["message"]) {
            if (ctx.update["message"]) {
                try {
                    ctx.forwardMessage(process.env.channel_id).then(async () => {
                        await ctx.reply("Спасибо за обратную связь! \nВаше сообщение получено")
                        ctx.scene.enter("dashboard")
                    })
                } catch (err) {
                    ctx.copyMessage(process.env.channel_id).then(async () => {
                        await ctx.reply("Спасибо за обратную связь! \nВаше сообщение получено")
                        ctx.scene.enter("dashboard")
                    })
                }
            }
        }
    }),
    (async (ctx) => {
        if (ctx.update["message"]) {
            subcribe_greeting(ctx)
        } else {

            if (ctx.update["callback_query"]) {

                if (ctx.update["callback_query"].data == "subscribe") {
                    ctx.wizard.next()
                    // @ts-ignore
                    payment_greeting(ctx)
                }

                if (ctx.update["callback_query"].data == "about") {
                    ctx.wizard.selectStep(4)
                    // @ts-ignore
                    ctx.editMessageText('О проекте ...', payment_extra)
                    return ctx.answerCbQuery('О проекте')
                }


                if (ctx.update["callback_query"].data == "back") {
                    console.log("back")
                    greeting(ctx)
                    return ctx.answerCbQuery()
                }

                // ctx.update["callback_query"].data == "back" ? subcribe_greeting(ctx) : ctx.reply("Возникла непредвиденная Ошибка, повторите снова, пожалуйста /dashboard")

            }
        }
    }),

    // payment section
    (async (ctx) => {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data == 'back') {
                subcribe_greeting(ctx)
                return ctx.answerCbQuery()
            }
        }

        if (ctx.update["message"]) {
            payment_greeting(ctx)
        }
    }),
    (async (ctx) => {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data == "back") {
                greeting(ctx)
                ctx.answerCbQuery()
            }
        } else {
            about_greeting(ctx)
        }
    })
);

dashboard.enter(async (ctx) => greeting(ctx))

dashboard.action("home", async (ctx) => {
    ctx.scene.enter("home")
    ctx.answerCbQuery()
})
handler.action("contact", async (ctx) => {
    ctx.wizard.next()
    ctx.editMessageText("Отправьте сообщение, администрация ответит в ближайшее время")
    ctx.answerCbQuery()
})

dashboard.action("subscription", async (ctx) => subcribe_greeting(ctx))

async function subcribe_greeting(ctx) {
    if (ctx.update["message"]) {
        ctx.reply(subscribe_message, subscribe_extra)
    } else {
        ctx.wizard.selectStep(2);
        // @ts-ignore
        ctx.editMessageText(subscribe_message, subscribe_extra)
        ctx.answerCbQuery('Личный кабинет / Подписка')
    }
}

dashboard.action("about", async (ctx) => about_greeting(ctx))

async function about_greeting(ctx) {
    if (ctx.update["message"]) {
        ctx.reply("О проекте ...", payment_extra)
    } else {
        ctx.wizard.selectStep(4)
        // @ts-ignore
        ctx.editMessageText('О проекте ...', payment_extra)
        return ctx.answerCbQuery('О проекте')
    }
}

async function payment_greeting(ctx) {
    if (ctx.update["callback_query"]) {
        ctx.editMessageText('Тут вывести метод оплаты', payment_extra)
        return ctx.answerCbQuery('Оформление подписки')
    } else {
        ctx.reply('Тут вывести метод оплаты', payment_extra)
    }
}

// Получаем название сцены из массива и переходим, если это команда
dashboard.command(process.env.scenes.split(","), async (ctx) => ctx.scene.enter(ctx.update["message"].text.replace('/', '')))

// Обработка входящих
// handler.on("message", async (ctx) => greeting(ctx))

export default dashboard