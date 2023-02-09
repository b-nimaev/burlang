import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";
const message = "Глаголы"
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
const verbs = new Scenes.WizardScene(
    "verbs",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

verbs.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
verbs.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
verbs.command("study", async (ctx) => ctx.scene.enter("study"))
verbs.command("home", async (ctx) => ctx.scene.enter("home"))
verbs.enter(async (ctx) => greeting(ctx))

verbs.action("back", async (ctx) => ctx.scene.enter('study'))

export default verbs