"use strict";
exports.__esModule = true;
var message = "Личный кабинет";
var extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Обратная связь',
                    callback_data: 'contact'
                },
                {
                    text: 'На главную',
                    callback_data: 'home'
                }
            ],
        ]
    }
};
function greeting(ctx) {
    // @ts-ignore
    ctx.update["message"] ? ctx.reply(message, extra) : ctx.editMessageText(message, extra);
}
exports["default"] = greeting;
