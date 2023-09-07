import { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";
import expToken from "../utils/expToken";
import User from "../interface/user";
import decodeToken from "../utils/decodeToken";
const authMidleware= async(
  request: Request,
  response: Response,
  next: NextFunction
) =>{
  const token = request.headers.authorization?.split(" ")[1] || "";
  const user = <User>(decodeToken(token));
  console.log(user);
  
  try {
    if (await UserModel.isExistUser(user.email)) {
      if (expToken(token)) {
        request.body.id = user.id;
        next();
      } else {
        //todo return redirect to login 
        response.status(401).send({
          message: "Your account is expiration.",
        });
      }
    } else {
      throw "Invalid user.";
    }
  } catch {
    response.status(401).send({
      message: "Your account is invalid.",
    });
  }
}
export default authMidleware;