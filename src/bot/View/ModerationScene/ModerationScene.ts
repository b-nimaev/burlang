import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../Model";

const handler = new Composer<MyContext>();
const moderation = new Scenes.WizardScene(
    'moderation',
    handler
)

moderation.enter(async (ctx) => {
    if (ctx.updateType == 'callback_query') {
        await ctx.editMessageText('Модерация' )
    } else {
        await ctx.reply('Модерация')
    }
})

export default moderation