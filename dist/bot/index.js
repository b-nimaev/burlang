"use strict";
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