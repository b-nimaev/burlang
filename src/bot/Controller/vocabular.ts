import mongoose, { connect } from 'mongoose';
import { MyContext } from "../Model";
import UserModel, { IUser } from '../Model/UserModel';

class vocabular_services {

    static async save_user (ctx: MyContext) {
        try {
            await new UserModel(ctx.from).save()
        } catch (err) {
            // err
        }
    }

    static async check_gender (ctx: MyContext) {
        try {
            let user: IUser = await UserModel.findOne({ id: ctx.from.id })
            return user
        } catch (err) {
            // err
        }
    }

    static async update_gender (ctx: MyContext) {
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

    static async insert_middleware (ctx: MyContext) {
        try {
            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $set: {
                    'middleware.word': ctx.update["message"].text
                }
            })
        } catch (err) {
            // err
        }
    }

    static async insert_middleware_translate(ctx: MyContext) {
        try {
            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $addToSet: {
                    'middleware.translate': ctx.update["message"].text
                }
            })
        } catch (err) {
            // err
        }
    }

    static async get_middleware (ctx: MyContext) {
        try {
            return await UserModel.findOne({
                id: ctx.from.id
            })
        } catch (err) {
            // err
        }
    }

}

export default vocabular_services
