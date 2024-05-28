import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type : String,
        },
        writer: {
            type : String,
        },
        day: {
            type: String,
        }

    }
);


const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;