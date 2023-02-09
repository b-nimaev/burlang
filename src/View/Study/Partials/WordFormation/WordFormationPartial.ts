import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";
const scenes = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"]
const message = "Словообразованиие"
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
const wordFormation = new Scenes.WizardScene(
    "wordFormation",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

wordFormation.command('home', async (ctx) => ctx.scene.enter('home'))
wordFormation.command('vocabular', async (ctx) => ctx.scene.enter('vocabular'))
wordFormation.command('study', async (ctx) => ctx.scene.enter('study'))
wordFormation.command('dashboard', async (ctx) => ctx.scene.enter('dashboard'))
wordFormation.command('back', async (ctx) => ctx.scene.enter('study'))
wordFormation.enter(async (ctx) => greeting(ctx))
wordFormation.action("back", async (ctx) => ctx.scene.enter('study'))

export default wordFormation