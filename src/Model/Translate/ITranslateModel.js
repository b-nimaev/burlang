"use strict";
exports.__esModule = true;
exports.TranslateModel = exports.translateSchema = void 0;
var mongoose_1 = require("mongoose");
var IBuryatTranslate_1 = require("./IBuryatTranslate");
var IRussianTranslates_1 = require("./IRussianTranslates");
exports.translateSchema = new mongoose_1.Schema({
    buryat_translate: { type: IBuryatTranslate_1["default"], required: false, unique: false },
    russian_translates: { type: IRussianTranslates_1.russianTranslatesSchema, required: false, unique: false }
}, {
    timestamps: true
});
exports.TranslateModel = (0, mongoose_1.model)('translates', exports.translateSchema);
exports["default"] = exports.TranslateModel;
