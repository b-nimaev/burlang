import { Composer, Scenes } from "telegraf";
import { getTranslatedVocabular } from "../../Controller";
import { MyContext } from "../../Model/Context";

async function getVocabular() {
    const res = await getTranslatedVocabular()
    const message = "Словарь \n<code>Найдено значений: 49</code> \n"
    if (!res) {
        return false
    }

    return `Словарь \n<code>Найдено значений: ${res.length}</code>`
}

const extra = {
    parse_mode: 'HTML', reply_markup: {
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

async function greeting(ctx: MyContext) {

    const message = await getVocabular()
    if (message) {
        if (ctx.message) {
            // @ts-ignore
            ctx.reply(message, extra)
        } else {
            // @ts-ignore
            ctx.editMessageText(message, extra)
        }
    } else {
        ctx.reply("Возникла ошибка, повторите ещё раз")
        ctx.scene.enter("home")
    }
}

const handler = new Composer<MyContext>();
const vocabular = new Scenes.WizardScene(
    "vocabular",
    handler,
    (async (ctx) => {

        // Обработка cancel
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {
                if (ctx.update["callback_query"].data == 'cancel') {
                    ctx.answerCbQuery()
                    ctx.wizard.selectStep(0)
                    greeting(ctx)
                }
            }
        }

        // Обработка входящего сообщения
        if (ctx.update["message"]) {
            if (ctx.update["message"].text !== null) {
                // Получаем подтверждение у пользователя насчет введенного слова
                ctx.reply(`Введенное слово: <b>${ctx.update["message"].text}</b>`, {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Подтвердить',
                                    callback_data: 'confirm'
                                },
                                {
                                    text: 'Отмена',
                                    callback_data: 'cancel'
                                }
                            ]
                        ]
                    }
                })

                // Переходим на следующий шаг
                ctx.wizard.next();
            }
        }

    }),
    (async (ctx) => {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {

                // Обработка подтверждения || проверки
                if (ctx.update["callback_query"].data == 'confirm') {
                    ctx.answerCbQuery("Подтверждение получено")
                    ctx.editMessageText("Отправьте перевод введенной фразы")
                    ctx.wizard.next()
                }

                // Обработка отмены
                if (ctx.update["callback_query"].data == 'cancel') {
                    ctx.answerCbQuery("Отказ")
                    ctx.wizard.selectStep(1)
                    ctx.editMessageText("Отправте слово, или фразу на <b>бурятском</b>", {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Отмена',
                                        callback_data: 'cancel'
                                    }
                                ]
                            ]
                        }
                    })
                }
            }
        }
    }),
    (async (ctx) => {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {
            }
        }

        if (ctx.update["message"]) {
            if (ctx.update["message"].text !== null) {
                // Получаем подтверждение у пользователя насчет введенного слова
                ctx.reply(`Перевод: <b>${ctx.update["message"].text}</b>`, {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Подтвердить',
                                    callback_data: 'confirm'
                                },
                                {
                                    text: 'Отмена',
                                    callback_data: 'cancel'
                                }
                            ]
                        ]
                    }
                })

                // Переходим на следующий шаг
                ctx.wizard.next();
            }
        }
    }),
    (async (ctx) => {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {

                // Обработка подтверждения || проверки
                if (ctx.update["callback_query"].data == 'confirm') {
                    ctx.answerCbQuery("Информация записана. Спасибо!")
                    ctx.editMessageText("Хотите ещё поделиться информацией?", {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Да, продолжаем',
                                        callback_data: 'confirm'
                                    },
                                    {
                                        text: 'Пока что нет',
                                        callback_data: 'cancel'
                                    }
                                ]
                            ]
                        }
                    })
                    ctx.wizard.next()
                }

                // Обработка отмены
                if (ctx.update["callback_query"].data == 'cancel') {
                    ctx.answerCbQuery()
                    ctx.wizard.selectStep(1)
                    ctx.editMessageText("Отправте слово, или фразу на <b>бурятском</b>", {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Отмена',
                                        callback_data: 'cancel'
                                    }
                                ]
                            ]
                        }
                    })
                }
            }
        }
    }),
    (async (ctx) => {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {

                // Обработка подтверждения || проверки
                if (ctx.update["callback_query"].data == 'confirm') {
                    ctx.wizard.selectStep(1)
                    ctx.answerCbQuery("Продолжаем")
                    ctx.editMessageText("Отправте слово, или фразу на <b>бурятском</b>", {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Отмена',
                                        callback_data: 'cancel'
                                    }
                                ]
                            ]
                        }
                    })
                }

                // Обработка отмены
                if (ctx.update["callback_query"].data == 'cancel') {
                    ctx.answerCbQuery()
                    ctx.wizard.selectStep(1)
                    ctx.editMessageText("Отправте слово, или фразу на <b>бурятском</b>", {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Отмена',
                                        callback_data: 'cancel'
                                    }
                                ]
                            ]
                        }
                    })
                }
            }
        }
    })
);

handler.on("message", async (ctx) => greeting(ctx))

vocabular.command("dashboard", async (ctx) => ctx.scene.enter("dashboard"))
vocabular.command("study", async (ctx) => ctx.scene.enter("study"))
vocabular.command("home", async (ctx) => ctx.scene.enter("home"))
vocabular.enter(async (ctx) => greeting(ctx))

vocabular.action("home", async (ctx) => {
    ctx.answerCbQuery()
    ctx.scene.enter("home")
})
vocabular.action("add", async (ctx) => {
    ctx.answerCbQuery()
    ctx.editMessageText("Отправте слово, или фразу на <b>бурятском</b>", {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Отмена',
                        callback_data: 'cancel'
                    }
                ]
            ]
        }
    })
    ctx.wizard.next()
})
vocabular.action("settings", async (ctx) => {
    ctx.answerCbQuery()
    ctx.scene.enter("vocabular-settings")
})

export default vocabular