"use strict";
exports.__esModule = true;
exports.BuryatTranslateModel = void 0;
var mongoose_1 = require("mongoose");
var ICustomer_1 = require("../Common/ICustomer");
var buryatTranslateSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    customers: ICustomer_1.customerSchema
}, {
    timestamps: {
        createdAt: true
    }
});
exports.BuryatTranslateModel = (0, mongoose_1.model)('buryat', buryatTranslateSchema);
exports["default"] = buryatTranslateSchema;
