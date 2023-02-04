"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ICustomer_1 = require("../Common/ICustomer");
var IBuryatTranslate_1 = require("../Translate/IBuryatTranslate");
var IRussianTranslates_1 = require("../Translate/IRussianTranslates");
var ModerationSchema = new mongoose_1.Schema({
    buryat_translate: IBuryatTranslate_1["default"],
    russian_translate: IRussianTranslates_1.russianTranslateScehma,
    customer: ICustomer_1.customerSchema
}, {
    timestamps: {
        createdAt: true
    }
});
var ModerationModel = (0, mongoose_1.model)('moderation', ModerationSchema);
exports["default"] = ModerationModel;
