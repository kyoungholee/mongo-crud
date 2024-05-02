import mongoose, { Schema, Model, Document } from "mongoose";
import { IRecord } from "../interfaces/IRecord";

// 이미 존재하는 모델을 재사용하도록 변경
let RecordModel: Model<IRecord & Document>;

// 모델이 이미 존재하는지 확인하고 존재하지 않으면 생성
if (mongoose.models && mongoose.models.savemoneydata) {
    RecordModel = mongoose.model<IRecord & Document>("savemoneydata");
} else {
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
        createDate: {
            type: String,
        },
        // updateDate: {
        //     type: String,
        // }

        
    });
    
    RecordModel = mongoose.model<IRecord & Document>("savemoneydata", RecordMoneySchema);
}

export default RecordModel;
