"use strict";
exports.__esModule = true;
var telegraf_1 = require("telegraf");
var home_1 = require("./bot/home/home");
var localtunnel = require("localtunnel");
var express = require("express");
require("dotenv").config();
var _a = telegraf_1.Scenes.Stage, enter = _a.enter, leave = _a.leave;
var bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
var app = express();
var stage = new telegraf_1.Scenes.Stage([home_1["default"]], {
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
console.log(secretPath);
if (process.env.mode === "development") {
    bot.telegram.setWebhook("https://say-an.ru".concat(secretPath))
        .then(function (status) { return console.log('Webhook setted: ' + status); });
}
else {
    bot.telegram.setWebhook("https://say-an.ru".concat(secretPath))
        .then(function (status) { return console.log('Webhook setted: ' + status); });
}
app.get("/", function (req, res) { return res.send("Hello!"); });
app.use(function () { bot.webhookCallback(secretPath), console.log("hi"); });
app.listen(5000, function () { return console.log("telegram bot launched!"); });
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
