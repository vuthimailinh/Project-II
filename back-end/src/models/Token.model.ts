import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User.model";

export interface IRefreshToken extends Document {
    _id: string;
    userId: mongoose.Types.ObjectId | IUser["_id"];
    refreshTokens: string[];
    tempTokens: string[];
}

const RefreshTokenSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    refreshTokens: [{ type: String }],
    tempTokens: [{type: String}],
});

const RefreshTokenModel = mongoose.model<IRefreshToken>(
    "RefreshToken",
    RefreshTokenSchema
);

export default RefreshTokenModel;