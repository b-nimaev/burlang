import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model";
require("dotenv").config();

const scenes = process.env.scenes.split(",")
console.log(scenes)
const handler = new Composer<MyContext>();
const home = new Scenes.WizardScene(
    "home",
    handler,
);

export function greeting(ctx: MyContext) {
    const extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Самоучитель", callback_data: "study" },
                    { text: "Словарь", callback_data: "vocabular" }
                ],
                [{ text: 'Переводчик', callback_data: 'translater' }],
                [{ text: "Личный кабинет", callback_data: "dashboard" }]
            ]
        }
    }

    let message = `Самоучитель бурятского языка \n\nКаждое взаимодействие с ботом, \nвлияет на сохранение и дальнейшее развитие <b>Бурятского языка</b> \n\nВыберите раздел, чтобы приступить`

    // @ts-ignore
    ctx.update["message"] ? ctx.reply(message, extra) : ctx.editMessageText(message, extra)
}

home.enter((ctx) => greeting(ctx))
home.action(/.*/, async (ctx) => {

    // Название сцены
    const data = ctx.update["callback_query"].data

    await ctx.scene.enter(data)
    await ctx.answerCbQuery(data)

})

// Получаем название сцены из массива и переходим, если это команда
handler.command(scenes, async (ctx) => {
    console.log(ctx.update["message"].text.replace('/', ''))
    ctx.scene.enter(ctx.update["message"].text.replace('/', ''))
})

// Обработка входящих
// handler.on("message", async (ctx) => greeting(ctx))

// 
export default home