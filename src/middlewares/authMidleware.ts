import { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";
import User from "../interface/user";
import decodeToken from "../utils/decodeToken";
import Token_Decoded from "../interface/token_decoded";
const authMidleware= async(
  request: Request,
  response: Response,
  next: NextFunction
) =>{
  const token = request.headers.authorization?.split(" ")[1] || "";
  const decoded_data = <Token_Decoded> await decodeToken(token);
  
  try {
    if (decoded_data.status) {
      const user = <User>decoded_data.decoded;
      if (await UserModel.isExistUser(user.email)) {
        request.body._id = user.id;
        next();
      } else {
        throw "Invalid user.";
      }
    } else {
      //todo return redirect to login
      response.status(401).json({
        status: 'error',
        message: "Your account is expiration.",
        redirectURL:'/logout'
      });
    }
  } catch {
    response.status(401).send({
      message: "Your account is invalid.",
    });
  }
}
export default authMidleware;