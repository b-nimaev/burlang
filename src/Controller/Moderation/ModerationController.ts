import { ObjectId } from "mongodb";
import { MyContext } from "../../Model";
import ModerationModel from "../../Model/Moderation/IModeration";
import IUser from "../../Model/User/IUserModel";
import UserModel from "../../Model/User/UserModel";

export default class ModerationController {
    static async get_words_on_moderation () {
        return ModerationModel.find({})
    }

    static async mass_delete (pos1, pos2) {
        try {

            // await ModerationModel.findA

        } catch (err) {
            console.log(err)
        }
    }

    static async get_word_on_moderation (str: ObjectId) {
        try {

            return await ModerationModel.findById(str)

        } catch (err) {
            console.log(err)
        }
    }

    static async set_current_word (ctx: MyContext, str: string) {
        try {
            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $set: {
                    "moderation.currentWord": str
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    static async agree_moderation_word (ctx: MyContext) {
        try {
            
            let user: IUser = await UserModel.findOne({
                id: ctx.from.id
            })

            await ModerationModel.findOne({
                id: new ObjectId(user.moderation.currentWord)
            })

        } catch (err) {
            console.log(err)
        }
    }

    static async decline_moderation_word (ctx: MyContext) {
        try {
            
            let user: IUser = await UserModel.findOne({
                id: ctx.from.id
            })

            let str = await ModerationModel.findOne({
                id: new ObjectId(user.moderation.currentWord)
            })

            let moderationWord = await ModerationModel.findOne({ id: str })
            if (moderationWord) {
                return moderationWord
            } else {
                return 404
            }

        } catch (err) {
            console.log(err)
        }
    }
}