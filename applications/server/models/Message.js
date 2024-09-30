const mongoose = require("mongoose");
const User = require("./User");
const ChatRoom = require("./chatRoom");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  chatRoom: { type: Schema.Types.ObjectId, ref: "ChatRoom", required: true },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
