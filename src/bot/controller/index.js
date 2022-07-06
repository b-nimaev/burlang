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
exports.get_feedback_props = exports.write_feedback_prop = exports.get_feedback_managers = exports.register_feedback_manager = exports.feedback_manager_register = exports.getstart = exports.setTranslate = exports.setWord = exports.getTranslatedVocabular = void 0;
var mongodb_1 = require("mongodb");
require("dotenv").config();
var dbname = process.env.DB_NAME;
var uri = process.env.DB_CONN_STRING;
var client = new mongodb_1.MongoClient(uri);
var getTranslatedVocabular = function () {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname)
                            .collection("vocabular")
                            .find()
                            .toArray()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getTranslatedVocabular = getTranslatedVocabular;
var setWord = function (update) {
    return __awaiter(this, void 0, void 0, function () {
        var word, err_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    word = update["message"].text.toLowerCase();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname)
                            .collection("vocabular")
                            .findOne({ name: word })
                            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            var data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!result) return [3 /*break*/, 4];
                                        if (!result.translte) return [3 /*break*/, 1];
                                        data = {
                                            status: 'exists',
                                            words: result.translate
                                        };
                                        return [2 /*return*/, data];
                                    case 1: return [4 /*yield*/, client.db(dbname)
                                            .collection("vocabular")
                                            .insertOne({ name: word })
                                            .then(function (doc) {
                                            return 'added';
                                        })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                    case 3: return [3 /*break*/, 6];
                                    case 4: return [4 /*yield*/, client.db(dbname)
                                            .collection("vocabular")
                                            .insertOne({ name: word })
                                            .then(function (doc) {
                                            return 'added';
                                        })];
                                    case 5: return [2 /*return*/, _a.sent()];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.setWord = setWord;
var setTranslate = function (update, translate) {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname)
                            .collection("vocabular")
                            .updateOne({
                            name: translate
                        }, {
                            $push: {
                                translate: update.text
                            }
                        }, {
                            upsert: true
                        })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, err_3];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.setTranslate = setTranslate;
var getstart = function (update) {
    return __awaiter(this, void 0, void 0, function () {
        var err_4;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname)
                            .collection("users")
                            .findOne({ id: update.id })
                            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!result) return [3 /*break*/, 2];
                                        return [4 /*yield*/, client.db(dbname)
                                                .collection("users")
                                                .updateOne({
                                                id: update.id
                                            }, {
                                                $set: {
                                                    date: update.date
                                                }
                                            })
                                                .then(function (data) {
                                                console.log(data);
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, client.db(dbname)
                                            .collection("users")
                                            .insertOne(update)
                                            .then(function (result) { return console.log(result); })];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    console.log(err_4);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.getstart = getstart;
var feedback_manager_register = function (update) {
    return __awaiter(this, void 0, void 0, function () {
        var err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname)
                            .collection("users")
                            .findOne({ id: update.id })
                            .then(function (user) {
                            if (user.role) {
                                if (user.role.indexOf("feedback_manager") !== -1) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return false;
                            }
                        })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_5 = _a.sent();
                    console.log(err_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.feedback_manager_register = feedback_manager_register;
var register_feedback_manager = function (update) {
    return __awaiter(this, void 0, void 0, function () {
        var err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname)
                            .collection("users")
                            .updateOne({
                            id: update.id
                        }, {
                            $set: {
                                role: ["feedback_manager"]
                            }
                        }, {
                            upsert: true
                        })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_6 = _a.sent();
                    return [2 /*return*/, err_6];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.register_feedback_manager = register_feedback_manager;
var get_feedback_managers = function () {
    return __awaiter(this, void 0, void 0, function () {
        var res, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname)
                            .collection("users")
                            .find({
                            role: 'feedback_manager'
                        })
                            .toArray()];
                case 2:
                    res = _a.sent();
                    console.log(res);
                    return [2 /*return*/, res];
                case 3:
                    err_7 = _a.sent();
                    return [2 /*return*/, err_7];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.get_feedback_managers = get_feedback_managers;
var write_feedback_prop = function (update) {
    return __awaiter(this, void 0, void 0, function () {
        var res, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname)
                            .collection("feedback")
                            .insertOne(update)];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
                case 3:
                    err_8 = _a.sent();
                    return [2 /*return*/, err_8];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.write_feedback_prop = write_feedback_prop;
var get_feedback_props = function () {
    return __awaiter(this, void 0, void 0, function () {
        var res, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db(dbname)
                            .collection("feedback")
                            .find()
                            .toArray()];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res];
                case 3:
                    err_9 = _a.sent();
                    return [2 /*return*/, err_9];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.get_feedback_props = get_feedback_props;