import { MyContext } from "../../Model"

// User types & models
import IUser from "../../Model/User/IUserModel"
import UserModel from "../../Model/User/UserModel"

// Vocabular
import vocabular_scene from "../../View/Vocabular/VocabularMethods"

export default class UserConrtoller {

    static async get_user (ctx: MyContext) {
        
        try {

            return await UserModel.findOne({
                id: ctx.from.id
            })

        } catch (err) {
            console.log(err)
        }
    }

    static async save_user(ctx: MyContext) {
        try {

            let user: IUser = {
                id: ctx.from.id,
                is_bot: ctx.from.is_bot,
                first_name: ctx.from.first_name,
                username: ctx.from.username,
                male: 'later',
                middleware: null,
                settings: {
                    rules: false,
                    username: ctx.from.first_name,
                    interface_language: 'russian'
                },
                moderation: {
                    access: false,
                    currentPage: 1,
                    currentWord: '',
                    moderatedCount: 0
                },
                subscribe: false,
                vocabular: {
                    on_moderation: [],
                    page: 0
                }
            }

            await new UserModel(user).save()
        } catch (err) {
            console.log(err)
        }
    }
    

    static async save_selected_word(ctx: MyContext, str: string) {
        try {

            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $set: {
                    "selected_string": str
                }
            })

        } catch (err) {

        }
    }

    static async delete_selected_word(ctx: MyContext) {
        try {

            let user: IUser = await this.get_user(ctx)

            console.log(user.selected_string)

            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $pull: {
                    "vocabular.on_moderation": user.selected_string
                }
            })

            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $unset: {
                    "selected_string": "",
                    "vocabular.page": ""
                }
            })

        } catch (err) {

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

    static async moderation_privilege (ctx: MyContext) {
        try {
            return await UserModel.findOne({
                id: ctx.from.id
            }).then(async (user: IUser) => {
                if (user.moderation.access) {
                    return true
                } else {
                    return false
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    static async update_username (ctx: MyContext, username: string) {
        try {
            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $set: {
                    "settings.username": username
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    static async interface_language (ctx: MyContext, language: string) {
        try {
            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $set: {
                    "settings.interface_language": language
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}