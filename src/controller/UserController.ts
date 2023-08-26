import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User";
class UserController {
  async getUser(request: Request, response: Response, next: NextFunction) {
    const result = await UserModel.getUser();
    console.log(result);
    response.send(result);
  }
}
export default new UserController();
