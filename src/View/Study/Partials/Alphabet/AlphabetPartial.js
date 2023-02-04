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
var telegraf_1 = require("telegraf");
var partials = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"];
var message = "<b>Алфавит</b> \nhttps://telegra.ph/Alfavit-07-08";
var extraGreeting = {
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
};
function greeting(ctx) {
    if (ctx.update["message"]) {
        // @ts-ignore
        ctx.reply(message, extraGreeting);
    }
    else {
        // @ts-ignore
        ctx.editMessageText(message, extraGreeting);
    }
}
function first_scene(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (ctx.updateType == 'callback_query') {
                console.log(ctx.update['callback_query'].data);
            }
            else if (ctx.updateType == 'message') {
                console.log(ctx.update['message'].text);
            }
            return [2 /*return*/];
        });
    });
}
var handler = new telegraf_1.Composer();
var alphabet = new telegraf_1.Scenes.WizardScene("alphabet", handler, (function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, first_scene(ctx)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); }));
handler.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
alphabet.enter(function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
function later(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}
alphabet.action("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.answerCbQuery();
                ctx.wizard.selectStep(1);
                console.log(ctx.from.id);
                return [4 /*yield*/, later(300)];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.telegram.sendChatAction(ctx.from.id, 'typing')];
            case 2:
                _a.sent();
                return [4 /*yield*/, ctx.editMessageText('Какой-то текст призывающий запомнить следующий материал')];
            case 3:
                _a.sent();
                return [4 /*yield*/, ctx.telegram.sendChatAction(ctx.from.id, 'typing')];
            case 4:
                _a.sent();
                return [4 /*yield*/, later(1000)];
            case 5:
                _a.sent();
                return [4 /*yield*/, ctx.reply('Буквы <b>в, к, ф, ц, ч, ш, щ, ъ</b>, используются только в русских именах и заимствованиях', { parse_mode: 'HTML' })];
            case 6:
                _a.sent();
                return [4 /*yield*/, ctx.telegram.sendChatAction(ctx.from.id, 'typing')];
            case 7:
                _a.sent();
                return [4 /*yield*/, later(300)];
            case 8:
                _a.sent();
                return [4 /*yield*/, ctx.reply('б=[p], г=[k], ж=[ʃ], а з=[s]')];
            case 9:
                _a.sent();
                return [4 /*yield*/, ctx.telegram.sendChatAction(ctx.from.id, 'typing')];
            case 10:
                _a.sent();
                return [4 /*yield*/, later(300)];
            case 11:
                _a.sent();
                return [4 /*yield*/, ctx.reply('полугласная - й')];
            case 12:
                _a.sent();
                return [4 /*yield*/, ctx.telegram.sendChatAction(ctx.from.id, 'typing')];
            case 13:
                _a.sent();
                return [4 /*yield*/, later(300)];
            case 14:
                _a.sent();
                return [4 /*yield*/, ctx.reply('буква һ является согласной')];
            case 15:
                _a.sent();
                return [4 /*yield*/, ctx.telegram.sendChatAction(ctx.from.id, 'typing')];
            case 16:
                _a.sent();
                return [4 /*yield*/, later(300)];
            case 17:
                _a.sent();
                return [4 /*yield*/, ctx.reply('н=[ŋ] перед г и x, а также в конце слов')];
            case 18:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
alphabet.action("back", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.scene.enter('study');
        ctx.answerCbQuery();
        return [2 /*return*/];
    });
}); });
exports["default"] = alphabet;
