import { ICustomer } from "../Common/ICustomer"
import { model, Schema } from "mongoose";
import { customerSchema } from "../Common/ICustomer";

export interface IBuryatTranslate {
    name: string,
    customers: [ ICustomer ]
}

const buryatTranslateSchema = new Schema<IBuryatTranslate>({
    name: { type: String, required: true },
    customers: customerSchema
}, {
    timestamps: {
        createdAt: true
    }
})

export const BuryatTranslateModel = model<IBuryatTranslate>('buryat', buryatTranslateSchema)
export default buryatTranslateSchema