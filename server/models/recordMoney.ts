import mongoose, { Schema } from "mongoose";
import { IRecord } from "../interfaces/IRecord";

// 로그인한 사용자의 ID를 어떻게 구하는지에 따라서 적절히 설정합니다.
const loggedInUserId = 'zczc14'; // 예시로 사용자 ID를 하드코딩한 것입니다. 실제 사용자 ID를 여기에 적용해야 합니다.

// 사용자 ID를 포함한 모델 이름 생성
const modelName = `RecordMoneies_${loggedInUserId}`;

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
});

// 동적으로 모델 생성
const RecordModel = mongoose.model<IRecord & mongoose.Document>(modelName, RecordMoneySchema);

export default RecordModel;
