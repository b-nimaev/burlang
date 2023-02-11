import { model, Schema } from "mongoose"

export interface IBin {
    partial?: string,
    translates: {
        russian?: string,
        english?: string,
        buryat?: string
    }
}

export const binSchema = new Schema<IBin>({
    partial: { type: String, required: false, unique: true },
    translates: {
        russian: { type: String, required: false, unique: false },
        english: { type: String, required: false, unique: false },
        buryat: { type: String, required: false, unique: false }
    }
})

export const BinModel = model<IBin>('bin', binSchema)