const chatRoom = require("../models/chatRoom.js");
const Messages = require("../models/Message.js");
const User = require("../models/User.js");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.post("/api/getChatRoomByParticipants", async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2) {
      return res.status(400).json({
        success: false,
        message: "Both participant IDs are required",
      });
    }

    const userChatRoom = await chatRoom
      .findOne({
        participants: { $all: [userId1, userId2] },
      })
      .populate("participants")
      .populate("lastMessage");

    if (!userChatRoom) {
      return res.status(404).json({
        success: false,
        message: "Chatroom not found for the given participants",
      });
    }

    res.status(200).json({
      success: true,
      data: userChatRoom,
    });
  } catch (error) {
    console.error("Error fetching chat room:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve the chat room",
      error: error.message,
    });
  }
});

router.post("/api/getAllUserChatRooms", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const chatRooms = await chatRoom
      .find({ participants: userId })
      .populate("participants")
      .populate("lastMessage");

    res.status(200).json({
      success: true,
      data: chatRooms,
    });
  } catch (error) {
    console.error("Error fetching user chat rooms:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve chat rooms",
      error: error.message,
    });
  }
});
router.post("/api/createChatRoom", async (req, res) => {
  try {
    const { participants } = req.body;
    console.log(participants);
    if (
      !participants ||
      !Array.isArray(participants) ||
      participants.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Participants are required and should be an array of user IDs",
      });
    }

    const users = await User.find({ _id: { $in: participants } });
    if (users.length !== participants.length) {
      return res.status(400).json({
        success: false,
        message: "One or more participants are invalid",
      });
    }

    const ChatRoom = new chatRoom({
      participants,
      lastMessage: null,
    });

    const savedChatRoom = await ChatRoom.save();

    return res.status(201).json({
      success: true,
      message: "Chat room created successfully",
      data: savedChatRoom,
    });
  } catch (error) {
    console.error("Error creating chat room:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create chat room",
      error: error.message,
    });
  }
});
router.post("/api/getAllChatRoomMessages", async (req, res) => {
  try {
    const { chatRoomId } = req.body;
    console.log(chatRoomId);
    if (!chatRoomId) {
      return res.status(400).json({
        success: false,
        message: "Chat room ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(chatRoomId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat room ID.",
      });
    }

    const messages = await Messages.find({ chatRoom: chatRoomId })
      .populate("sender", "_id name profile_url")
      .sort({ createdAt: 1 });

    if (!messages || messages.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No messages found for this chat room.",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Messages retrieved successfully.",
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
      error: error.message,
    });
  }
});
module.exports = router;
