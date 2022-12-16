import { model, Schema } from "mongoose";
import buryatTranslateSchema, { IBuryatTranslate } from './IBuryatTranslate'
import { IRussianTranslates, russianTranslateScehma, russianTranslatesSchema } from "./IRussianTranslates";

export interface ITranslate {
    buryat_translate?: IBuryatTranslate
    russian_translates?: IRussianTranslates
}

export const translateSchema = new Schema<ITranslate>({
    buryat_translate: { type: buryatTranslateSchema, required: false, unique: true },
    russian_translates: { type: russianTranslatesSchema, required: false, unique: false }
}, {
    timestamps: true
})

export const TranslateModel = model<ITranslate>('translates', translateSchema)

export default TranslateModel