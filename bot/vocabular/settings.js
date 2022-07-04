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
var message = "Настройки \n<code>Подтверждение правильности ввода: ВКЛ \nБесконечное добавление слов: ВЫКЛ</code> \n";
var extra = {
    parse_mode: 'HTML', reply_markup: {
        inline_keyboard: [
            [
                {
                    text: 'Подтверждение правильности ввода',
                    callback_data: 'confirm'
                },
            ],
            [
                {
                    text: 'Бесконечное добавление слов',
                    callback_data: 'infinity_adding'
                },
            ],
            [
                {
                    text: 'Назад',
                    callback_data: 'back'
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
var vocabularSettings = new telegraf_1.Scenes.WizardScene("vocabular-settings", handler);
handler.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
handler.on("callback_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Обработка настроек
        if (ctx.update["callback_query"]) {
            if (ctx.update["callback_query"].data !== null) {
                if (ctx.update["callback_query"].data == 'confirm') {
                    ctx.answerCbQuery('Подтверждение правильности ввода: ВЫКЛ');
                }
                if (ctx.update["callback_query"].data == 'infinity_adding') {
                    ctx.answerCbQuery('Бесконечное добавление слов: ВКЛ');
                }
                if (ctx.update["callback_query"].data == 'back') {
                    ctx.answerCbQuery();
                    ctx.scene.enter("vocabular");
                }
            }
        }
        return [2 /*return*/];
    });
}); });
vocabularSettings.command("dashboard", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("dashboard")];
}); }); });
vocabularSettings.command("study", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("study")];
}); }); });
vocabularSettings.command("home", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("home")];
}); }); });
vocabularSettings.command("vocabular", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("vocabular")];
}); }); });
vocabularSettings.enter(function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
exports["default"] = vocabularSettings;
