import { Document, Model } from "mongoose";

export interface IOrderCategory {
  user: string;
  title: string;

  services: Array<string>;
}

export interface IOrderCategoryDocument extends IOrderCategory, Document {}

export interface IOrderCategoryModel extends Model<IOrderCategoryDocument> {}
