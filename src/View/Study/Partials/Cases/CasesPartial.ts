import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";
const message = "Падежи"
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
const cases = new Scenes.WizardScene(
    "cases",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

cases.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
cases.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
cases.command("study", async (ctx) => ctx.scene.enter("study"))
cases.command("home", async (ctx) => ctx.scene.enter("home"))
cases.enter(async (ctx) => greeting(ctx))

cases.action("back", async (ctx) => ctx.scene.enter('study'))

export default cases