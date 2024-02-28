import mongoose, { Schema } from "mongoose";
import { IRecord } from "../interfaces/IRecord";


const RecordMoneySchema = new Schema({
    category: {
        type: String,
    },
    amount: {
        type: String,
    },
    description: {
        type: String,
    },
    userid: {
        type: String,
    },
});

// 동적으로 모델 생성
const RecordModel = mongoose.model<IRecord & mongoose.Document>("savemoney", RecordMoneySchema);

export default RecordModel;
