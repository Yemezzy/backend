import mongoose from "mongoose";
import { IOrderCategoryDocument } from "./OrderCategoryTypes";

const Schema = mongoose.Schema;

const OrderCategorySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    services: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        title: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const OrderCategoryModel = mongoose.model<IOrderCategoryDocument>(
  "Order_Category",
  OrderCategorySchema
);
export default OrderCategoryModel; 
