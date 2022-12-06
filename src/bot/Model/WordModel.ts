import { connect, model, Schema } from 'mongoose';

export interface IWord {
    word?: string | null,
    translate?: [string] | null
}

const wordSchema = new Schema<IWord>({
    word: { type: String, unique: true, required: false, dropDrups: true },
    translate: [{ type: String || null, unique: false, required: false }]
})

const WordModel = model<IWord>('translates', wordSchema)