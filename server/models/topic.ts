import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: {
      type : String,
    },
    content: {
      type : String,
    },
    // imageFile : {
    //   type : String,
    // },
    writer :{
      type : String,
    },
    day :{
      type : String,
    },


 
  },
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;