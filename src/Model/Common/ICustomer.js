"use strict";
exports.__esModule = true;
exports.CustomerModel = exports.customerSchema = void 0;
var mongoose_1 = require("mongoose");
exports.customerSchema = new mongoose_1.Schema({
    userID: { type: Number, required: true, unique: false }
}, {
    timestamps: {
        createdAt: true
    }
});
exports.CustomerModel = (0, mongoose_1.model)('customer', exports.customerSchema);
