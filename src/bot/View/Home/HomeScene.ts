import { Composer, Scenes } from "telegraf";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";
import UserConrtoller from "../../Controller/User/UserController";
import { MyContext } from "../../Model";
import IUser from "../../Model/User/IUserModel";
require("dotenv").config();

let partials: Array<string> = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"]

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
            ctx.wizard.selectStep(1)
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
        await UserConrtoller.save_user(ctx)
        await UserConrtoller.check_gender(ctx)
            .then(async (user: IUser) => {

                // Проверка на существование поля пол
                if (!user.male) {

                    ctx.wizard.next()

                    let message = `Привет ${ctx.from.first_name}, выберите ваш пол`
                    let extra: ExtraReplyMessage = {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Мужчина',
                                        callback_data: 'male'
                                    },
                                    {
                                        text: 'Женщина',
                                        callback_data: 'female'
                                    }
                                ],
                                [
                                    {
                                        text: 'Не указывать',
                                        callback_data: 'later'
                                    }
                                ]
                            ]
                        }
                    }

                    await ctx.reply(message, extra)
                } else {
                    await greeting(ctx)
                }
            })


    } catch (err) {
        // err
    }
})

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


        ctx.answerCbQuery(`Нет доступа 🔐`)

    }

})

// Обработка входящих
handler.on("message", async (ctx) => greeting(ctx))

export default home