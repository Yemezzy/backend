import mongoose from "mongoose";

import { IOrderDocument } from "./OrderTypes";

const Schema = mongoose.Schema;
const OrderSchma = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order_Category",
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    charge: {
      type: Number,
      required: true,
    },

    confirmed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Number,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["completed", "processing", "cancelled"],
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<IOrderDocument>("Orders", OrderSchma);
export default OrderModel;
