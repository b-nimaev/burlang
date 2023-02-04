"use strict";
exports.__esModule = true;
exports.russianTranslatesModel = exports.russianTranslatesSchema = exports.russianTranslateModel = exports.russianTranslateScehma = void 0;
var mongoose_1 = require("mongoose");
var ICustomer_1 = require("../Common/ICustomer");
exports.russianTranslateScehma = new mongoose_1.Schema({
    name: { type: String, required: true, unique: false },
    customers: { type: [ICustomer_1.customerSchema], required: true, unique: false }
}, {
    timestamps: {
        createdAt: true
    }
});
exports.russianTranslateModel = (0, mongoose_1.model)('russian', exports.russianTranslateScehma);
exports.russianTranslatesSchema = new mongoose_1.Schema({
    translates: { type: [exports.russianTranslateScehma], required: false }
});
exports.russianTranslatesModel = (0, mongoose_1.model)('russian_translates', exports.russianTranslatesSchema);
