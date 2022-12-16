import { MyContext } from "../../Model"

// User types & models
import IUser from "../../Model/User/IUserModel"
import UserModel from "../../Model/User/UserModel"

// Vocabular
import vocabular_scene from "../../View/Vocabular/VocabularMethods"

export default class UserConrtoller {

    static async save_user(ctx: MyContext) {
        try {
            await new UserModel(ctx.from).save()
        } catch (err) {
            console.log(err)
        }
    }

    static async check_gender(ctx: MyContext) {
        try {
            let user: IUser = await UserModel.findOne({ id: ctx.from.id })
            return user
        } catch (err) {
            // err
        }
    }

    static async update_gender(ctx: MyContext) {
        try {
            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $set: {
                    'male': ctx.update['callback_query'].data
                }
            })
        } catch (err) {
            // err
        }
    }

    static async get_settings (ctx: MyContext) {
        
        try {
            return await UserModel.findOne({
                id: ctx.from.id
            }).then(async (user: IUser) => {
                return user.settings
            })
        } catch (err) {
            // err
        }

    }

    static async toggle_rules (ctx: MyContext) {

        try {

            await this.get_settings(ctx).then(async (res: { rules: boolean }) => {
                if (res.rules) {
                    if (!res.rules) {
                        await UserModel.findOneAndUpdate({ id: ctx.from.id }, { $set: { "settings.rules": true } })
                    } else {
                        await UserModel.findOneAndUpdate({ id: ctx.from.id }, { $set: { "settings.rules": false } })
                    }
                } else {
                    await UserModel.findOneAndUpdate({ id: ctx.from.id }, { $set: { "settings.rules": true } })
                }
            })

            await vocabular_scene.render_settings(ctx)
            ctx.answerCbQuery('')

        } catch (err) {
            console.log(err)
        }
        
    }
}