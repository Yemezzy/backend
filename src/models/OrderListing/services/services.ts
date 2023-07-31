import mongoose from "mongoose";
import { IOrderServicesDocument } from "./servicesTypes";

const Schema = mongoose.Schema;

const OrderServicesSchema = new Schema(
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

    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderServicesModel = mongoose.model<IOrderServicesDocument>(
  "Order_Services",
  OrderServicesSchema
);
export default OrderServicesModel;
