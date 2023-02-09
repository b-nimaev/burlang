import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";

const message = "Звуки и буквы"
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
const soundsAndLetters = new Scenes.WizardScene(
    "soundsAndLetters",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

soundsAndLetters.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
soundsAndLetters.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
soundsAndLetters.command("study", async (ctx) => ctx.scene.enter("study"))
soundsAndLetters.command("home", async (ctx) => ctx.scene.enter("home"))
soundsAndLetters.enter(async (ctx) => greeting(ctx))

soundsAndLetters.action("back", async (ctx) => ctx.scene.enter('study'))
soundsAndLetters.action("start", async (ctx) => {
    ctx.answerCbQuery()
})

export default soundsAndLetters