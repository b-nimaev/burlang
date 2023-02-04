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
var telegraf_1 = require("telegraf");
var UserController_1 = require("../../Controller/User/UserController");
var VocabularController_1 = require("../../Controller/Vocabular/VocabularController");
var IModeration_1 = require("../../Model/Moderation/IModeration");
var mongodb_1 = require("mongodb");
var vocabular_scene = /** @class */ (function () {
    function vocabular_scene() {
    }
    vocabular_scene.greeting = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var message, extra;
            return __generator(this, function (_a) {
                message = "\u0421\u043B\u043E\u0432\u0430\u0440\u044C \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0441\u043E\u0431\u043E\u0439 \u043D\u0430\u0431\u043E\u0440 \u0441\u043B\u043E\u0432 \u0438 \u0438\u0445 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0439. \n\n<b>\u042D\u0442\u043E \u0432\u0430\u0436\u043D\u044B\u0439 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u043B\u044E\u0434\u0435\u0439</b>, ";
                message += "\u0438\u0437\u0443\u0447\u0430\u044E\u0449\u0438\u0445 \u043D\u043E\u0432\u044B\u0439 \u044F\u0437\u044B\u043A \u0438\u043B\u0438 \u0438\u0449\u0443\u0449\u0438\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435\u0437\u043D\u0430\u043A\u043E\u043C\u043E\u0433\u043E \u0441\u043B\u043E\u0432\u0430. \n";
                extra = {
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Добавить перевод',
                                    callback_data: 'add'
                                }
                            ],
                            [
                                {
                                    text: 'Слова на модерации',
                                    callback_data: 'moderation'
                                }
                            ],
                            [
                                {
                                    text: 'Назад',
                                    callback_data: 'home'
                                },
                                {
                                    text: 'Настройки',
                                    callback_data: 'settings'
                                },
                            ],
                        ]
                    }
                };
                try {
                    if (ctx.updateType == 'callback_query') {
                        ctx.editMessageText(message, extra);
                        ctx.answerCbQuery();
                        ctx.wizard.selectStep(0);
                    }
                    else if (ctx.updateType == 'message') {
                        ctx.reply(message, extra);
                    }
                }
                catch (err) {
                    console.log(err);
                }
                return [2 /*return*/];
            });
        });
    };
    vocabular_scene.moderation = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var words, message, pages_per_row, posts_per_page, activePage, words_on_page, i, word, extra, row, i, arrows, temp, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 19, , 20]);
                        return [4 /*yield*/, VocabularController_1["default"].check_on_exists_moderation(ctx)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 2];
                        if (ctx.scene.session.cursor) {
                            ctx.scene.enter('vocabular');
                        }
                        return [2 /*return*/, ctx.answerCbQuery('У вас нет слов на модерации')];
                    case 2: return [4 /*yield*/, VocabularController_1["default"].get_words_on_moderation(ctx)];
                    case 3:
                        words = _a.sent();
                        message = 'Слова на проверке \n';
                        pages_per_row = 4;
                        posts_per_page = 5;
                        return [4 /*yield*/, VocabularController_1["default"].get_page(ctx)];
                    case 4:
                        activePage = _a.sent();
                        words_on_page = void 0;
                        if (!activePage) return [3 /*break*/, 6];
                        message += "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ".concat(activePage, "/").concat(Math.ceil(words.length / posts_per_page), " \n");
                        activePage--;
                        return [4 /*yield*/, VocabularController_1["default"].get_words_for_page_fixed(ctx, posts_per_page, activePage)];
                    case 5:
                        words_on_page = _a.sent();
                        console.log(words_on_page);
                        return [3 /*break*/, 8];
                    case 6:
                        message += "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 1/".concat(Math.ceil(words.length / posts_per_page), " \n");
                        return [4 /*yield*/, VocabularController_1["default"].get_words_for_page(ctx, posts_per_page, 0)];
                    case 7:
                        words_on_page = _a.sent();
                        _a.label = 8;
                    case 8:
                        message += "<b>\u041D\u0430\u0439\u0434\u0435\u043D\u043E: ".concat(words.length, "</b> \n\n");
                        i = 0;
                        _a.label = 9;
                    case 9:
                        if (!(words_on_page.length > i)) return [3 /*break*/, 12];
                        return [4 /*yield*/, VocabularController_1["default"].get_word_on_moderation(ctx, words_on_page[i])];
                    case 10:
                        word = _a.sent();
                        if (activePage) {
                            message += "".concat(((activePage) * posts_per_page) + 1 + i, ") ").concat(word.russian_translate.name, " \u2014 ").concat(word.buryat_translate.name, "\n");
                        }
                        _a.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 9];
                    case 12:
                        extra = {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: []
                            }
                        };
                        row = [];
                        for (i = 0; i < Math.ceil(words.length / posts_per_page); i++) {
                            if (i % pages_per_row == 0 && Math.ceil(words.length / posts_per_page) > 1) {
                                row = [];
                                extra.reply_markup.inline_keyboard.push(row);
                                // extra.reply_markup.inline_keyboard.push(row)
                            }
                            if (activePage == i - 1) {
                                row.push({
                                    text: "".concat(i + 1),
                                    callback_data: "page active"
                                });
                            }
                            else {
                                row.push({
                                    text: "".concat(i + 1),
                                    callback_data: "page ".concat(i + 1)
                                });
                            }
                        }
                        console.log(row);
                        arrows = [];
                        arrows.push({
                            text: 'Предыдущая страница',
                            callback_data: 'prev'
                        });
                        arrows.push({
                            text: 'Следующая страница',
                            callback_data: 'next'
                        });
                        // extra.reply_markup.inline_keyboard.push(arrows)
                        extra.reply_markup.inline_keyboard.push([{
                                // text: '« назад',
                                text: 'Назад',
                                callback_data: 'back'
                            }]);
                        return [4 /*yield*/, VocabularController_1["default"].get_word_on_moderation(ctx, words_on_page[2])];
                    case 13:
                        temp = _a.sent();
                        message += "\n\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 <b>\u043D\u043E\u043C\u0435\u0440</b> \u0441\u0442\u0440\u043E\u043A\u0438, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0435\u0433\u043E";
                        if (!(ctx.updateType == 'callback_query')) return [3 /*break*/, 15];
                        return [4 /*yield*/, ctx.editMessageText(message, extra)];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 17];
                    case 15:
                        if (!(ctx.updateType == 'message')) return [3 /*break*/, 17];
                        return [4 /*yield*/, ctx.reply(message, extra)];
                    case 16:
                        _a.sent();
                        _a.label = 17;
                    case 17:
                        ctx.answerCbQuery();
                        ctx.wizard.selectStep(4);
                        _a.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        err_1 = _a.sent();
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    vocabular_scene.moderation_handler = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var page, posts_per_page, words_on_page, words, message, activePage, extra, row, pages_per_row, i, i, word, index, all_words, words, str, translate, message, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 29, , 30]);
                        if (!(ctx.updateType == 'callback_query')) return [3 /*break*/, 13];
                        // если нажатая кнопка является элементом пагинации
                        if (ctx.update["callback_query"].data.indexOf('active') !== -1) {
                            return [2 /*return*/, ctx.answerCbQuery('Вы на этой странице')];
                        }
                        if (!(ctx.update["callback_query"].data.indexOf('page') == 0)) return [3 /*break*/, 10];
                        console.log(ctx.update["callback_query"].data);
                        return [4 /*yield*/, VocabularController_1["default"].set_page(ctx)];
                    case 1:
                        _a.sent();
                        page = parseInt(ctx.update["callback_query"].data.split(' ')[1]);
                        posts_per_page = 5;
                        return [4 /*yield*/, VocabularController_1["default"].get_words_for_page(ctx, posts_per_page, page - 1)];
                    case 2:
                        words_on_page = _a.sent();
                        return [4 /*yield*/, VocabularController_1["default"].get_words_on_moderation(ctx)];
                    case 3:
                        words = _a.sent();
                        message = 'Слова на проверке \n';
                        return [4 /*yield*/, VocabularController_1["default"].get_page(ctx)];
                    case 4:
                        activePage = _a.sent();
                        if (activePage) {
                            message += "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ".concat(activePage, "/").concat(Math.ceil(words.length / posts_per_page), " \n");
                        }
                        else {
                            message += "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ".concat(page * posts_per_page, " - ").concat(page * posts_per_page + posts_per_page, "/").concat(Math.ceil(words.length / posts_per_page), " \n");
                        }
                        message += "<b>\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u043E: ".concat(posts_per_page * page + 1 - posts_per_page, "-").concat(((posts_per_page) * page) - (posts_per_page - words_on_page.length), "/").concat(words.length, "</b>");
                        extra = {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: []
                            }
                        };
                        row = [];
                        pages_per_row = 4;
                        for (i = 0; i < Math.ceil(words.length / posts_per_page); i++) {
                            if (i % pages_per_row == 0) {
                                row = [];
                                extra.reply_markup.inline_keyboard.push(row);
                                // extra.reply_markup.inline_keyboard.push(row)
                            }
                            if (page) {
                                if (page - 1 == i) {
                                    row.push({
                                        text: "".concat(page),
                                        callback_data: "page active"
                                    });
                                }
                                else {
                                    row.push({
                                        text: "".concat(i + 1),
                                        callback_data: "page ".concat(i + 1)
                                    });
                                }
                            }
                            else {
                                row.push({
                                    text: "".concat(i + 1),
                                    callback_data: "page ".concat(i + 1)
                                });
                            }
                        }
                        message += '\n\n';
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < words_on_page.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, VocabularController_1["default"].get_word_on_moderation(ctx, words_on_page[i])];
                    case 6:
                        word = _a.sent();
                        message += "".concat(((posts_per_page * page) - posts_per_page) + i + 1, ") ").concat(word.buryat_translate.name, " \u2014 ").concat(word.russian_translate.name, " \n");
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 5];
                    case 8:
                        extra.reply_markup.inline_keyboard.push([{
                                text: '« назад',
                                callback_data: 'back'
                            }]);
                        message += "\n\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 <b>\u043D\u043E\u043C\u0435\u0440</b> \u0441\u0442\u0440\u043E\u043A\u0438, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0435\u0433\u043E";
                        return [4 /*yield*/, ctx.editMessageText(message, extra)];
                    case 9:
                        _a.sent();
                        ctx.answerCbQuery();
                        _a.label = 10;
                    case 10:
                        if (!(ctx.update["callback_query"].data == 'back')) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.greeting(ctx)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        ctx.answerCbQuery();
                        _a.label = 13;
                    case 13:
                        if (!(ctx.updateType == 'message')) return [3 /*break*/, 28];
                        index = parseFloat(ctx.update["message"].text);
                        return [4 /*yield*/, VocabularController_1["default"].get_words_on_moderation(ctx)];
                    case 14:
                        all_words = _a.sent();
                        if (!(index < 1)) return [3 /*break*/, 17];
                        return [4 /*yield*/, ctx.reply('Вы ввели недопустимое значение!')];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, this.moderation(ctx)];
                    case 16: return [2 /*return*/, _a.sent()];
                    case 17:
                        if (!(index > all_words.length)) return [3 /*break*/, 20];
                        return [4 /*yield*/, ctx.reply('Вы ввели значение превышающее количества ваших слов находящихся на проверке')];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, this.moderation(ctx)];
                    case 19: return [2 /*return*/, _a.sent()];
                    case 20:
                        if (!isNaN(index)) return [3 /*break*/, 23];
                        return [4 /*yield*/, ctx.reply("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0447\u0438\u0441\u043B\u043E\u0432\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u0445 <b>\u043E\u0442 1 \u0434\u043E ".concat(all_words.length, "</b>"), { parse_mode: 'HTML' })];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, this.moderation(ctx)];
                    case 22: return [2 /*return*/, _a.sent()];
                    case 23: return [4 /*yield*/, this.get_words_on_page(ctx)];
                    case 24:
                        words = _a.sent();
                        str = words[index - 1];
                        return [4 /*yield*/, VocabularController_1["default"].get_word_on_moderation(ctx, str)];
                    case 25:
                        translate = _a.sent();
                        return [4 /*yield*/, UserController_1["default"].save_selected_word(ctx, str)];
                    case 26:
                        _a.sent();
                        message = '';
                        // @ts-ignore
                        message += "".concat(translate.buryat_translate.name, " \u2014 ").concat(translate.russian_translate.name);
                        message += "\n<code>\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F: ".concat(translate.createdAt, "</code>");
                        return [4 /*yield*/, ctx.reply(message, {
                                parse_mode: 'HTML', reply_markup: {
                                    inline_keyboard: [
                                        [
                                            {
                                                text: 'Удалить',
                                                callback_data: 'delete'
                                            }
                                        ],
                                        [
                                            {
                                                text: 'Назад',
                                                callback_data: 'back'
                                            }
                                        ]
                                    ]
                                }
                            })];
                    case 27:
                        _a.sent();
                        ctx.wizard.selectStep(5);
                        _a.label = 28;
                    case 28: return [3 /*break*/, 30];
                    case 29:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3 /*break*/, 30];
                    case 30: return [2 /*return*/];
                }
            });
        });
    };
    vocabular_scene.get_words_on_page = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var activePage, words_on_page, words;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, VocabularController_1["default"].get_page(ctx)];
                    case 1:
                        activePage = _a.sent();
                        return [4 /*yield*/, VocabularController_1["default"].get_words_on_moderation(ctx)
                            // let pages_per_row = 4
                            // let posts_per_page = 5
                            // if (activePage) {
                            //     words_on_page = await VocbularController.get_words_for_page(ctx, posts_per_page, activePage)
                            // } else {
                            //     words_on_page = await VocbularController.get_words_for_page(ctx, posts_per_page, 0)
                            // }
                        ];
                    case 2:
                        words = _a.sent();
                        // let pages_per_row = 4
                        // let posts_per_page = 5
                        // if (activePage) {
                        //     words_on_page = await VocbularController.get_words_for_page(ctx, posts_per_page, activePage)
                        // } else {
                        //     words_on_page = await VocbularController.get_words_for_page(ctx, posts_per_page, 0)
                        // }
                        console.log('words ' + words);
                        return [2 /*return*/, words];
                }
            });
        });
    };
    vocabular_scene.word_handler = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(ctx.updateType == 'callback_query')) return [3 /*break*/, 5];
                        if (!(ctx.update['callback_query'].data == 'back')) return [3 /*break*/, 2];
                        ctx.wizard.selectStep(4);
                        return [4 /*yield*/, this.moderation(ctx)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(ctx.update["callback_query"].data == 'delete')) return [3 /*break*/, 5];
                        return [4 /*yield*/, UserController_1["default"].delete_selected_word(ctx)];
                    case 3:
                        _a.sent();
                        ctx.answerCbQuery('Запись удалена из базы данных');
                        return [4 /*yield*/, this.moderation(ctx)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    vocabular_scene.remove_moderation = function (ctx, str) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, IModeration_1["default"].findByIdAndDelete({
                                _id: new mongodb_1.ObjectId(str)
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    vocabular_scene.rules = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var rules, extra, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        if (!(ctx.updateType == 'callback_query')) return [3 /*break*/, 8];
                        rules = "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \n\n";
                        extra = {
                            parse_mode: 'HTML'
                        };
                        if (!(ctx.update['callback_query'].data == 'rules')) return [3 /*break*/, 3];
                        return [4 /*yield*/, ctx.editMessageText(rules, extra)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, ctx.reply('Ознакомились с правилами?', telegraf_1.Markup.keyboard([['Да, всё понятно']]).resize().oneTime())];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, ctx.answerCbQuery()];
                    case 3:
                        if (!(ctx.update["callback_query"].data == 'back')) return [3 /*break*/, 5];
                        return [4 /*yield*/, vocabular_scene.greeting(ctx)];
                    case 4:
                        _a.sent();
                        ctx.wizard.selectStep(0);
                        return [2 /*return*/, ctx.answerCbQuery()];
                    case 5:
                        if (!(ctx.update["callback_query"].data == 'start__')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.render_add_words(ctx)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, ctx.answerCbQuery('Данной команды не найдено')];
                    case 8:
                        if (!(ctx.updateType == 'message')) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.add_word(ctx)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    vocabular_scene.render_add_words = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        telegraf_1.Markup.removeKeyboard();
                        return [4 /*yield*/, VocabularController_1["default"].reset_middleware(ctx)];
                    case 1:
                        _a.sent();
                        if (!(ctx.updateType == 'callback_query')) return [3 /*break*/, 3];
                        ctx.answerCbQuery();
                        return [4 /*yield*/, ctx.editMessageText('Отправьте слово или фразу на <b>бурятском языке</b>', { parse_mode: 'HTML' })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(ctx.updateType == 'message')) return [3 /*break*/, 5];
                        return [4 /*yield*/, ctx.reply('Отравьте слово')];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        ctx.wizard.selectStep(2);
                        return [3 /*break*/, 7];
                    case 6:
                        err_6 = _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    vocabular_scene.getting_tranlsates = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var word_1, extra_1, err_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(ctx.updateType == 'message')) return [3 /*break*/, 3];
                        word_1 = ctx.update['message'].text;
                        extra_1 = {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: '« назад',
                                            callback_data: 'back'
                                        }
                                    ]
                                ]
                            }
                        };
                        // console.log(word)
                        return [4 /*yield*/, VocabularController_1["default"].insert_middleware(ctx)];
                    case 1:
                        // console.log(word)
                        _a.sent();
                        return [4 /*yield*/, VocabularController_1["default"].get_translates(ctx).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var str_1;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!result) return [3 /*break*/, 8];
                                            if (!result.translates.length) return [3 /*break*/, 4];
                                            return [4 /*yield*/, ctx.reply("<b>".concat(word_1, "</b> \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445"), extra_1)];
                                        case 1:
                                            _a.sent();
                                            str_1 = "";
                                            result.translates.forEach(function (element, index) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    if (index == result.translates.length - 1) {
                                                        str_1 = str_1 + element.name;
                                                        return [2 /*return*/];
                                                    }
                                                    str_1 = str_1 + element.name + ', ';
                                                    return [2 /*return*/];
                                                });
                                            }); });
                                            return [4 /*yield*/, ctx.reply(str_1, { parse_mode: 'HTML' })];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, ctx.reply("<b>\u041C\u043E\u0436\u0435\u0442\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u043A \u0432\u0435\u0434\u0435\u043D\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0443:</b> ".concat(word_1), extra_1)];
                                        case 3:
                                            _a.sent();
                                            return [3 /*break*/, 7];
                                        case 4: return [4 /*yield*/, ctx.reply("<b>".concat(word_1, "</b> \u0437\u0430\u043F\u0438\u0441\u0430\u043D \u0432 \u0431\u0430\u0437\u0443 \u0434\u0430\u043D\u043D\u044B\u0445"), { parse_mode: 'HTML' })];
                                        case 5:
                                            _a.sent();
                                            return [4 /*yield*/, ctx.reply("<b>\u0422\u0435\u043F\u0435\u0440\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u043A \u0432\u0435\u0434\u0435\u043D\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0443:</b> ".concat(word_1), { parse_mode: 'HTML' })];
                                        case 6:
                                            _a.sent();
                                            _a.label = 7;
                                        case 7: return [3 /*break*/, 11];
                                        case 8: return [4 /*yield*/, ctx.reply("<b>".concat(word_1, "</b> \u0437\u0430\u043F\u0438\u0441\u0430\u043D \u0432 \u0431\u0430\u0437\u0443 \u0434\u0430\u043D\u043D\u044B\u0445"), { parse_mode: 'HTML' })];
                                        case 9:
                                            _a.sent();
                                            return [4 /*yield*/, ctx.reply("<b>\u0422\u0435\u043F\u0435\u0440\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u043A \u0432\u0435\u0434\u0435\u043D\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0443:</b> ".concat(word_1), { parse_mode: 'HTML' })];
                                        case 10:
                                            _a.sent();
                                            _a.label = 11;
                                        case 11: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        ctx.wizard.next();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_7 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    vocabular_scene.set_translates = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var translates_1, russian_translates_concat_1, message, buryat_translate, russian_translates, i, extra, data, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 15, , 16]);
                        if (!(ctx.updateType == 'message')) return [3 /*break*/, 6];
                        // сохраняем в промежуточный обработчик слово
                        return [4 /*yield*/, VocabularController_1["default"].insert_middleware_translate(ctx)];
                    case 1:
                        // сохраняем в промежуточный обработчик слово
                        _a.sent();
                        return [4 /*yield*/, VocabularController_1["default"].get_russian_translates_after_insert(ctx)];
                    case 2:
                        translates_1 = _a.sent();
                        russian_translates_concat_1 = "";
                        translates_1.forEach(function (russian_translate, index) {
                            console.log(russian_translate.name);
                            if (index == 0) {
                                russian_translates_concat_1 = russian_translate.name;
                            }
                            else if (translates_1.length == index) {
                                russian_translates_concat_1 = russian_translates_concat_1 + ' ' + russian_translate.name;
                            }
                            else {
                                russian_translates_concat_1 = russian_translates_concat_1 + ', ' + russian_translate.name;
                            }
                        });
                        message = "\u0421\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0445 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432 \n";
                        return [4 /*yield*/, VocabularController_1["default"].get_buryat_translate_from_middleware(ctx)];
                    case 3:
                        buryat_translate = _a.sent();
                        return [4 /*yield*/, VocabularController_1["default"].get_russian_translates_after_insert(ctx)];
                    case 4:
                        russian_translates = _a.sent();
                        for (i = 0; i < russian_translates.length; i++) {
                            message += "".concat(i + 1, ") ").concat(buryat_translate.toLowerCase(), " \u2014 ").concat(russian_translates[i].name.toLowerCase(), " \n");
                        }
                        extra = {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: 'Завершить добавление слов',
                                            callback_data: 'back'
                                        }
                                    ], [
                                        {
                                            text: 'Модерация',
                                            callback_data: 'moderation'
                                        }
                                    ]
                                ]
                            }
                        };
                        return [4 /*yield*/, ctx.reply(message, extra)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(ctx.updateType == 'callback_query')) return [3 /*break*/, 14];
                        data = ctx.update["callback_query"].data;
                        if (!(data == 'moderation')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.moderation(ctx)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!(data == 'end')) return [3 /*break*/, 11];
                        return [4 /*yield*/, vocabular_scene.greeting(ctx)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, VocabularController_1["default"].reset_middleware(ctx)];
                    case 10:
                        _a.sent();
                        ctx.wizard.selectStep(0);
                        return [2 /*return*/, ctx.answerCbQuery('Перевод сохранён в базу данных')];
                    case 11:
                        if (!(data == 'back')) return [3 /*break*/, 13];
                        ctx.answerCbQuery('Введенные значения сохранены в базе данных');
                        return [4 /*yield*/, this.add_word(ctx)
                            // ctx.wizard.selectStep(2)
                        ];
                    case 12: return [2 /*return*/, _a.sent()
                        // ctx.wizard.selectStep(2)
                    ];
                    case 13:
                        ctx.answerCbQuery('Команда не найдена');
                        _a.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        err_8 = _a.sent();
                        console.log(err_8);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    vocabular_scene.render_settings = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var title, extra_2, err_9;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        title = 'Настройки';
                        extra_2 = {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: [
                                    []
                                ]
                            }
                        };
                        return [4 /*yield*/, UserController_1["default"].get_settings(ctx)
                                .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (!data.rules) {
                                        extra_2.reply_markup.inline_keyboard.push([
                                            {
                                                text: 'Проверка на ознакомление с правилами ✅',
                                                callback_data: 'toggle_rules'
                                            }
                                        ]);
                                    }
                                    else {
                                        extra_2.reply_markup.inline_keyboard.push([
                                            {
                                                text: 'Проверка на ознакомление с правилами ❌',
                                                callback_data: 'toggle_rules'
                                            }
                                        ]);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        extra_2.reply_markup.inline_keyboard.push([
                            {
                                text: 'Назад',
                                callback_data: 'back'
                            }
                        ]);
                        return [4 /*yield*/, ctx.editMessageText(title, extra_2)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_9 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    vocabular_scene.add_word = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var message, extra_3, err_10;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        message = "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043B\u043E\u0432\u0430\u0440\u044F";
                        extra_3 = {
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: []
                            }
                        };
                        return [4 /*yield*/, UserController_1["default"].get_settings(ctx).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (!res) {
                                        extra_3.reply_markup.inline_keyboard.push([
                                            {
                                                text: 'Прочитать правила',
                                                callback_data: 'rules'
                                            }
                                        ], [
                                            {
                                                text: 'Назад',
                                                callback_data: 'back'
                                            }
                                        ]);
                                    }
                                    else {
                                        extra_3.reply_markup.inline_keyboard.push([
                                            {
                                                text: 'Начать',
                                                callback_data: 'start__'
                                            }
                                        ], [
                                            {
                                                text: 'Назад',
                                                callback_data: 'back'
                                            }
                                        ]);
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        if (ctx.updateType == 'message') {
                            ctx.reply(message, extra_3);
                        }
                        if (ctx.updateType == 'callback_query') {
                            ctx.editMessageText(message, extra_3);
                            if (ctx.session.__scenes.cursor == 3) {
                                ctx.wizard.selectStep(1);
                            }
                            else {
                                ctx.wizard.next();
                                ctx.answerCbQuery();
                            }
                        }
                        return [4 /*yield*/, VocabularController_1["default"].reset_middleware(ctx)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_10 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return vocabular_scene;
}());
exports["default"] = vocabular_scene;
