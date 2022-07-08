import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model";

const message = "Самоучитель"
const scenes = ["study", "vocabular", "translater", "dashboard", "home", "blitz"]
const extraGreeting = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Алфавит',
                    callback_data: 'add'
                },
                {
                    text: 'Звуки и буквы',
                    callback_data: "home"
                },
            ],
            [
                {
                    text: 'Словообразование',
                    callback_data: "home"
                },
                {
                    text: 'Части речи',
                    callback_data: 'add'
                }
            ],
            [
                {
                    text: 'Падежи',
                    callback_data: "home"
                },
                {
                    text: 'Глаголы',
                    callback_data: "home"
                },
                {
                    text: 'Предложения',
                    callback_data: 'add'
                }
            ],
            [
                {
                    text: 'Отриацание в бурятском языке',
                    callback_data: "home"
                }
            ],
            [
                {
                    text: 'На главную',
                    callback_data: "home"
                }
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
const study = new Scenes.WizardScene(
    "study",
    handler
);

// handler.on("message", async (ctx) => greeting(ctx))
study.enter(async (ctx) => greeting(ctx))

study.action("home", async (ctx) => ctx.scene.enter("home"))
// Получаем название сцены из массива и переходим, если это команда
study.command(scenes, async (ctx) => {
    console.log(ctx.update["message"])
})

export default study