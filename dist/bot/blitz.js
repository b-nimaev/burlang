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
var controller_1 = require("./controller");
require("dotenv").config();
var message = "Блиц добавление слов";
var extra = {
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
};
var exists_words = {
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
};
function greeting(ctx) {
    if (ctx.update["callback_query"]) {
        // @ts-ignore
        ctx.editMessageText(message, extra);
    }
    else {
        // @ts-ignore
        ctx.reply(message, extra);
    }
}
var handler = new telegraf_1.Composer();
var blitz = new telegraf_1.Scenes.WizardScene("blitz", handler, (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var translate_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.update["message"]) return [3 /*break*/, 5];
                translate_1 = ctx.update["message"].text;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 5]);
                return [4 /*yield*/, (0, controller_1.setWord)(ctx.update).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                        var words_1, length_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(typeof (res) == 'object')) return [3 /*break*/, 2];
                                    if (!(res.status == 'exists')) return [3 /*break*/, 2];
                                    words_1 = "";
                                    length_1 = res.words.length;
                                    res.words.forEach(function (element, index) {
                                        if (index !== length_1) {
                                            words_1 += ', ';
                                        }
                                        words_1 += element;
                                    });
                                    return [4 /*yield*/, ctx.reply("\u0415\u0441\u0442\u044C \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u043D\u0430 \u0441\u043B\u043E\u0432\u043E <b>".concat(translate_1, "</b> \n ").concat(words_1), exists_words)];
                                case 1: 
                                // @ts-ignore
                                return [2 /*return*/, _a.sent()];
                                case 2:
                                    if (!(res == 'added')) return [3 /*break*/, 4];
                                    ctx.scene.session.word = translate_1;
                                    return [4 /*yield*/, ctx.reply("<b>".concat(translate_1, "</b> \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D, \u0442\u0435\u043F\u0435\u0440\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434"), {
                                            parse_mode: 'HTML'
                                        })];
                                case 3:
                                    _a.sent();
                                    ctx.wizard.next();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                err_1 = _a.sent();
                return [4 /*yield*/, ctx.reply("Возникла ошибка, попробуйте снова")];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }), (function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var translate, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!ctx.update["message"]) return [3 /*break*/, 6];
                translate = ctx.update["message"].text;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 6]);
                return [4 /*yield*/, (0, controller_1.setTranslate)(ctx.update["message"], ctx.scene.session.word)];
            case 2:
                _a.sent();
                return [4 /*yield*/, ctx.reply("\"".concat(translate, "\" \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u043A \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0443, \n\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0435\u0449\u0451"), {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'Выбрать другое слово',
                                        callback_data: 'cancel'
                                    }
                                ],
                            ]
                        }
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                err_2 = _a.sent();
                return [4 /*yield*/, ctx.reply("Возникла ошибка, попробуйте ещё раз, или вернитесь назад /back")];
            case 5:
                _a.sent();
                return [3 /*break*/, 6];
            case 6:
                if (ctx.update["callback_query"]) {
                    if (ctx.update["callback_query"].data == 'cancel') {
                        greeting(ctx);
                        ctx.wizard.selectStep(0);
                    }
                }
                return [2 /*return*/];
        }
    });
}); }));
handler.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
blitz.command("vocabular", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("vocabular")];
}); }); });
blitz.command("study", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("study")];
}); }); });
blitz.command("home", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("home")];
}); }); });
blitz.command("dashboard", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("dashboard")];
}); }); });
blitz.enter(function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
blitz.action("home", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
        ctx.scene.enter("home");
        return [2 /*return*/];
    });
}); });
blitz.action("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
        ctx.wizard.next();
        ctx.editMessageText("Начинайте!");
        return [2 /*return*/];
    });
}); });
blitz.action("supplement", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
        ctx.wizard.next();
        return [2 /*return*/];
    });
}); });
exports["default"] = blitz;
//# sourceMappingURL=blitz.js.map