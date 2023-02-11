import { ExtraEditMessageText } from "telegraf/typings/telegram-types";
import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model";
import greeting from "./DashboardGreeting";
import settings_section from "./settings_section";
import section_render from "./settings_section_render";
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
                }], [{
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

        if (ctx.updateType == 'callback_query') {
            ctx.wizard.selectStep(0)
            await greeting(ctx)
        }

        if (ctx.updateType == 'message') {
            try {
                await ctx.forwardMessage(1272270574)
                await ctx.reply("Спасибо за обратную связь! \nВаше сообщение получено")
                ctx.scene.enter("dashboard")

            } catch (err) {
                await ctx.reply('Возникла непредвиденная ошибка')
                ctx.scene.enter('dashboard')
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

        console.log(ctx)

        if (ctx.update["message"]) {
            payment_greeting(ctx)
        }
    }),
    (async (ctx) => {
        ctx.wizard.selectStep(0)
        await greeting(ctx)
    }),
    (async (ctx) => await settings_section(ctx))
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

dashboard.command('home', async (ctx) => ctx.scene.enter('home'))
dashboard.command('vocabular', async (ctx) => ctx.scene.enter('vocabular'))
dashboard.command('study', async (ctx) => ctx.scene.enter('study'))
dashboard.command('dashboard', async (ctx) => ctx.scene.enter('dashboard'))
dashboard.command('back', async (ctx) => ctx.scene.enter('dashboard'))

async function about_greeting(ctx) {
    let message = 'О проекте ...'
    let extra: ExtraEditMessageText = {
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

    await ctx.editMessageText(message, extra).then(() => {
        ctx.wizard.selectStep(4)
    })
}

let text = 'Изучение Бурятского языка никогда не давалось так просто с этой подпиской 😁👍'

const invoice = {
    provider_token: '381764678:TEST:39383',
    start_parameter: 'time-machine-sku',
    title: 'Оформление подписки',
    description: text,
    currency: 'RUB',
    is_flexible: true,
    prices: [
        { label: 'Working Time Machine', amount: 10000 }
    ],
    payload: JSON.stringify({
        coupon: 'BLACK FRIDAY'
    })
}

async function payment_greeting(ctx) {
    if (ctx.update["callback_query"]) {
        // ctx.editMessageText('Тут вывести метод оплаты', payment_extra)
        ctx.replyWithInvoice(invoice)
        // ctx.editMessageText(invoice)
        // ctx.editmessageinvoice
        // ctx.
        return ctx.answerCbQuery('Оформление подписки')
    } else {
        if (ctx.update["message"].successful_payment) {
            console.log(ctx.update["message"].successful_payment)
        } else {

        }
    }
}

// Получаем название сцены из массива и переходим, если это команда
// dashboard.command(process.env.scenes.split(","), async (ctx) => ctx.scene.enter(ctx.update["message"].text.replace('/', '')))

// Обработка входящих
handler.on("message", async (ctx) => greeting(ctx))
handler.action("common_settings", async (ctx) => {
    ctx.wizard.selectStep(5)
    await section_render(ctx)
})
export default dashboard