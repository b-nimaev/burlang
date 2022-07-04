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
exports.greeting = exports.getProposals = void 0;
var telegraf_1 = require("telegraf");
var mongodb_1 = require("mongodb");
var controller_1 = require("../controller");
require("dotenv").config();
var dbname = process.env.DB_NAME;
var uri = process.env.DB_CONN_STRING;
var client = new mongodb_1.MongoClient(uri);
function getProposals() {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname).collection("users").find().toArray()];
                case 2:
                    result = _a.sent();
                    if (result == null) {
                        return [2 /*return*/, 0];
                    }
                    else {
                        return [2 /*return*/, result];
                    }
                    return [3 /*break*/, 6];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getProposals = getProposals;
var extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [
                { text: "Самоучитель", callback_data: "study" },
                { text: "Словарь", callback_data: "vocabular" }
            ],
            [{ text: "Личный кабинет", callback_data: "dashboard" }]
        ]
    }
};
var __extra = {
    parse_mode: 'HTML',
    reply_markup: {
        inline_keyboard: [
            [
                { text: "Самоучитель", callback_data: "study" },
                { text: "Словарь", callback_data: "vocabular" }
            ],
            [{ text: "Личный кабинет", callback_data: "dashboard" }]
        ]
    }
};
var message = "\u0421\u0430\u043C\u043E\u0443\u0447\u0438\u0442\u0435\u043B\u044C \u0431\u0443\u0440\u044F\u0442\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430.\n\n \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u0439 \u0440\u0430\u0437\u0434\u0435\u043B, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0435 \uD83D\uDC47";
var handler = new telegraf_1.Composer();
var vocabular = new telegraf_1.Composer();
var study = new telegraf_1.Composer();
var home = new telegraf_1.Scenes.WizardScene("home", handler, vocabular, study);
function greeting(ctx) {
    if (ctx.message) {
        ctx.reply(message, extra);
    }
    else {
        ctx.editMessageText(message, __extra);
        // ctx.answerCbQuery();
    }
}
exports.greeting = greeting;
home.enter(function (ctx) { return greeting(ctx); });
handler.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, greeting(ctx)];
}); }); });
home.hears(/\/start/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        console.log(ctx.update);
        greeting(ctx);
        data = ctx.update["message"].from;
        data.date = ctx.update["message"].date;
        (0, controller_1.getstart)(ctx.update["message"].from);
        return [2 /*return*/];
    });
}); });
home.action("vocabular", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
        ctx.scene.enter("vocabular");
        return [2 /*return*/];
    });
}); });
home.action("study", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
        ctx.scene.enter("study");
        return [2 /*return*/];
    });
}); });
home.action("dashboard", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
        ctx.scene.enter("dashboard");
        return [2 /*return*/];
    });
}); });
home.command("vocabular", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("vocabular")];
}); }); });
home.command("study", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("study")];
}); }); });
home.command("dashboard", function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter("dashboard")];
}); }); });
home.action("study", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery();
        ctx.wizard.selectStep(3);
        ctx.editMessageText("Обучение", {
            parse_mode: 'HTML', reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Приступить',
                            callback_data: 'start'
                        }
                    ],
                    [
                        {
                            text: 'Назад',
                            callback_data: 'home'
                        }
                    ]
                ]
            }
        });
        return [2 /*return*/];
    });
}); });
exports["default"] = home;
