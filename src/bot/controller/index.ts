import { ifError } from "assert";
import { MongoClient } from "mongodb";
require("dotenv").config();

const dbname = process.env.DB_NAME;
let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

export const getTranslatedVocabular = async function () {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("vocabular")
            .find()
            .toArray()
    } catch (err) {
        return false
    }
}

export const setWord = async function (update) {

    let word = update["message"].text.toLowerCase()

    try {
        await client.connect()
        return await client.db(dbname)
            .collection("vocabular")
            .findOne({ name: word })
            .then(async (result) => {

                // Если документ найден
                if (result) {
                    if (result.translte) {
                        const data =  {
                            status: 'exists',
                            words: result.translate
                        }

                        return data
                    } else {
                        return await client.db(dbname)
                            .collection("vocabular")
                            .insertOne({ name: word })
                            .then((doc) => {
                                return 'added'
                            })
                    }
                }

                // Если пользователь впервые открыл бот
                else {
                    return await client.db(dbname)
                        .collection("vocabular")
                        .insertOne({ name: word })
                        .then((doc) => {
                            return 'added'
                        })
                }

            })
    } catch (err) {
        console.log(err)
        return false
    }
}

export const setTranslate = async function (update, translate) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("vocabular")
            .updateOne({
                name: translate
            }, {
                $push: {
                    translate: update.text
                }
            }, {
                upsert: true
            })

    } catch (err) {
        return err
    }
}

export const getstart = async function (update) {
    try {
        await client.connect()
        await client.db(dbname)
            .collection("users")
            .findOne({ id: update.id })
            .then(async (result) => {

                // Если документ найден
                if (result) {
                    await client.db(dbname)
                        .collection("users")
                        .updateOne({
                            id: update.id
                        }, {
                            $set: {
                                date: update.date
                            }
                        })
                        .then(data => {
                            console.log(data)
                        })
                }

                // Если пользователь впервые открыл бот
                else {
                    await client.db(dbname)
                        .collection("users")
                        .insertOne(update)
                        .then(result => console.log(result))
                }

            })
    } catch (err) {
        console.log(err)
        return false
    }
}

export const feedback_manager_register = async function (update: any) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("users")
            .findOne({ id: update.id })
            .then((user) => {
                if (user.role) {
                    if (user.role.indexOf("feedback_manager") !== -1) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            })
    } catch (err) {
        console.log(err)
    }
}

export const register_feedback_manager = async function (update) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("users")
            .updateOne({
                id: update.id
            }, {
                $set: {
                    role: ["feedback_manager"]
                }
            }, {
                upsert: true
            })
    } catch (err) {
        return err
    }
}

export const get_feedback_managers = async function () {
    try {
        await client.connect()
        let res = await client.db(dbname)
            .collection("users")
            .find({
                role: 'feedback_manager'
            })
            .toArray()

        console.log(res)
        return res
    } catch (err) {
        return err
    }
}

export const write_feedback_prop = async function (update) {
    try {
        await client.connect()
        let res = await client.db(dbname)
            .collection("feedback")
            .insertOne(update)

        return res
    } catch (err) {
        return err
    }
}

export const get_feedback_props = async function () {
    try {
        await client.connect()
        let res = await client.db(dbname)
            .collection("feedback")
            .find()
            .toArray()
        return res
    } catch (err) {
        return err
    }
}