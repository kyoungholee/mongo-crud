import mongoose, {Schema} from "mongoose";
import {IUser} from "../interfaces/IUser";

const RegisterSchema = new Schema({
    name : {
        type: String,
    },
    email : {
        type: String,
        unique: true,
    },
    password : {
        type: String,
    },
    avatar : {
        type: String,
    },
    date : {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.model<IUser & mongoose.Document>("Register", RegisterSchema);