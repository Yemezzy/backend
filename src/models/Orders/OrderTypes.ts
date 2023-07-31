import { Document, Model } from "mongoose";

export interface IOrder {
  user: string;
  order_category_id: string;
  link: string;

  total_charge: number;
  confirmed: boolean;
}

export interface IOrderDocument extends IOrder, Document {}

export interface IOrderModel extends Model<IOrderDocument> {}
