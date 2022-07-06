"use strict";
exports.__esModule = true;
var telegraf_1 = require("telegraf");
var blitz_1 = require("./blitz");
var dashboard_1 = require("./dashboard");
var home_1 = require("./home");
var study_1 = require("./study");
var vocabular_1 = require("./vocabular");
var settings_1 = require("./vocabular/settings");
var TranslaterScene_1 = require("./Translater/TranslaterScene");
var fs = require('fs');
var key = fs.readFileSync('./ssl/localhost.decrypted.key');
var cert = fs.readFileSync('./ssl/localhost.crt');
var https = require('https');
var express = require("express");
require("dotenv").config();
var bot_token;
if (process.env.mode == "development") {
    bot_token = process.env.burlang_dev;
}
else {
    bot_token = process.env.BOT_TOKEN;
}
var bot = new telegraf_1.Telegraf(bot_token);
var app = express();
var port = 8443;
var scenes = [
    home_1["default"],
    vocabular_1["default"],
    dashboard_1["default"],
    study_1["default"],
    vocabular_1["default"],
    settings_1["default"],
    blitz_1["default"],
    TranslaterScene_1["default"]
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
// Backend
var secretPath = "/telegraf/".concat(bot.secretPathComponent());
// console.log(secretPath)
if (process.env.mode === "development") {
    bot.telegram.setWebhook("https://fe9a-81-23-175-121.eu.ngrok.io".concat(secretPath))
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