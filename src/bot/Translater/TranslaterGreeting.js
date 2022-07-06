"use strict";
exports.__esModule = true;
var message = "<b>Переводчик</b> \n\nОтправьте текст для перевода";
var extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
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
