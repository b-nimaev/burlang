"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var telegraf_1 = require("telegraf");
var message = "Словарь \n<code>Найдено значений: 49</code> \n";
var extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Добавить',
                    callback_data: 'add'
                },
                {
                    text: 'На главную',
                    callback_data: 'home'
                },
            ],
            [
                {
                    text: 'Настройки',
                    callback_data: 'settings'
                }
            ]
        ]
    }
};
function greeting(ctx) {
    if (ctx.message) {
        // @ts-ignore
        ctx.reply(message, extra);
    }
    else {
        // @ts-ignore
        ctx.editMessageText(message, extra);
    }
}
var handler = new telegraf_1.Composer();
var vocabular = new telegraf_1.Scenes.WizardScene("vocabular", handler, (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Обработка cancel
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {
                if (ctx.update["callback_query"].data == 'cancel') {
                    ctx.answerCbQuery();
                    ctx.wizard.selectStep(0);
                    greeting(ctx);
                }
            }
        }
        // Обработка входящего сообщения
        if (ctx.update["message"]) {
            if (ctx.update["message"].text !== null) {
                // Получаем подтверждение у пользователя насчет введенного слова
                ctx.reply("\u0412\u0432\u0435\u0434\u0435\u043D\u043D\u043E\u0435 \u0441\u043B\u043E\u0432\u043E: <b>".concat(ctx.update["message"].text, "</b>"), {
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
                });
                // Переходим на следующий шаг
                ctx.wizard.next();
            }
        }
        return [2 /*return*/];
    });
}); }), (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {
                // Обработка подтверждения || проверки
                if (ctx.update["callback_query"].data == 'confirm') {
                    ctx.answerCbQuery("Подтверждение получено");
                    ctx.editMessageText("Отправьте перевод введенной фразы");
                    ctx.wizard.next();
                }
                // Обработка отмены
                if (ctx.update["callback_query"].data == 'cancel') {
                    ctx.answerCbQuery("Отказ");
                    ctx.wizard.selectStep(1);
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
                    });
                }
            }
        }
        return [2 /*return*/];
    });
}); }), (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {
            }
        }
        if (ctx.update["message"]) {
            if (ctx.update["message"].text !== null) {
                // Получаем подтверждение у пользователя насчет введенного слова
                ctx.reply("\u041F\u0435\u0440\u0435\u0432\u043E\u0434: <b>".concat(ctx.update["message"].text, "</b>"), {
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
                });
                // Переходим на следующий шаг
                ctx.wizard.next();
            }
        }
        return [2 /*return*/];
    });
}); }), (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {
                // Обработка подтверждения || проверки
                if (ctx.update["callback_query"].data == 'confirm') {
                    ctx.answerCbQuery("Информация записана. Спасибо!");
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
                    });
                    ctx.wizard.next();
                }
                // Обработка отмены
                if (ctx.update["callback_query"].data == 'cancel') {
                    ctx.answerCbQuery();
                    ctx.wizard.selectStep(1);
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
                    });
                }
            }
        }
        return [2 /*return*/];
    });
}); }), (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {
                // Обработка подтверждения || проверки
                if (ctx.update["callback_query"].data == 'confirm') {
                    ctx.wizard.selectStep(1);
                    ctx.answerCbQuery("Продолжаем");
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
                    });
                }
                // Обработка отмены
                if (ctx.update["callback_query"].data == 'cancel') {
                    ctx.answerCbQuery();
                    ctx.wizard.selectStep(1);
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
                    });
                }
            }
        }
        return [2 /*return*/];
    });
}); }));
handler.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
vocabular.command("dashboard", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("dashboard")];
}); }); });
vocabular.command("study", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("study")];
}); }); });
vocabular.command("home", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("home")];
}); }); });
vocabular.enter(function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
vocabular.action("home", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
        ctx.scene.enter("home");
        return [2 /*return*/];
    });
}); });
vocabular.action("add", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
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
        });
        ctx.wizard.next();
        return [2 /*return*/];
    });
}); });
vocabular.action("settings", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
        ctx.scene.enter("vocabular-settings");
        return [2 /*return*/];
    });
}); });
exports["default"] = vocabular;
