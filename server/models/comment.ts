import mongoose, { Schema } from 'mongoose';

interface IComment {
  content: string;
  writer: string;
  day: string;
  postId: string; // 댓글이 속한 게시글 ID
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  writer: { type: String, required: true },
  day: { type: String, required: true },
  postId: { type: String, required: true }, // 댓글이 속한 게시글 ID
});

const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;