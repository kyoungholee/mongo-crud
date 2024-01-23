import mongoose, {Schema} from "mongoose";
import { IRecord } from "../interfaces/IRecord";


const RecordMoneySchema = new Schema({
    category : {
        type : String
    },
    price : {
        type : String
    },
    explanation : {
        type : String
    },
})

export default mongoose.model<IRecord & mongoose.Document>("RecordMoney", RecordMoneySchema);