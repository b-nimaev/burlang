import mongoose, { connect } from 'mongoose';
import { MyContext } from "../Model";
import UserModel, { IUser } from '../Model/UserModel';
import WordModel, { IWord } from '../Model/WordModel';

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

    static async reset_middleware (ctx: MyContext) {
        try {
            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $unset: {
                    'middleware': '""'
                }
            })
        } catch (err) {
            // err
        }
        
    }
    static async get_translates (ctx: MyContext) {
        try {
            return await UserModel.findOne({
                id: ctx.from.id
            }).then(async (user: IUser) => {
                if (user.middleware) {
                    
                    return await WordModel.findOne({
                        word: user.middleware.word
                    }).then(async (response: IWord) => {
                        return response.translate
                    })

                }
            })
        } catch (err) {
            // err
        }
    }

    static async save_translate (ctx: MyContext) {

        await this.get_translates(ctx)
            .then(async (arr) => {
                if (!arr) {
                    try {
                        await UserModel.findOne({
                            id: ctx.from.id
                        }).then(async (user: IUser) => {
                            if (user.middleware) {
                                new WordModel(user.middleware).save()
                            }
                        })
                    } catch (err) {
                        // err
                    }
                } else {
                    console.log(arr)
                    try {
                        await UserModel.findOne({
                            id: ctx.from.id
                        }).then(async (user: IUser) => {
                            if (user.middleware) {
                                await WordModel.findOneAndUpdate({
                                    word: user.middleware.word
                                }, {
                                    $addToSet: {
                                        'translate': user.middleware.translate
                                    }
                                })
                            }
                        })
                    } catch (err) {
                        // err
                    }
                }
            })
    }

}

export default vocabular_services
