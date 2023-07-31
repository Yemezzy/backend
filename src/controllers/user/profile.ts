import { Response, Request } from "express"
import UserModel from "../../models/User/UserModels"
import bcrypt from 'bcrypt'
interface IGetUserAuthInfoRequest extends Request {
    user: any;
  }

  const   get_profile =async (req:IGetUserAuthInfoRequest| any, res:Response)=>{
try {
const username =  req.user 
const user =  await UserModel.findOne({username}).select(['-password', '-isVerified'])

return res.status(200).json(user)
} catch (error) {
    return res.status(500).json('internal server error')
}
    }


const edit_profile = async (req:IGetUserAuthInfoRequest|any, res:Response)=>{

    try {
        const username = req.user
        console.log(username)

    const userInDB = await UserModel.findOne({username})
 
if(!userInDB){
    return res.status(404).json({message: "invalid authentication"})
}

const {firstname, lastname, email, password, confirm_password  } = req.body
if(!firstname|| !lastname || !email ){
    return res.status(400).json({message:"missing field"})
}


userInDB.firstname = firstname
userInDB.lastname = lastname
userInDB.email = email
if(!password){
    userInDB.save()
    return res.status(200).json({message:"profile updated"})
}

if(password !== confirm_password){
    return res.status(400).json({message: "passwords do not match"})
}
const salt = bcrypt.genSaltSync(10)
const hashedPassword = bcrypt.hashSync(password, salt)
console.log()
userInDB.password = hashedPassword
userInDB.save()
return res.status(200).json({message:"profile updated and password updated"})
    } catch (error) {
         return res.status(500).json({message: "internal server error"})
    }
} 

export {get_profile, edit_profile}