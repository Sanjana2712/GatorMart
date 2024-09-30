const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const chatRoomSchema = new Schema({
  participants: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    validate: {
      validator: function (participants) {
        return participants.length === 2;
      },
      message: "A chat room must have exactly 2 participants.",
    },
    required: true,
  },
  lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  createdAt: { type: Date, default: Date.now },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
module.exports = ChatRoom;
