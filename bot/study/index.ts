import { Composer, Scenes } from "telegraf";
import { MyContext } from "../model/Context";

function greeting(ctx: MyContext) {
    if (ctx.message) {
        ctx.reply("Самоучитель", {
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
        ctx.editMessageText("Самоучитель", {
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
const study = new Scenes.WizardScene(
    "study",
    handler
);

handler.on("message", async (ctx) => greeting(ctx))

study.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
study.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
study.command("home", async (ctx) => ctx.scene.enter("home"))
study.enter(async (ctx) => greeting(ctx))



export default study