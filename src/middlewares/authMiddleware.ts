import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
import expToken from "../utils/expToken";
import User from "../interface/user";
const authMiddleware= async(
  request: Request,
  response: Response,
  next: NextFunction
) =>{
  const token = request.headers.authorization?.split(" ")[1] || "";
  const user = <User>(<jwt.JwtPayload>jwt.verify(token, process.env.JWT_SECRET));
  try {
    if (await UserModel.isExistUser(user.email)) {
      if (expToken(token)) {
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
export default authMiddleware;