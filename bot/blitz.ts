import { Composer, Scenes } from "telegraf";
import { setWord } from "./controller";
import { MyContext } from "./model/Context";
require("dotenv").config()

const message = "Блиц добавление слов"
const extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Начать',
                    callback_data: 'start'
                },
                {
                    text: 'На главную',
                    callback_data: 'home'
                }
            ],
        ]
    }
}

const exists_words = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Дополнить',
                    callback_data: 'supplement'
                }
            ],
        ]
    }
}

function greeting(ctx: MyContext) {
    if (ctx.update["callback_query"]) {
        // @ts-ignore
        ctx.editMessageText(message, extra)
    } else {
        // @ts-ignore
        ctx.reply(message, extra)
    }
}

const handler = new Composer<MyContext>();
const blitz = new Scenes.WizardScene(
    "blitz",
    handler,
    (async (ctx) => {
        if (ctx.update["message"]) {
            const translate = ctx.update["message"].text
            try {
                await setWord(ctx.update).then(async (res) => {

                    if (typeof (res) == 'object') {
                        if (res.status == 'exists') {

                            let words: string = ``
                            let length = res.words.length

                            res.words.forEach((element, index) => {
                                
                                if (index !== length) {
                                    words += ', '
                                }
                                
                                words += element

                            });

                            return await ctx.reply(`Есть перевод на слово <b>${translate}</b> \n ${words}`, exists_words)
                        }
                    }

                    if (res == 'added') {
                        await ctx.reply(`<b>${translate}</b> добавлен, теперь отправьте перевод`)
                        ctx.wizard.next()
                    }
                })
            } catch (err) {
                await ctx.reply("Возникла ошибка, попробуйте снова")
            }
        }
    })
);

handler.on("message", async (ctx) => greeting(ctx))

blitz.command("vocabular", async (ctx) => ctx.scene.enter("vocabular"))
blitz.command("study", async (ctx) => ctx.scene.enter("study"))
blitz.command("home", async (ctx) => ctx.scene.enter("home"))
blitz.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
blitz.enter(async (ctx) => greeting(ctx))

blitz.action("home", async (ctx) => {
    ctx.answerCbQuery()
    ctx.scene.enter("home")
})
blitz.action("start", async (ctx) => {
    ctx.answerCbQuery()
    ctx.wizard.next()
    ctx.editMessageText("Начинайте!")
})
blitz.action("supplement", async (ctx) => {
    
})

export default blitz
