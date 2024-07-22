import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { industryTypes, investorType, roleType } from "../constant/index.js";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    investorType: {
      type: String,
      enum: investorType,
    },
    industryType: {
      type: [String],
      enum: industryTypes,
    },
    role: {
      type: Number,
      enum: roleType,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
    },
    country: {
      type: String,
    },
    companyLogo: {
      type: String,
    },
    companyBio: {
      type: String,
    },
    pitchDeck: {
      type: String,
    },
    website: {
      type: String,
    },
    totalInvestment: {
      type: Number,
    },
    maxInvestment: {
      type: Number,
    },
    fundingRaise: {
      type: String,
    },
    founderName: {
      type: String,
    },
    teamSize: {
      type: Number,
    },
    faceBook: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    targetCountry: {
      type: String,
    },
    connects: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

export default User;
