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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.greeting = void 0;
var telegraf_1 = require("telegraf");
var UserController_1 = require("../../Controller/User/UserController");
require("dotenv").config();
var handler = new telegraf_1.Composer();
var home = new telegraf_1.Scenes.WizardScene("home", handler, function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, select_gender(ctx)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
function select_gender(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!(ctx.updateType == 'callback_query')) return [3 /*break*/, 3];
                    return [4 /*yield*/, UserController_1["default"].update_gender(ctx)];
                case 1:
                    _a.sent();
                    ctx.answerCbQuery();
                    return [4 /*yield*/, greeting(ctx)];
                case 2:
                    _a.sent();
                    ctx.wizard.selectStep(0);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function greeting(ctx) {
    var extra = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Самоучитель", callback_data: "study" },
                    { text: "Словарь", callback_data: "vocabular" }
                ],
                [{ text: 'Переводчик', callback_data: 'translater' }],
                [{ text: 'Модерация', callback_data: 'moderation' }],
                [{ text: "Личный кабинет", callback_data: "dashboard" }]
            ]
        }
    };
    var message = "\u0421\u0430\u043C\u043E\u0443\u0447\u0438\u0442\u0435\u043B\u044C \u0431\u0443\u0440\u044F\u0442\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430 \n\n\u041A\u0430\u0436\u0434\u043E\u0435 \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u0431\u043E\u0442\u043E\u043C, \n\u0432\u043B\u0438\u044F\u0435\u0442 \u043D\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0438 \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0435 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435 <b>\u0411\u0443\u0440\u044F\u0442\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430</b> \n\n\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u0434\u0435\u043B, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u0441\u0442\u0443\u043F\u0438\u0442\u044C";
    // @ts-ignore
    return ctx.update["message"] ? ctx.reply(message, extra) : ctx.editMessageText(message, extra);
}
exports.greeting = greeting;
home.start(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, UserController_1["default"].get_user(ctx)];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 4];
                return [4 /*yield*/, UserController_1["default"].save_user(ctx)["catch"](function (err) {
                        ctx.wizard.selectStep(1);
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, greeting(ctx)];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, greeting(ctx)];
            case 5: return [2 /*return*/, _a.sent()];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _a.sent();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
home.command('home', function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter('home')];
}); }); });
home.command('vocabular', function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter('vocabular')];
}); }); });
home.command('study', function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter('study')];
}); }); });
home.command('dashboard', function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter('dashboard')];
}); }); });
home.command('back', function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter('home')];
}); }); });
home.enter(function (ctx) { return greeting(ctx); });
handler.action(/./, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var callback_data, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(ctx.updateType == 'callback_query')) return [3 /*break*/, 3];
                callback_data = ctx.update['callback_query']['data'];
                console.log(callback_data);
                if (callback_data == 'study') {
                    return [2 /*return*/, ctx.scene.enter('study')];
                }
                if (callback_data == 'dashboard') {
                    return [2 /*return*/, ctx.scene.enter('dashboard')];
                }
                if (callback_data == 'vocabular') {
                    return [2 /*return*/, ctx.scene.enter("vocabular")];
                }
                if (!(callback_data == 'moderation')) return [3 /*break*/, 2];
                return [4 /*yield*/, UserController_1["default"].moderation_privilege(ctx)];
            case 1:
                res = _a.sent();
                if (!res) {
                    return [2 /*return*/, ctx.answerCbQuery("\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \uD83D\uDD10")];
                }
                else {
                    ctx.answerCbQuery();
                    return [2 /*return*/, ctx.scene.enter('moderation')];
                }
                _a.label = 2;
            case 2:
                ctx.answerCbQuery("\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \uD83D\uDD10");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
// Обработка входящих
handler.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
exports["default"] = home;
