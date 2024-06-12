import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment extends Document {
    _id: string;
    text: string;
    prod_id: string | Types.ObjectId;
    user_id: string | Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
    text: { type: String, required: true },
    prod_id: { type: String, ref: "Product", required: true },
    user_id: { type: String, ref: "User", required: true },
});

const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;