import { ObjectId, ObjectID } from "mongodb"
import { MyContext } from "../../Model"
import { CustomerModel } from "../../Model/Common/ICustomer"
import ModerationModel, { ModerationInterface } from "../../Model/Moderation/IModeration"
import { BuryatTranslateModel } from "../../Model/Translate/IBuryatTranslate"
import { IRussianTranslate, IRussianTranslates, russianTranslateModel, russianTranslatesModel } from "../../Model/Translate/IRussianTranslates"
import TranslateModel, { ITranslate } from "../../Model/Translate/ITranslateModel"
import IUser from "../../Model/User/IUserModel"
import UserModel from "../../Model/User/UserModel"

class VocbularController {

    static async insert_middleware(ctx: MyContext) {
        try {

            // касание
            let customer = new CustomerModel({
                userID: ctx.from.id
            })

            // перевод 
            let buryat_translate = new BuryatTranslateModel({
                name: ctx.update['message'].text.toLocaleLowerCase(),
                customers: customer
            })

            // buryat_translate.save()

            // middleware
            let middleware = new TranslateModel({
                buryat_translate: buryat_translate
            })
            // middleware.save()

            await UserModel.findOneAndUpdate({
                id: ctx.from.id
            }, {
                $set: {
                    middleware: middleware
                }
            }).then(async () => {
                console.log(ctx.update['message'].text.toLocaleLowerCase() + ' записан в middleware.buryat_translate')
            })

        } catch (err) {
            console.log(err)
        }
    }

    static async insert_middleware_translate(ctx: MyContext) {
        try {

            let customer = new CustomerModel({
                userID: ctx.from.id
            })

            let russian_translate = new russianTranslateModel({
                name: ctx.update["message"].text,
                customers: [ customer ]
            })

            let russian_translates = new russianTranslatesModel({
                translates: [russian_translate]
            })

            return await UserModel.findOne({
                id: ctx.from.id
            }).then(async (user: IUser) => {

                const moderation = new ModerationModel({
                    buryat_translate: user.middleware.buryat_translate,
                    russian_translate: russian_translate,
                    customer: customer
                })

                moderation.save().then(async (res) => {
                    
                    let obj_id: string = res._id.toString()
                    await UserModel.findOneAndUpdate({
                        id: ctx.from.id
                    }, {
                        $addToSet: {
                            'vocabular.on_moderation': obj_id
                        }
                    })

                })
                
                if (user.middleware.russian_translates) {
                    if (user.middleware.russian_translates.translates) {
                        if (user.middleware.russian_translates.translates.length) {
                        
                            return await UserModel.findOneAndUpdate({
                                id: ctx.from.id
                            }, {
                                $addToSet: {
                                    'middleware.russian_translates.translates': russian_translate
                                }
                            }).then(async () => {
                                return 'updated'
                            })

                        }
                    }
                } else {
                    return await UserModel.findOneAndUpdate({
                        id: ctx.from.id
                    }, {
                        $set: {
                            'middleware.russian_translates': russian_translates
                        }
                    }).then(async () => {
                        return 'setted'
                    })
                }

            })
            
        } catch (err) {
            // err
        }
    }

    static async get_buryat_translate_from_middleware (ctx: MyContext) {
        try {
            return await UserModel.findOne({
                id: ctx.from.id
            }).then(async (user: IUser) => {
                return user.middleware.buryat_translate.name
            })
        } catch (err) {
            // err
        }
    }

    static async get_russian_translates_after_insert(ctx: MyContext) {
        try {
            return await UserModel.findOne({
                id: ctx.from.id
            }).then(async (user: IUser) => {
                return user.middleware.russian_translates.translates
            })
        } catch (err) {
            // err
        }
    }

    static async reset_middleware(ctx: MyContext) {
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

    static async get_translates(ctx: MyContext) {
        try {
            return await UserModel.findOne({
                id: ctx.from.id
            }).then(async (user: IUser) => {
                if (user.middleware) {
                    return await TranslateModel.findOne({
                        'buryat_translate.value': user.middleware.buryat_translate.name.toLowerCase()
                    }).then(async (response: ITranslate) => {
                        return response.russian_translates
                    })

                }
            })
        } catch (err) {
            // err
        }
    }

    static async check_on_exists_moderation (ctx: MyContext) {
        try {

            return await UserModel.findOne({
                id: ctx.from.id
            }).then(async (user: IUser) => {
                if (user.vocabular) {
                    if (user.vocabular.on_moderation) {
                        if (user.vocabular.on_moderation.length) {
                            return false
                        } else {
                            return true
                        }
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            })

        } catch (err) {
            // 
        }
    }

    static async get_words_on_moderation (ctx: MyContext) {
        try {
            
            return await UserModel.findOne({
                id: ctx.from.id
            }).then(async (user: IUser) => {
                return user.vocabular.on_moderation
            })

        } catch (err) {
            // 
        }
    }

    static async get_word_on_moderation (ctx: MyContext, str: string) {
        try {
            return await ModerationModel.findOne({
                _id: new ObjectId(str)
            })
        } catch (err) {
            // err
        }
    }

    static async get_words_for_page(ctx: MyContext, posts_per_page: number, page: number ) {
        return await UserModel.findOne({
            id: ctx.from.id
        }).then(async (user: IUser) => {
            // console.log('Начало: ' + page * posts_per_page, 'Конец: ' + (((page + 1) * posts_per_page)))
            let posts = user.vocabular.on_moderation.slice(page * posts_per_page, (posts_per_page * (page +1)))
            // console.log(posts.length)
            return posts
        })
    }

    static async get_page (ctx: MyContext) {
        return await UserModel.findOne({
            id: ctx.from.id
        }).then(async (user: IUser) => {
            if (user.vocabular) {
                if (user.vocabular.page) {
                    return user.vocabular.page
                } else {
                    return false
                }
            } else {
                return false
            }
        })
    }

    static async save_translate(ctx: MyContext) {

        await this.get_translates(ctx)
            .then(async (arr) => {
                if (!arr) {
                    try {
                        console.log('not found')
                        await UserModel.findOne({
                            id: ctx.from.id
                        }).then(async (user: IUser) => {
                            console.log(user)
                            if (user.middleware) {
                                new TranslateModel(user.middleware).save()
                            }
                        })
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    console.log(arr)
                    try {
                        await UserModel.findOne({
                            id: ctx.from.id
                        }).then(async (user: IUser) => {
                            if (user.middleware) {
                                await TranslateModel.findOneAndUpdate({
                                    'word.value': user.middleware.buryat_translate.name.toLowerCase()
                                }, {
                                    $addToSet: {
                                        'translate': user.middleware.russian_translates.translates
                                    }
                                })
                            }
                        })
                    } catch (err) {
                        console.log(err)
                    }
                }
            })
    }

}

export default VocbularController
