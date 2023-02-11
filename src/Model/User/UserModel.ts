import { model, Schema } from "mongoose";
import { translateSchema } from "../Translate/ITranslateModel";
import IUser from "./IUserModel";

const userSchema = new Schema<IUser>({
    id: { type: Number, unique: true, required: true, dropDups: true },
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    username: { type: String, required: false },
    male: { type: String, required: false },
    from: { type: String, required: false },
    middleware: translateSchema,
    vocabular: {
        on_moderation: { type: [ String ], required: false },
        page: { type: Number, required: false }
    },
    settings: {
        rules: { type: Boolean, required: true },
        username: { type: String, required: false },
        interface_language: { type: String, required: true }
    },
    moderation: {
        access: { type: Boolean, required: true },
        currentPage: { type: Number, required: false },
        currentWord: { type: String, required: false },
        moderatedCount: { type: Number, required: false }
    },
    subscribe: { type: Boolean, required: true },
    selected_string: { type: String, required: false }
}, {
    timestamps: true
})

const UserModel = model<IUser>('users', userSchema)

export default UserModel