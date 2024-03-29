import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model";
const scenes = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"]
const message = "Самоучитель"
const extraGreeting = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Алфавит',
                    callback_data: 'alphabet'
                },
                {
                    text: 'Звуки и буквы',
                    callback_data: "soundsAndLetters"
                },
            ],
            [
                {
                    text: 'Словообразование',
                    callback_data: "wordFormation"
                },
                {
                    text: 'Части речи',
                    callback_data: 'partsOfSpeech'
                }
            ],
            [
                {
                    text: 'Падежи',
                    callback_data: "cases"
                },
                {
                    text: 'Глаголы',
                    callback_data: "verbs"
                },
                {
                    text: 'Предложения',
                    callback_data: 'sentences'
                }
            ],
            [
                {
                    text: 'Отрицание в бурятском языке',
                    callback_data: "negation"
                }
            ],
            [
                {
                    text: 'На главную',
                    callback_data: "home"
                }
            ],
        ]
    }
}

function greeting(ctx: MyContext) {
    if (ctx.update["message"]) {
        // @ts-ignore
        ctx.reply(message, extraGreeting)
    } else {
        // @ts-ignore
        ctx.editMessageText(message, extraGreeting)
        ctx.answerCbQuery()
    }
}

const handler = new Composer<MyContext>();
const study = new Scenes.WizardScene(
    "study",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

study.command('home', async (ctx) => ctx.scene.enter('home'))
study.command('vocabular', async (ctx) => ctx.scene.enter('vocabular'))
study.command('study', async (ctx) => ctx.scene.enter('study'))
study.command('dashboard', async (ctx) => ctx.scene.enter('dashboard'))
study.command('back', async (ctx) => ctx.scene.enter('study'))

study.enter(async (ctx) => greeting(ctx))
study.action("start", async (ctx) => {
    return ctx.answerCbQuery()
})
study.action(/.*/, async (ctx: MyContext) => {
    try {
        ctx.scene.enter(ctx.update["callback_query"].data)
    } catch (err) {
        ctx.scene.enter('home')
        console.log(err)
    }

    ctx.answerCbQuery()
})


export default study