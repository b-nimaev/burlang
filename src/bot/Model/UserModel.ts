import { connect, model, Schema } from 'mongoose';
import { User } from 'telegraf/typings/core/types/typegram';
import { IWord } from './WordModel';

let uri = 'mongodb://localhost:27017'

export interface IUser extends User {
    male?: 'male' | 'female' | 'later' | null,
    from?: string | null,
    middleware: IWord
}

const userSchema = new Schema<IUser>({
    id: { type: Number, unique: true, required: true, dropDups: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    username: { type: String, required: false },
    male: { type: String, required: false },
    from: { type: String, required: false },
    middleware: {
        word: { type: String, required: false, unique: true, dropDups: true },
        translate: [{ type: String, required: false, unique: false }]
    }
})

const UserModel = model<IUser>('users', userSchema)

export default UserModel