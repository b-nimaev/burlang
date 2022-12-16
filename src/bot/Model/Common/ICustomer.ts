import { model, Schema } from "mongoose";

export interface ICustomer {
    userID: number
}

export const customerSchema = new Schema<ICustomer>({
    userID: { type: Number, required: true, unique: false }
}, {
    timestamps: {
        createdAt: true
    }
})

export const CustomerModel = model<ICustomer>('customer', customerSchema)