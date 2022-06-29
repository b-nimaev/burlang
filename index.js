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
if (process.env.mode === "development") {
    // @ts-ignore
    localtunnel({ port: 3000 }).then(function (result) {
        bot.telegram.setWebhook("".concat(result.url).concat(secretPath));
        // bot.telegram.deleteWebhook();
    });
}
else {
    console.log("".concat(process.env.ip).concat(secretPath));
    bot.telegram.setWebhook("https://say-an.ru/".concat(secretPath));
}
app.get("/", function (req, res) { return res.send("Hello!"); });
app.use(bot.webhookCallback(secretPath));
app.listen(3000, function () { return console.log("telegram bot launched!"); });
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
