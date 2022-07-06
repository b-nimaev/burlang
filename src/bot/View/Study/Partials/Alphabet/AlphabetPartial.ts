import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";
const scenes = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"]
const message = "Алфавит"
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

scene.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
scene.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
scene.command("study", async (ctx) => ctx.scene.enter("study"))
scene.command("home", async (ctx) => ctx.scene.enter("home"))
scene.enter(async (ctx) => greeting(ctx))

scene.action("back", async (ctx) => ctx.scene.enter('study'))
scene.action(/.*/, async (ctx) => ctx.scene.enter(ctx.update["callback_query"].data))


export default scene