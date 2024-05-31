import mongoose, {Schema} from "mongoose";

const registerSchema = new Schema({
    name: {
        type: String,
        index : true,
    },
    koreaname: {
        type : String,
    },
    password: {
        type: String,
    },
    passwordCheck: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        index: true, // 인덱스 정의 추가
    },
    gender: {
        type: String,
    },
    want: {
        type: String,
    },
   
});


// IUser 인터페이스를 먼저 정의
export interface IUser {
    name: string;
    koreaname: string;
    password: string;
    passwordcheck: string;
    email: string;
    gender: string;
    want: string;

}

export default mongoose.models.registermoneyuser || mongoose.model('registermoneyuser', registerSchema);