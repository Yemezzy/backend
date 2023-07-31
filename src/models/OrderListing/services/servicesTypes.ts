import { Document, Model } from "mongoose";

export interface IServices {
  user: string;
  title: string;
  description: number;
  price: string;
}

export interface IOrderServicesDocument extends IServices, Document {}

export interface IOrderServicesModel extends Model<IOrderServicesDocument> {}
