import { Document, Model } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  fullname?: string;
  firstname?: string;
  lastname?: string;
  role: string;
  balance: number;
  password: string;
  profilePicture: string;
  isVerified: Boolean;
  points: Number;
  about: string;
  transaction: {}[];
  refreshToken: Array<string>;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}
