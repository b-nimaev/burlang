import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";
const message = "Предложения"
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
const sentences = new Scenes.WizardScene(
    "sentences",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

sentences.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
sentences.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
sentences.command("study", async (ctx) => ctx.scene.enter("study"))
sentences.command("home", async (ctx) => ctx.scene.enter("home"))
sentences.enter(async (ctx) => greeting(ctx))

sentences.action("back", async (ctx) => ctx.scene.enter('study'))

export default sentences