import { Composer, Scenes } from "telegraf";
import { MyContext } from "../model/Context";

function greeting(ctx: MyContext) {
    if (ctx.message) {
        ctx.reply("Личный кабинет", {
            parse_mode: 'HTML', reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Добавить',
                            callback_data: 'add'
                        },
                    ],
                ]
            }
        })
    } else {
        ctx.editMessageText("Личный кабинет", {
            parse_mode: 'HTML', reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Добавить',
                            callback_data: 'add'
                        },
                    ],
                ]
            }
        })
    }
}

const handler = new Composer<MyContext>();
const dashboard = new Scenes.WizardScene(
    "dashboard",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

dashboard.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
dashboard.command("study", async (ctx) => ctx.scene.enter("study"))
dashboard.command("home", async (ctx) => ctx.scene.enter("home"))
dashboard.enter(async (ctx) => greeting(ctx))

export default dashboard