import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pusher } from "../server.js";
import Message from "../model/messages.js";
import mongoose from "mongoose";

class ChatService {
  async chatAuth(data) {
    const { socket_id, channel_name, id } = data;

    if (!socket_id || !channel_name) {
      return {
        msg: "Invalid request: socket_id and channel_name are required.",
        status: 400,
        data: null,
      };
    }
    const presenceData = {
      user_id: id,
      user_info: {
        username: id,
      },
    };
    const auth = pusher.authenticate(socket_id, channel_name, presenceData);
    return auth;
  }

  async getSingleChatMessage(data) {
    const { sender, receiver } = data;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });
    return messages;
  }

  async sendMessage(data) {
    const { sender, receiver, text } = data;

    const message = new Message({ sender, receiver, text });

    await message.save();

    const list = await this.chatList({ userId: sender });

    pusher.trigger(`private-chat-${sender}`, "message", message);
    pusher.trigger(`private-chat-${receiver}`, "message", message);

    pusher.trigger(`private-chat-${sender}`, "list", list);
    pusher.trigger(`private-chat-${receiver}`, "list", list);
    return message;
  }

  async chatList(data) {
    const userObjectId = new mongoose.Types.ObjectId(data.userId);

    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userObjectId }, { receiver: userObjectId }],
        },
      },
      {
        $sort: { timestamp: -1 }, // Sort messages by timestamp in descending order
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", userObjectId] }, "$receiver", "$sender"],
          },
          lastMessage: { $first: "$$ROOT" }, // Get the first message after sorting
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiver", userObjectId] }, // User is the receiver
                    { $eq: ["$read", false] }, // Message is unread
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users", // Assuming your User collection is named 'users'
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Unwind the userDetails array to get user information
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          userId: "$_id",
          username: "$userDetails.username",
          email: "$userDetails.email",
          lastMessage: {
            text: "$lastMessage.text",
            timestamp: "$lastMessage.timestamp",
          },
          unreadCount: 1, // Include unreadCount field
        },
      },
      {
        $sort: { "lastMessage.timestamp": -1 }, // Ensure the final result is sorted by the latest message timestamp
      },
    ]);

    return messages;

    // return messages;
  }

  async readMessages(data) {
    const userId = new mongoose.Types.ObjectId(data.userId);
    const selectedUserId = new mongoose.Types.ObjectId(data.selectedUserId);

    

    const messages = await Message.updateMany(
      { sender: selectedUserId, receiver: userId },
      { $set: { read: true } }
    );

    pusher.trigger(`private-chat-${selectedUserId}`, "list", messages);
    pusher.trigger(`private-chat-${userId}`, "list", messages);

    return messages;
  }
}

// To use this class, you can create an instance and call the methods:
const chatService = new ChatService();

export default chatService;
