import { Composer, Scenes } from "telegraf";
import UserConrtoller from "../../Controller/User/UserController";
import { MyContext } from "../../Model";
require("dotenv").config();

const handler = new Composer<MyContext>();
const home = new Scenes.WizardScene(
    "home",
    handler,
    async (ctx) => await select_gender(ctx)
);

async function select_gender (ctx: MyContext) {
    try {
        if (ctx.updateType == 'callback_query') {
            await UserConrtoller.update_gender(ctx)
            ctx.answerCbQuery()
            await greeting(ctx)
            ctx.wizard.selectStep(0)
        }
    } catch (err) {
        // err
    }
}

export function greeting(ctx: MyContext) {

    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Самоучитель", callback_data: "study" },
                    { text: "Словарь", callback_data: "vocabular" }
                ],
                [{ text: 'Переводчик', callback_data: 'translater' }],
                [{ text: 'Модерация', callback_data: 'moderation' }],
                [{ text: "Личный кабинет", callback_data: "dashboard" }]
            ]
        }
    }
    
    let message = `Самоучитель бурятского языка \n\nКаждое взаимодействие с ботом, \nвлияет на сохранение и дальнейшее развитие <b>Бурятского языка</b> \n\nВыберите раздел, чтобы приступить`

    // @ts-ignore
    return ctx.update["message"] ? ctx.reply(message, extra) : ctx.editMessageText(message, extra)
}

home.start(async (ctx) => {

    try {

        let user = await UserConrtoller.get_user(ctx)
        if (!user) {
            await UserConrtoller.save_user(ctx).catch(err => {
                ctx.wizard.selectStep(1)
            })
            await greeting(ctx)
        } else {
            return await greeting(ctx)
        }

    } catch (err) {
        // err
    }
})

home.command('home', async (ctx) => ctx.scene.enter('home'))
home.command('vocabular', async (ctx) => ctx.scene.enter('vocabular'))
home.command('study', async (ctx) => ctx.scene.enter('study'))
home.command('dashboard', async (ctx) => ctx.scene.enter('dashboard'))
home.command('back', async (ctx) => ctx.scene.enter('home'))

home.enter((ctx) => greeting(ctx))

handler.action(/./, async (ctx) => {
    // ctx.answerCbQuery()

    if (ctx.updateType == 'callback_query') {

        let callback_data = ctx.update['callback_query']['data']
        console.log(callback_data)
        if (callback_data == 'study') {

            return ctx.scene.enter('study')

        }

        if (callback_data == 'dashboard') {

            return ctx.scene.enter('dashboard')

        }

        if (callback_data == 'vocabular') {
            return ctx.scene.enter("vocabular")
        }

        if (callback_data == 'moderation') {
            let res = await UserConrtoller.moderation_privilege(ctx)
            if (!res) {
                return ctx.answerCbQuery(`Нет доступа 🔐`)
            } else {
                ctx.answerCbQuery()
                return ctx.scene.enter('moderation')
            }
        }

        ctx.answerCbQuery(`Нет доступа 🔐`)

    }

})

// Обработка входящих
handler.on("message", async (ctx) => greeting(ctx))

export default home