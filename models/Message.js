import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  
  text: {
    type: String,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Schema.Types.Date,
    required: true,
  }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
