import { Composer, Context, Scenes, Markup } from "telegraf";
import { ExtraEditMessageText, ExtraReplyMessage } from "telegraf/typings/telegram-types";
import vocabular_services from "../../Controller/vocabular";
import { MyContext } from "../../Model";
import { IUser } from "../../Model/UserModel";

const extra: ExtraEditMessageText = {
    parse_mode: 'HTML', 
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Добавить перевод',
                    callback_data: 'add'
                }
            ],
            [
                {
                    text: 'Настройки',
                    callback_data: 'settings'
                },
                {
                    text: 'На главную',
                    callback_data: 'home'
                },
            ],
        ]
    }
}

const handler = new Composer<MyContext>();
const vocabular = new Scenes.WizardScene(
    "vocabular",
    handler,

    // rules
    async (ctx: MyContext) => {
        if (ctx.updateType == 'callback_query') {
            
            let rules = `Правила \n\n`
            let extra: ExtraEditMessageText = {
                parse_mode: 'HTML'
            }

            if (ctx.update['callback_query'].data == 'rules') {
                ctx.answerCbQuery()
                await ctx.editMessageText(rules, extra)
                await ctx.reply('Ознакомились с правилами?', Markup.keyboard([['Да, всё понятно']]).resize().oneTime())
            }
        }

        if (ctx.updateType == 'message') {
            
            // проверка
            if (ctx.update['message'].text == 'Да, всё понятно') {
                Markup.removeKeyboard()
                await ctx.reply('Отправьте слово')
                ctx.wizard.next()
            }
            
        }
    },

    // get word & write
    async (ctx: MyContext) => {

        if (ctx.updateType == 'message') {

            let word = ctx.update['message'].text
            let extra: ExtraEditMessageText = {
                parse_mode: 'HTML'
            }

            await vocabular_services.insert_middleware(ctx)
            await ctx.reply(`<b>${word}</b> записан в базу данных`, extra)
            await ctx.reply(`<b>Теперь отправьте перевод к веденному тексту:</b> ${word}`, extra)

            ctx.wizard.next()
        }

    },

    async (ctx: MyContext) => {

        if (ctx.updateType == 'message') {

            let word = ctx.update['message'].text
            let extra: ExtraEditMessageText = {
                parse_mode: 'HTML'
            }

            await vocabular_services.insert_middleware_translate(ctx)
            await vocabular_services.get_middleware(ctx)
                .then(async (user: IUser) => {
                    console.log(user.middleware)
                })
        }

    }
);

async function greeting_vocabular (ctx: MyContext) {
    let message = `Словарь \n\n`

    if (ctx.updateType == 'callback_query') {

        ctx.editMessageText(message, extra)
        ctx.answerCbQuery()
    }

    if (ctx.updateType == 'message') {
        ctx.reply(message, extra)
    }
}

handler.on("message", async (ctx) => greeting_vocabular (ctx))

vocabular.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
vocabular.command("study", async (ctx) => ctx.scene.enter("study"))
vocabular.command("home", async (ctx) => ctx.scene.enter("home"))
vocabular.enter(async (ctx) => greeting_vocabular (ctx))

handler.action('home', async (ctx) => await ctx.scene.enter('home'))
handler.action('settings', async (ctx) => await ctx.answerCbQuery('Данный функционал ещё в разработке'))
handler.action('add', async (ctx) => {
    ctx.wizard.next()
    ctx.answerCbQuery()

    add_word(ctx)
})

async function add_word (ctx: MyContext) {
    let message = `Обновление словаря`
    let extra: ExtraEditMessageText = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Прочитать правила',
                        callback_data: 'rules'
                    },
                    {
                        text: 'Назад',
                        callback_data: 'back'
                    }
                ]
            ]
        }
    }

    if (ctx.updateType == 'message') {
        ctx.reply(message, extra)
    }

    if (ctx.updateType == 'callback_query') {
        ctx.editMessageText(message, extra)
    }
}

export default vocabular