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
var mongodb_1 = require("mongodb");
var ICustomer_1 = require("../../Model/Common/ICustomer");
var IModeration_1 = require("../../Model/Moderation/IModeration");
var IBuryatTranslate_1 = require("../../Model/Translate/IBuryatTranslate");
var IRussianTranslates_1 = require("../../Model/Translate/IRussianTranslates");
var ITranslateModel_1 = require("../../Model/Translate/ITranslateModel");
var UserModel_1 = require("../../Model/User/UserModel");
var VocbularController = /** @class */ (function () {
    function VocbularController() {
    }
    VocbularController.insert_middleware = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var customer, buryat_translate, middleware, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        customer = new ICustomer_1.CustomerModel({
                            userID: ctx.from.id
                        });
                        buryat_translate = new IBuryatTranslate_1.BuryatTranslateModel({
                            name: ctx.update['message'].text.toLocaleLowerCase(),
                            customers: customer
                        });
                        middleware = new ITranslateModel_1["default"]({
                            buryat_translate: buryat_translate
                        });
                        // middleware.save()
                        return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                id: ctx.from.id
                            }, {
                                $set: {
                                    middleware: middleware
                                }
                            }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log(ctx.update['message'].text.toLocaleLowerCase() + ' записан в middleware.buryat_translate');
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        // middleware.save()
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VocbularController.insert_middleware_translate = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var customer_1, russian_translate_1, russian_translates_1, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        customer_1 = new ICustomer_1.CustomerModel({
                            userID: ctx.from.id
                        });
                        russian_translate_1 = new IRussianTranslates_1.russianTranslateModel({
                            name: ctx.update["message"].text,
                            customers: [customer_1]
                        });
                        russian_translates_1 = new IRussianTranslates_1.russianTranslatesModel({
                            translates: [russian_translate_1]
                        });
                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                id: ctx.from.id
                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var moderation;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            moderation = new IModeration_1["default"]({
                                                buryat_translate: user.middleware.buryat_translate,
                                                russian_translate: russian_translate_1,
                                                customer: customer_1
                                            });
                                            moderation.save().then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                                var obj_id;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            obj_id = res._id.toString();
                                                            return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                                                    id: ctx.from.id
                                                                }, {
                                                                    $addToSet: {
                                                                        'vocabular.on_moderation': obj_id
                                                                    }
                                                                })];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            if (!user.middleware.russian_translates) return [3 /*break*/, 3];
                                            if (!user.middleware.russian_translates.translates) return [3 /*break*/, 2];
                                            if (!user.middleware.russian_translates.translates.length) return [3 /*break*/, 2];
                                            return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                                    id: ctx.from.id
                                                }, {
                                                    $addToSet: {
                                                        'middleware.russian_translates.translates': russian_translate_1
                                                    }
                                                }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        return [2 /*return*/, 'updated'];
                                                    });
                                                }); })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2: return [3 /*break*/, 5];
                                        case 3: return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                                id: ctx.from.id
                                            }, {
                                                $set: {
                                                    'middleware.russian_translates': russian_translates_1
                                                }
                                            }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    return [2 /*return*/, 'setted'];
                                                });
                                            }); })];
                                        case 4: return [2 /*return*/, _a.sent()];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VocbularController.get_buryat_translate_from_middleware = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                id: ctx.from.id
                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, user.middleware.buryat_translate.name];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_3 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VocbularController.get_russian_translates_after_insert = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                id: ctx.from.id
                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, user.middleware.russian_translates.translates];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_4 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VocbularController.reset_middleware = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                id: ctx.from.id
                            }, {
                                $unset: {
                                    'middleware': '""'
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VocbularController.get_translates = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                id: ctx.from.id
                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!user.middleware) return [3 /*break*/, 2];
                                            return [4 /*yield*/, ITranslateModel_1["default"].findOne({
                                                    'buryat_translate.value': user.middleware.buryat_translate.name.toLowerCase()
                                                }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        return [2 /*return*/, response.russian_translates];
                                                    });
                                                }); })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_6 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VocbularController.check_on_exists_moderation = function (ctx) {
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
                                    if (user.vocabular) {
                                        if (user.vocabular.on_moderation) {
                                            if (user.vocabular.on_moderation.length) {
                                                return [2 /*return*/, false];
                                            }
                                            else {
                                                return [2 /*return*/, true];
                                            }
                                        }
                                        else {
                                            return [2 /*return*/, true];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, true];
                                    }
                                    return [2 /*return*/];
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
    VocbularController.get_words_on_moderation = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                id: ctx.from.id
                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, user.vocabular.on_moderation];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_8 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VocbularController.get_word_on_moderation = function (ctx, str) {
        return __awaiter(this, void 0, void 0, function () {
            var err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, IModeration_1["default"].findOne({
                                _id: new mongodb_1.ObjectId(str)
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_9 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VocbularController.get_words_for_page = function (ctx, posts_per_page, page) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel_1["default"].findOne({
                            id: ctx.from.id
                        }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var posts;
                            return __generator(this, function (_a) {
                                posts = user.vocabular.on_moderation.slice(page * posts_per_page, (posts_per_page * (page + 1)));
                                // console.log(posts.length)
                                return [2 /*return*/, posts];
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VocbularController.get_words_for_page_fixed = function (ctx, posts_per_page, page) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel_1["default"].findOne({
                            id: ctx.from.id
                        }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var posts;
                            return __generator(this, function (_a) {
                                // console.log('Начало: ' + page * posts_per_page, 'Конец: ' + (((page + 1) * posts_per_page)))
                                console.log('page: ' + page);
                                console.log('posts per page:' + posts_per_page);
                                posts = user.vocabular.on_moderation.slice(page * posts_per_page, (posts_per_page * (page + 1)));
                                console.log(posts);
                                return [2 /*return*/, posts];
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VocbularController.set_page = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1["default"].findOneAndUpdate({
                                id: ctx.from.id
                            }, {
                                $set: {
                                    'vocabular.page': parseInt(ctx.update["callback_query"].data.split(' ')[1])
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_10 = _a.sent();
                        // err
                        console.log(err_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VocbularController.get_page = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel_1["default"].findOne({
                            id: ctx.from.id
                        }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (user.vocabular) {
                                    if (user.vocabular.page) {
                                        return [2 /*return*/, user.vocabular.page];
                                    }
                                    else {
                                        return [2 /*return*/, false];
                                    }
                                }
                                else {
                                    return [2 /*return*/, false];
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    VocbularController.save_translate = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get_translates(ctx)
                            .then(function (arr) { return __awaiter(_this, void 0, void 0, function () {
                            var err_11, err_12;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!arr) return [3 /*break*/, 5];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        console.log('not found');
                                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                                id: ctx.from.id
                                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    console.log(user);
                                                    if (user.middleware) {
                                                        new ITranslateModel_1["default"](user.middleware).save();
                                                    }
                                                    return [2 /*return*/];
                                                });
                                            }); })];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_11 = _a.sent();
                                        console.log(err_11);
                                        return [3 /*break*/, 4];
                                    case 4: return [3 /*break*/, 9];
                                    case 5:
                                        console.log(arr);
                                        _a.label = 6;
                                    case 6:
                                        _a.trys.push([6, 8, , 9]);
                                        return [4 /*yield*/, UserModel_1["default"].findOne({
                                                id: ctx.from.id
                                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!user.middleware) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, ITranslateModel_1["default"].findOneAndUpdate({
                                                                    'word.value': user.middleware.buryat_translate.name.toLowerCase()
                                                                }, {
                                                                    $addToSet: {
                                                                        'translate': user.middleware.russian_translates.translates
                                                                    }
                                                                })];
                                                        case 1:
                                                            _a.sent();
                                                            _a.label = 2;
                                                        case 2: return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 7:
                                        _a.sent();
                                        return [3 /*break*/, 9];
                                    case 8:
                                        err_12 = _a.sent();
                                        console.log(err_12);
                                        return [3 /*break*/, 9];
                                    case 9: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return VocbularController;
}());
exports["default"] = VocbularController;
