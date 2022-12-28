import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../../../Model";
let partials: Array<string> = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"]

const message = "<b>Алфавит</b> \nhttps://telegra.ph/Alfavit-07-08"
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

async function first_scene (ctx: MyContext) {

    if (ctx.updateType == 'callback_query') {
        console.log(ctx.update['callback_query'].data)
    } else if (ctx.updateType == 'message') {
        console.log(ctx.update['message'].text)
    }

}

const handler = new Composer<MyContext>();
const alphabet = new Scenes.WizardScene(
    "alphabet",
    handler,
    (async (ctx) => await first_scene (ctx))
);

handler.on("message", async (ctx) => greeting(ctx))

alphabet.enter(async (ctx) => greeting(ctx))

function later(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

alphabet.action("start", async (ctx) => {
    ctx.answerCbQuery()
    ctx.wizard.selectStep(1)
    console.log(ctx.from.id)
    await later(300)
    await ctx.telegram.sendChatAction(ctx.from.id, 'typing')
    await ctx.editMessageText('Какой-то текст призывающий запомнить следующий материал')
    await ctx.telegram.sendChatAction(ctx.from.id, 'typing')
    await later(1000)
    await ctx.reply('Буквы <b>в, к, ф, ц, ч, ш, щ, ъ</b>, используются только в русских именах и заимствованиях', { parse_mode: 'HTML' });
    await ctx.telegram.sendChatAction(ctx.from.id, 'typing')
    await later(300)
    await ctx.reply('б=[p], г=[k], ж=[ʃ], а з=[s]');
    await ctx.telegram.sendChatAction(ctx.from.id, 'typing')
    await later(300)
    await ctx.reply('полугласная - й')
    await ctx.telegram.sendChatAction(ctx.from.id, 'typing')
    await later(300)
    await ctx.reply('буква һ является согласной')
    await ctx.telegram.sendChatAction(ctx.from.id, 'typing')
    await later(300)
    await ctx.reply('н=[ŋ] перед г и x, а также в конце слов')
})

alphabet.action("back", async (ctx) => {
    ctx.scene.enter('study')
    ctx.answerCbQuery()
})

export default alphabet