import mongoose from "mongoose";

import { IUserDocument } from "./UserTypes";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    profile_image: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
      required: false,
    },
    transaction: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        
        amount: {
          type: Number,
        },
        date: {
          type: Number,
          default: new Date(),
        },
        payment_method: {
          type: String,
        },
        address: {
          type: String,
        },
        confirmed: {
          type: String,
          default: "processing",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
