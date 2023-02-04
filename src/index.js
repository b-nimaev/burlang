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
exports.bot = exports.run = void 0;
/* eslint-disable @typescript-eslint/no-floating-promises */
var telegraf_1 = require("telegraf");
// Scenes
var HomeScene_1 = require("./View/Home/HomeScene");
var SudyScene_1 = require("./View/Study/SudyScene");
var AlphabetPartial_1 = require("./View/Study/Partials/Alphabet/AlphabetPartial");
var DashboardScene_1 = require("./View/Dashboard/DashboardScene");
var database_1 = require("./Controller/database");
var VocabularScene_1 = require("./View/Vocabular/VocabularScene");
var mongoose_1 = require("mongoose");
var ModerationScene_1 = require("./View/ModerationScene/ModerationScene");
var uri = process.env.db__localhost;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // 4. Connect to MongoDB
                return [4 /*yield*/, (0, mongoose_1.connect)(uri, { dbName: 'burlang' })];
                case 1:
                    // 4. Connect to MongoDB
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.run = run;
run();
// SSL
var fs = require('fs');
var key = fs.readFileSync('./ssl/localhost.decrypted.key');
var cert = fs.readFileSync('./ssl/localhost.crt');
var https = require('https');
var morgan = require("morgan");
var cors = require("cors");
var BodyParser = require("body-parser");
// Server
require("dotenv").config();
var express = require("express");
// Bot token check
var token = process.env.token;
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!');
}
// Init scenes & set secretPath for requires from bot
var scenes = [HomeScene_1["default"], DashboardScene_1["default"], VocabularScene_1["default"], SudyScene_1["default"], ModerationScene_1["default"], AlphabetPartial_1["default"]];
exports.bot = new telegraf_1.Telegraf(token);
exports["default"] = exports.bot;
var app = express();
var port = process.env.port;
var secretPath = "/telegraf/".concat(exports.bot.secretPathComponent());
var stage = new telegraf_1.Scenes.Stage(scenes, {
    "default": 'home'
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var fetch_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(process.env.mode === "development")) return [3 /*break*/, 1];
                fetch_1 = require('node-fetch');
                fetch_1('http://localhost:4040/api/tunnels')
                    .then(function (res) { return res.json(); })
                    .then(function (json) { return json.tunnels.find(function (tunnel) { return tunnel.proto === 'https'; }); })
                    .then(function (secureTunnel) { return exports.bot.telegram.setWebhook("".concat(secureTunnel.public_url).concat(secretPath)); })
                    .then(function (status) { return console.log('Webhook setted: ' + status); })["catch"](function (err) {
                    if (err.code === 'ECONNREFUSED') {
                        return console.error("Looks like you're not running ngrok.");
                    }
                    console.error(err);
                });
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, database_1.database.get_admins()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
                return [3 /*break*/, 4];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exports.bot.telegram.setWebhook("https://anoname.xyz".concat(secretPath)).then(function (status) {
                        console.log(status);
                    })["catch"](function (err) {
                        console.log(err);
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();
exports.bot.use((0, telegraf_1.session)());
exports.bot.use(function (ctx, next) {
    var now = new Date();
    return next();
});
exports.bot.command("register", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database_1.database.write_admin(ctx)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.bot.use(stage.middleware());
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));
app.use(morgan("dev"));
// @ts-ignore
app.get("/", function (req, res) { return res.send("Бот запущен!"); });
app.use(exports.bot.webhookCallback(secretPath));
app.listen(port);
// const server = https.createServer({ key, cert }, app);
// server.listen(port, () => console.log("telegram bot launched!"))
// Enable graceful stop
process.once('SIGINT', function () { return exports.bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return exports.bot.stop('SIGTERM'); });
