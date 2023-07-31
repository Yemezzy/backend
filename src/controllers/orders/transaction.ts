import OrderModel from "../../models/Orders/OrderModel";
import UserModel from "../../models/User/UserModels";
interface IGetUserAuthInfoRequest extends Request {
  user: any;
}
import { Response, Request } from "express";

const addTransaction = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {

    const { payment_method, address, amount} = req.body
    
    try {
         if (!req.user) {
           return res.status(403).json({ message: "you are not authorised" });
         }
        if (!payment_method || !address || !amount) {
            return res.status(400).json({message: "missing fields"})
        }
        if (amount < 100 ) {
            return res
              .status(400)
              .json({ message: "Payment must be 100$ and above" });
        }

        const user = await UserModel.findOne({ username: req.user })
    if (!user) {
      return res.status(403).json({ message: "user not found" });
    }
        // const transaction = user.transaction || []
        // const newTransaction = [...transaction, { amount, address, payment_method }]
        
        // user.transaction = newTransaction
      user.transaction.push({ amount, address, payment_method});
        user.save()
        
    } catch (error) {
        console.log(error);
        
    }
};

export { addTransaction}