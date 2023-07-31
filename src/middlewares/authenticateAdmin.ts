import { NextFunction, Response, Request } from "express"
import jwt, { Secret } from "jsonwebtoken";
import UserModel from "../models/User/UserModels";
const access_secret = process.env.USER_ACCESS_TOKEN_SECRET as Secret
interface IGetUserAuthInfoRequest extends Request {
    user: any;
  }

const authenticateAdmin = async(req:IGetUserAuthInfoRequest|any, res:Response, next:NextFunction)=>{
try {
    const user = req.user
    const userInDB:any = await UserModel.findOne({username: user})

    userInDB.role = 'admin'
   
    if(userInDB.role !== 'admin'){
return res.status(403).json({message:"you are not authorized here"})
    }

    req.isAdmin  = true
    next()
    
} catch (error) {
    return res.status(500).json('internal server error')
}
}

export {authenticateAdmin}