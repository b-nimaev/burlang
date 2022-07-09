import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";
let scenes: Array<string> = process.env.scenes.split(",")
let partials: Array<string> = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"]
scenes = scenes.concat(partials)

const message = "<b>Алфавит</b> \nhttps://telegra.ph/Alfavit-07-08"
const extraGreeting = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Начать изучение',
                    callback_data: 'start'
                },
                {
                    text: 'Назад',
                    callback_data: "back"
                },
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
    }
}

const handler = new Composer<MyContext>();
const scene = new Scenes.WizardScene(
    "alphabet",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

scene.command(scenes, async (ctx) => ctx.scene.enter(ctx.update["message"].text.replace('/', '')))
scene.enter(async (ctx) => greeting(ctx))

scene.action("start", async (ctx) => {
    ctx.answerCbQuery()
})

scene.action("back", async (ctx) => {
    ctx.scene.enter('study')
    ctx.answerCbQuery()
})

export default scene