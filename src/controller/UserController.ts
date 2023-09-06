import { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";
import generateToken from "../utils/generateToken";
import User from "../interface/user";
import _ from "lodash";
import expToken from "../utils/expToken";
import executeDBScript from "../config/database";
import generateOTP from "../utils/generateOTP";
import sendOTP from "../utils/sendOTP";
import { hashPassword } from "../utils/hashPassword";
class UserController {
  async register(request: Request, response: Response) {
    const { email } = request.body;
    if (!(await UserModel.isExistUser(email))) {
      const token = await generateOTP(email);
      sendOTP(email, token);
      return response.status(200).send({status:"success"});
    } else {
      return response
        .status(409)
        .json({ status: "error", message: "Account existed." });
    }
  }
  async confirmOTP(request: Request, response: Response) {
    const { email, otp } = request.body;    
    if (await UserModel.getOTP(email, otp)) {
      return response
        .status(200)
        .json({ status: "success", message: "Valid OTP.", key: await generateToken({email:email,status:"accept"},"5d") });
    }
    return response
      .status(404)
      .json({ status: "error", message: "Invalid OTP." });
  }
  async addOrUpdate(request: Request, response: Response) {
    const { email, password, role, name } = request.body;
    const data = { "email": email, "password": password, "role": role, "name": name };
    const token = await generateToken(data);
    const hashedPassword = hashPassword(password);
    await UserModel.createOrUpdateUser(
      email,
      hashedPassword,
      role,
      name,
      token
    ).then(() => {
      return response.status(201).json({status:'success', messages:"Success"})
    }).catch(() => {
            return response
              .status(400)
              .json({ status: "fail", messages: "Fail" });

    });
  }
  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    const account = await UserModel.login(email, password);
    if (account) {
      const token = expToken(account.token)
        ? account.token
        : await generateToken(account);
      if (account.token !== token) {
        await UserModel.updateToken(account.id, token);
      }
      return response.status(200).json({ _token: token });
    }
    return response.status(404).json({status:"error",message:"Account does not exist."})
  }
  async getUser(request: Request, response: Response, next: NextFunction) {}
}
export default new UserController();
