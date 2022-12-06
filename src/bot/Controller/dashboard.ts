import { MongoClient } from "mongodb";
require("dotenv").config();

const dbname = process.env.DB_NAME;
let uri = <string>process.env.DB_CONN_STRING;
const client = new MongoClient(uri);

export const getStatusSubscription = async function (update) {
    try {
        await client.connect()
        return await client.db(dbname)
            .collection("users")
            .findOne({ id: update.id })
            .then(async (user) => {
                if (user.subscription) {
                    if (user.subscription.status) {
                        return user.subscription
                    } else {
                        return false
                    }
                }
            })
    } catch (err) {
        return false
    }
}