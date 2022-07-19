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
var BlitzScene_1 = require("./View/Blitz/BlitzScene");
var DashboardScene_1 = require("./View/Dashboard/DashboardScene");
var HomeScene_1 = require("./View/Home/HomeScene");
var SudyScene_1 = require("./View/Study/SudyScene");
var VocabularScene_1 = require("./View/Vocabular/VocabularScene");
var VocabularSettings_1 = require("./View/Vocabular/VocabularSettings");
var TranslaterScene_1 = require("./View/Translater/TranslaterScene");
var AlphabetPartial_1 = require("./View/Study/Partials/Alphabet/AlphabetPartial");
var SoundsAndLettersPartial_1 = require("./View/Study/Partials/SoundsAndLetters/SoundsAndLettersPartial");
var WordFormationPartial_1 = require("./View/Study/Partials/WordFormation/WordFormationPartial");
var PartsOfSpeechPartial_1 = require("./View/Study/Partials/PartsOfSpeech/PartsOfSpeechPartial");
var CasesPartial_1 = require("./View/Study/Partials/Cases/CasesPartial");
var VerbsPartial_1 = require("./View/Study/Partials/Verbs/VerbsPartial");
var SentencesPartial_1 = require("./View/Study/Partials/Sentences/SentencesPartial");
var NegationPartial_1 = require("./View/Study/Partials/Negation/NegationPartial");
var fs = require('fs');
var key = fs.readFileSync('./ssl/localhost.decrypted.key');
var cert = fs.readFileSync('./ssl/localhost.crt');
var https = require('https');
var express = require("express");
require("dotenv").config();
var scenes_ = process.env.scenes.split(",");
var partials = ["alphabet", "soundsAndLetters", "wordFormation", "partsOfSpeech", "cases", "verbs", "sentences", "negation", "home"];
scenes_ = scenes_.concat(partials);
var bot_token;
if (process.env.mode == "development") {
    bot_token = process.env.burlang_dev;
    console.log(bot_token);
}
else {
    bot_token = process.env.BOT_TOKEN;
}
var bot = new telegraf_1.Telegraf(bot_token);
var app = express();
var port = 8443;
var scenes = [
    HomeScene_1["default"],
    VocabularScene_1["default"],
    DashboardScene_1["default"],
    SudyScene_1["default"],
    VocabularScene_1["default"],
    VocabularSettings_1["default"],
    BlitzScene_1["default"],
    TranslaterScene_1["default"],
    AlphabetPartial_1["default"],
    SoundsAndLettersPartial_1["default"],
    WordFormationPartial_1["default"],
    PartsOfSpeechPartial_1["default"],
    CasesPartial_1["default"],
    VerbsPartial_1["default"],
    SentencesPartial_1["default"],
    NegationPartial_1["default"]
];
var stage = new telegraf_1.Scenes.Stage(scenes, {
    "default": 'home'
});
bot.use((0, telegraf_1.session)());
bot.use(stage.middleware());
bot.use(function (ctx, next) {
    var _a;
    // @ts-ignore
    ctx.myProp = (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.first_name;
    return next();
});
bot.start(function (ctx) { return ctx.scene.enter("home"); });
bot.command(scenes_, function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ctx.scene.enter(ctx.update["message"].text.replace('/', ''))];
}); }); });
bot.action("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.answerCbQuery("index");
        return [2 /*return*/];
    });
}); });
// Backend
var secretPath = "/telegraf/".concat(bot.secretPathComponent());
// console.log(secretPath)
if (process.env.mode === "development") {
    bot.telegram.setWebhook("".concat(process.env.ngrok).concat(secretPath))
        .then(function (status) { return console.log('Webhook setted: ' + status); });
}
else {
    bot.telegram.setWebhook("https://say-an.ru".concat(secretPath))
        .then(function (status) { return console.log('Webhook setted: ' + status); });
}
app.get("/", function (req, res) { return res.send("Hello!"); });
app.use(bot.webhookCallback(secretPath));
var server = https.createServer({ key: key, cert: cert }, app);
server.listen(port, function () { return console.log("telegram bot launched!"); });
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
//# sourceMappingURL=index.js.map