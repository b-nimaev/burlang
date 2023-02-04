"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ITranslateModel_1 = require("../Translate/ITranslateModel");
var userSchema = new mongoose_1.Schema({
    id: { type: Number, unique: true, required: true, dropDups: true },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    username: { type: String, required: false },
    male: { type: String, required: false },
    from: { type: String, required: false },
    middleware: ITranslateModel_1.translateSchema,
    vocabular: {
        on_moderation: { type: [String], required: false },
        page: { type: Number, required: false }
    },
    settings: {
        rules: { type: Boolean, required: true }
    },
    access1: {
        moderation: { type: Boolean, required: true }
    },
    subscribe: { type: Boolean, required: true },
    selected_string: { type: String, required: false }
}, {
    timestamps: true
});
var UserModel = (0, mongoose_1.model)('users', userSchema);
exports["default"] = UserModel;
