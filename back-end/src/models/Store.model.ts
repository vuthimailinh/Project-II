import mongoose, { Schema, Document } from "mongoose";

export interface IStoreProduct {
    prod_id: string;
    sale: string;
    quantity: string;
}

export interface IStore extends Document {
    city: string;
    address: string;
    storeProduct: [IStoreProduct];
}

const StoreSchema: Schema = new Schema(
    {
        id: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        storeProduct: [
            {
                prod_id: { type: String, ref: "Product", required: true },
                sale: { type: String, required: true },
                quantity: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);

const StoreModel = mongoose.model<IStore>("Store", StoreSchema);

export default StoreModel;