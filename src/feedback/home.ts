import { Composer, Scenes } from "telegraf";
import { MyContext } from "../bot/model/Context";
import { feedback_manager_register, get_feedback_managers, get_feedback_props, register_feedback_manager, write_feedback_prop } from "../bot/controller";

const extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Начать просмотр',
                    callback_data: 'view'
                }
            ]
        ]
    }
}
const handler = new Composer<MyContext>();
const home = new Scenes.WizardScene(
    "home",
    handler,
);


export async function greeting(ctx: MyContext) {

    const message = await get_feedback_props()
        .then(messages => { return `Входящих отзывов ${messages.length}` })

    if (ctx.update["callback_query"]) {

        if (!await feedback_manager_register(ctx.update["callback_query"].from)) {
            return ctx.reply('Нет прав')
        }

        // @ts-ignore
        ctx.editMessageText(message, extra)
        ctx.answerCbQuery()

    } else if (ctx.update["message"]) {

        if (!await feedback_manager_register(ctx.update["message"].from)) {
            return ctx.reply('Нет прав')
        } else {
            try {
                // @ts-ignore
                await ctx.reply(message, extra)
            } catch (err) {
                ctx.reply('Попробуйте снова')
            }
        }
    }
}

home.enter((ctx) => greeting(ctx))
home.hears(/\/start/, async (ctx) => greeting(ctx))

home.hears(/\/register/, async (ctx) => {
    try {
        await register_feedback_manager(ctx.update["message"].from)
            .then(data => console.log(data))
    } catch (err) {
        ctx.reply("Попробуйте снова")
    }
})

home.action('view', async (ctx) => {

    ctx.answerCbQuery()
    const messages = await get_feedback_props()

    for (let i = 0; i < messages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        await ctx.telegram.copyMessage(ctx.update["callback_query"].from.id, messages[i].chat.id, messages[i].message_id)
    }
})

home.on("message", async (ctx) => greeting(ctx))

export default home