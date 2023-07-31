import { NextFunction, Response, Request } from "express"
import jwt, { Secret } from "jsonwebtoken";
const access_secret = process.env.USER_ACCESS_TOKEN_SECRET as Secret
interface IGetUserAuthInfoRequest extends Request {
    user: any;
  }
function authenticateUser  (req:IGetUserAuthInfoRequest |any, res:Response, next:NextFunction){
    try {
    if(!req.cookies._access_token_){
    return res.status(401).json({message: 'you are not authorized here'})
    }
    
    const username:any = jwt.verify(req.cookies._access_token_, access_secret)
    if(!username){
        return res.status(400).json({message: 'please log in'})
    }     
    
    req.user = username.user
        next()
    } catch (error) {
        console.log(error)
    }
    }

    export {authenticateUser}