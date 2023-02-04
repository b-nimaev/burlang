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
exports.database = void 0;
var mongoose_1 = require("mongoose");
var __1 = require("..");
var adminSchema = new mongoose_1.Schema({
    id: { unique: true, type: Number, dropDups: true, required: true },
    first_name: String,
    last_name: String || null,
    username: String || null
});
var AdminModel = (0, mongoose_1.model)('admins', adminSchema);
var database = /** @class */ (function () {
    function database() {
    }
    database.write_admin = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('123');
                        return [4 /*yield*/, new AdminModel(ctx.from).save()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    database.get_admins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, AdminModel.find().then(function (users) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    users.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                        var extra, message;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    extra = {
                                                        parse_mode: 'HTML',
                                                        reply_markup: {
                                                            inline_keyboard: [
                                                                [
                                                                    { text: "Самоучитель", callback_data: "study" },
                                                                    { text: "Словарь", callback_data: "vocabular" }
                                                                ],
                                                                [{ text: 'Переводчик', callback_data: 'translater' }],
                                                                [{ text: "Личный кабинет", callback_data: "dashboard" }]
                                                            ]
                                                        }
                                                    };
                                                    message = "\u0421\u0430\u043C\u043E\u0443\u0447\u0438\u0442\u0435\u043B\u044C \u0431\u0443\u0440\u044F\u0442\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430 \n\n\u041A\u0430\u0436\u0434\u043E\u0435 \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u0431\u043E\u0442\u043E\u043C, \n\u0432\u043B\u0438\u044F\u0435\u0442 \u043D\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0438 \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0435 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u0435 <b>\u0411\u0443\u0440\u044F\u0442\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430</b> \n\n\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u0434\u0435\u043B, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u0441\u0442\u0443\u043F\u0438\u0442\u044C";
                                                    return [4 /*yield*/, __1["default"].telegram.sendMessage(user.id, message, extra)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return database;
}());
exports.database = database;
