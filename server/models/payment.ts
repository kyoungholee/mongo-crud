import mongoose, { Schema } from 'mongoose';

interface IPayment {
    amount: string;
    orderId: string;
    orderName: string;
    customerName: string; // 댓글이 속한 게시글 ID
    customerEmail: string; // 댓글이 속한 게시글 ID

}

const CommentSchemaes: Schema = new Schema({
    amount: { type: String, required: true },
    orderId: { type: String, required: true },
    orderName: { type: String, required: true },
    customerName: { type: String, required: true }, // 댓글이 속한 게시글 ID
    customerEmail: { type: String, required: true },

});

const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Commentsss', CommentSchemaes);

export default Payment;