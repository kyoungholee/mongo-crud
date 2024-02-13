import mongoose, {Schema} from "mongoose";
import { IRecord } from "../interfaces/IRecord";


const RecordMoneySchema = new Schema({
    category : {
        type : String,
    },
    amount : {
        type : String,
    },
    description : {
        type : String,
    },
 
})

export default mongoose.model<IRecord & mongoose.Document>("RecordMoneies", RecordMoneySchema);