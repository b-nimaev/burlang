import { model, Schema } from 'mongoose';
import { User } from 'telegraf/typings/core/types/typegram';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import bot from '..';
import { MyContext } from "../Model";

interface IAdmin extends User {}
const adminSchema = new Schema<IAdmin>({
    id: { unique: true, type: Number, dropDups: true, required: true },
    first_name: String,
    last_name: String || null,
    username: String || null 
})
const AdminModel = model<IAdmin>('admins', adminSchema);

export class database {

    static async write_admin (ctx: MyContext) {
        try {
            console.log('123')
            await new AdminModel(ctx.from).save()
        } catch (err) {
            // err 
        }
    }

    static async get_admins () {
        try {
            await AdminModel.find().then(async (users) => {
                users.forEach(async (user) => {

                    const extra: ExtraReplyMessage = {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: "Самоучитель", callback_data: "study" },
                                    { text: "Словарь", callback_data: "vocabular" }
                                ],
                                [{ text: 'Переводчик', callback_data: 'translater' }],
                                [{ text: "Личный кабинет", callback_data: "dashboard" }]
                            ]
                        }
                    }

                    let message = `Самоучитель бурятского языка \n\nКаждое взаимодействие с ботом, \nвлияет на сохранение и дальнейшее развитие <b>Бурятского языка</b> \n\nВыберите раздел, чтобы приступить`

                    await bot.telegram.sendMessage(user.id, message, extra)
                })
            })
        } catch (err) {
            //
        }
    }
}