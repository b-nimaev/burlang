import { model, Schema } from "mongoose"
import { customerSchema, ICustomer } from "../Common/ICustomer"

export interface IRussianTranslate {
    name: string,
    customers: [ ICustomer ]
}

export interface IRussianTranslates {
    translates: [ IRussianTranslate ]
}

export const russianTranslateScehma = new Schema<IRussianTranslate>({
    name: { type: String, required: true, unique: false },
    customers: { type: [customerSchema], required: true, unique: false }
}, {
    timestamps: {
        createdAt: true
    }
})

export const russianTranslateModel = model<IRussianTranslate>('russian', russianTranslateScehma)

export const russianTranslatesSchema = new Schema<IRussianTranslates>({
    translates: { type: [russianTranslateScehma], required: false }
})

export const russianTranslatesModel = model<IRussianTranslates>('russian_translates', russianTranslatesSchema)