import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { industryTypes, investorType, roleType } from "../constant/index.js";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
  text: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
