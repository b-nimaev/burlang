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
var UserModel_1 = require("../../Model/User/UserModel");
// Vocabular
var VocabularMethods_1 = require("../../View/Vocabular/VocabularMethods");
var UserConrtoller = /** @class */ (function () {
    function UserConrtoller() {
    }
    UserConrtoller.get_user = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                id: ctx.from.id
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserConrtoller.save_user = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = {
                            id: ctx.from.id,
                            is_bot: ctx.from.is_bot,
                            first_name: ctx.from.first_name,
                            username: ctx.from.username,
                            male: 'later',
                            middleware: null,
                            settings: {
                                rules: false
                            },
                            access1: {
                                moderation: false
                            },
                            subscribe: false,
                            vocabular: {
                                on_moderation: [],
                                page: 0
                            }
                        };
                        return [4 /*yield*/, new UserModel_1["default"](user).save()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserConrtoller.save_selected_word = function (ctx, str) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                id: ctx.from.id
                            }, {
                                $set: {
                                    "selected_string": str
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserConrtoller.delete_selected_word = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.get_user(ctx)];
                    case 1:
                        user = _a.sent();
                        console.log(user.selected_string);
                        return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                id: ctx.from.id
                            }, {
                                $pull: {
                                    "vocabular.on_moderation": user.selected_string
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                id: ctx.from.id
                            }, {
                                $unset: {
                                    "selected_string": ""
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserConrtoller.check_gender = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOne({ id: ctx.from.id })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        err_5 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserConrtoller.update_gender = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                id: ctx.from.id
                            }, {
                                $set: {
                                    'male': ctx.update['callback_query'].data
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserConrtoller.get_settings = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                id: ctx.from.id
                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, user.settings];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_7 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserConrtoller.toggle_rules = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.get_settings(ctx).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!res.rules) return [3 /*break*/, 5];
                                            if (!!res.rules) return [3 /*break*/, 2];
                                            return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({ id: ctx.from.id }, { $set: { "settings.rules": true } })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({ id: ctx.from.id }, { $set: { "settings.rules": false } })];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [3 /*break*/, 7];
                                        case 5: return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({ id: ctx.from.id }, { $set: { "settings.rules": true } })];
                                        case 6:
                                            _a.sent();
                                            _a.label = 7;
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, VocabularMethods_1["default"].render_settings(ctx)];
                    case 2:
                        _a.sent();
                        ctx.answerCbQuery('');
                        return [3 /*break*/, 4];
                    case 3:
                        err_8 = _a.sent();
                        console.log(err_8);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserConrtoller.moderation_privilege = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_9;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                id: ctx.from.id
                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (user.access1.moderation) {
                                        return [2 /*return*/, true];
                                    }
                                    else {
                                        return [2 /*return*/, false];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_9 = _a.sent();
                        console.log(err_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserConrtoller;
}());
exports["default"] = UserConrtoller;
