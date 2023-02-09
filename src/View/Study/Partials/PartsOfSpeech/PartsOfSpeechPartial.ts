import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";
const scenes = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"]
const message = "Части речи"
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
const partsOfSpeech = new Scenes.WizardScene(
    "partsOfSpeech",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

partsOfSpeech.command('home', async (ctx) => ctx.scene.enter('home'))
partsOfSpeech.command('vocabular', async (ctx) => ctx.scene.enter('vocabular'))
partsOfSpeech.command('study', async (ctx) => ctx.scene.enter('study'))
partsOfSpeech.command('dashboard', async (ctx) => ctx.scene.enter('dashboard'))
partsOfSpeech.command('back', async (ctx) => ctx.scene.enter('study'))
partsOfSpeech.enter(async (ctx) => greeting(ctx))

partsOfSpeech.action("back", async (ctx) => ctx.scene.enter('study'))


export default partsOfSpeech