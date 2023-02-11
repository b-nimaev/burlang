import { ExtraEditMessageText } from "telegraf/typings/telegram-types";
import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model";
import greeting from "./DashboardGreeting";
import settings_section from "./settings_section";
import section_render from "./settings_section_render";
import UserConrtoller from "../../Controller/User/UserController";
import about_project from "./about_project/about";
import InterfaceContoller from "../../Controller/Bin/CommonInterface";
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
                    await about_project(ctx)
                    console.log('about project')
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
            // payment_greeting(ctx)
        }
    }),
    (async (ctx) => {
        ctx.wizard.selectStep(0)
        await greeting(ctx)
    }),
    (async (ctx) => await settings_section(ctx)),
    (async (ctx) => {
        try {

            if (ctx.updateType == 'callback_query') {

                let data: 'russian' | 'buryat' | 'english' = ctx.update["callback_query"].data

                if (data === 'buryat' || data === 'english' || data === 'russian') {
                    await UserConrtoller.interface_language(ctx, data)
                    await section_render(ctx)
                }                    

            } else if (ctx.updateType == 'message') {

                let message = ctx.update["message"].text
                await UserConrtoller.update_username(ctx, message)
                await section_render(ctx)
            }

        } catch (err) {
            console.log(err)
        }
    }),
    (async (ctx) => {
        if (ctx.updateType == 'message') {
            // await InterfaceContoller.create_interace('about_project')
            await ctx.reply('отправьте текст')
            ctx.wizard.next()
        }

        if (ctx.updateType == 'callback_query') {
            if (ctx.update["callback_query"].data == 'back') {
                await greeting(ctx)
                ctx.wizard.selectStep(0)
            }
        }
    }),
    (async (ctx) => {
        if (ctx.updateType == 'message') {
            try {
                await InterfaceContoller.set_translate('about_project', ctx.update["message"].text)
                await ctx.reply('текст сохранен')
                
            } catch (err) {
                await ctx.reply('Возникла ошибка')
                await greeting(ctx)
            }
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

dashboard.action("about", async (ctx) => await about_project(ctx))

dashboard.command('home', async (ctx) => ctx.scene.enter('home'))
dashboard.command('vocabular', async (ctx) => ctx.scene.enter('vocabular'))
dashboard.command('study', async (ctx) => ctx.scene.enter('study'))
dashboard.command('dashboard', async (ctx) => ctx.scene.enter('dashboard'))
dashboard.command('back', async (ctx) => ctx.scene.enter('dashboard'))

// Обработка входящих
// handler.on("message", async (ctx) => greeting(ctx))
handler.action("common_settings", async (ctx) => {
    await section_render(ctx)
})
export default dashboard