import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";
const message = "Отрицание в бурятском языке"
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
const negation = new Scenes.WizardScene(
    "negation",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

negation.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
negation.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
negation.command("study", async (ctx) => ctx.scene.enter("study"))
negation.command("home", async (ctx) => ctx.scene.enter("home"))
negation.enter(async (ctx) => greeting(ctx))

negation.action("back", async (ctx) => ctx.scene.enter('study'))

export default negation