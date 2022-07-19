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
var DashboardGreeting_1 = require("./DashboardGreeting");
require("dotenv").config();
var subscribe_message = "<b>\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 / \u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430</b>";
var subscribe_extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Оформить подписку',
                    callback_data: 'subscribe'
                },
                {
                    text: 'Назад',
                    callback_data: 'back'
                }
            ]
        ]
    }
};
var payment_extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Назад',
                    callback_data: 'back'
                }
            ]
        ]
    }
};
var handler = new telegraf_1.Composer();
var dashboard = new telegraf_1.Scenes.WizardScene("dashboard", handler, (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.update["message"]) {
            if (ctx.update["message"]) {
                try {
                    ctx.forwardMessage(process.env.channel_id).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.reply("Спасибо за обратную связь! \nВаше сообщение получено")];
                                case 1:
                                    _a.sent();
                                    ctx.scene.enter("dashboard");
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                catch (err) {
                    ctx.copyMessage(process.env.channel_id).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.reply("Спасибо за обратную связь! \nВаше сообщение получено")];
                                case 1:
                                    _a.sent();
                                    ctx.scene.enter("dashboard");
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
            }
        }
        return [2 /*return*/];
    });
}); }), (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.update["message"]) {
            subcribe_greeting(ctx);
        }
        else {
            if (ctx.update["callback_query"]) {
                if (ctx.update["callback_query"].data == "subscribe") {
                    ctx.wizard.next();
                    // @ts-ignore
                    payment_greeting(ctx);
                }
                if (ctx.update["callback_query"].data == "about") {
                    ctx.wizard.selectStep(4);
                    // @ts-ignore
                    ctx.editMessageText('О проекте ...', payment_extra);
                    return [2 /*return*/, ctx.answerCbQuery('О проекте')];
                }
                if (ctx.update["callback_query"].data == "back") {
                    console.log("back");
                    (0, DashboardGreeting_1["default"])(ctx);
                    return [2 /*return*/, ctx.answerCbQuery()];
                }
                // ctx.update["callback_query"].data == "back" ? subcribe_greeting(ctx) : ctx.reply("Возникла непредвиденная Ошибка, повторите снова, пожалуйста /dashboard")
            }
        }
        return [2 /*return*/];
    });
}); }), 
// payment section
(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data == 'back') {
                subcribe_greeting(ctx);
                return [2 /*return*/, ctx.answerCbQuery()];
            }
        }
        if (ctx.update["message"]) {
            payment_greeting(ctx);
        }
        return [2 /*return*/];
    });
}); }), (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data == "back") {
                (0, DashboardGreeting_1["default"])(ctx);
                ctx.answerCbQuery();
            }
        }
        else {
            about_greeting(ctx);
        }
        return [2 /*return*/];
    });
}); }));
dashboard.enter(function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (0, DashboardGreeting_1["default"])(ctx)];
}); }); });
dashboard.action("home", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.scene.enter("home");
        ctx.answerCbQuery();
        return [2 /*return*/];
    });
}); });
handler.action("contact", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.wizard.next();
        ctx.editMessageText("Отправьте сообщение, администрация ответит в ближайшее время");
        ctx.answerCbQuery();
        return [2 /*return*/];
    });
}); });
dashboard.action("subscription", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, subcribe_greeting(ctx)];
}); }); });
function subcribe_greeting(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (ctx.update["message"]) {
                ctx.reply(subscribe_message, subscribe_extra);
            }
            else {
                ctx.wizard.selectStep(2);
                // @ts-ignore
                ctx.editMessageText(subscribe_message, subscribe_extra);
                ctx.answerCbQuery('Личный кабинет / Подписка');
            }
            return [2 /*return*/];
        });
    });
}
dashboard.action("about", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, about_greeting(ctx)];
}); }); });
function about_greeting(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (ctx.update["message"]) {
                ctx.reply("О проекте ...", payment_extra);
            }
            else {
                ctx.wizard.selectStep(4);
                // @ts-ignore
                ctx.editMessageText('О проекте ...', payment_extra);
                return [2 /*return*/, ctx.answerCbQuery('О проекте')];
            }
            return [2 /*return*/];
        });
    });
}
function payment_greeting(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (ctx.update["callback_query"]) {
                ctx.editMessageText('Тут вывести метод оплаты', payment_extra);
                return [2 /*return*/, ctx.answerCbQuery('Оформление подписки')];
            }
            else {
                ctx.reply('Тут вывести метод оплаты', payment_extra);
            }
            return [2 /*return*/];
        });
    });
}
// Получаем название сцены из массива и переходим, если это команда
dashboard.command(process.env.scenes.split(","), function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter(ctx.update["message"].text.replace('/', ''))];
}); }); });
// Обработка входящих
// handler.on("message", async (ctx) => greeting(ctx))
exports["default"] = dashboard;
//# sourceMappingURL=DashboardScene.js.map