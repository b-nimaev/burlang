import { model, Schema } from "mongoose";
import { customerSchema, ICustomer } from "../Common/ICustomer";
import buryatTranslateSchema, { IBuryatTranslate } from "../Translate/IBuryatTranslate";
import { IRussianTranslate, russianTranslateScehma } from "../Translate/IRussianTranslates";

export interface ModerationInterface {
    buryat_translate: IBuryatTranslate,
    russian_translate: IRussianTranslate,
    customer: ICustomer
}

const ModerationSchema = new Schema<ModerationInterface>({
    buryat_translate: buryatTranslateSchema,
    russian_translate: russianTranslateScehma,
    customer: customerSchema
}, {
    timestamps: {
        createdAt: true
    }
})

const ModerationModel = model<ModerationInterface>('moderation', ModerationSchema)

export default ModerationModel