import { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserModel";
import generateToken from "../utils/generateToken";
import _ from "lodash";
import generateOTP from "../utils/generateOTP";
import sendOTP from "../utils/sendOTP";
import { hashPassword } from "../utils/hashPassword";
import decodeToken from "../utils/decodeToken";
import { Md5 } from "ts-md5";
import User_Infor from "../interface/user_infor";
import Token_Decoded from "../interface/token_decoded";
class UserController {
  async register(request: Request, response: Response) {
    const { email } = request.body;
    if (!(await UserModel.isExistUser(email))) {
      const token = await generateOTP(email);
      sendOTP(email, token);
      return response.status(200).send({ status: "success" });
    } else {
      return response
        .status(409)
        .json({ status: "error", message: "Account existed." });
    }
  }
  async forgot(request: Request, response: Response) {
    const { email } = request.body;
    if (await UserModel.isExistUser(email)) {
      const token = await generateOTP(email);
      sendOTP(email, token);
      return response.status(200).send({ status: "success" });
    } else {
      return response
        .status(404)
        .json({ status: "error", message: "Account did not exist." });
    }
  }
  async confirmOTP(request: Request, response: Response) {
    const { email, otp } = request.body;
    if (await UserModel.getOTP(email, otp)) {
      return response.status(200).json({
        status: "success",
        message: "Valid OTP.",
        key: await generateToken({ email: email, status: "accept" }, "5m"),
      });
    }
    return response
      .status(404)
      .json({ status: "error", message: "Invalid OTP." });
  }
  async addOrUpdate(request: Request, response: Response) {
    const { email, password, role, name } = request.body;
    const id = Md5.hashAsciiStr(email);
    const data = { id:id,email: email, password: password, role: role, name: name };
    const token = await generateToken(data);
    const hashedPassword = hashPassword(password);
    await UserModel.createOrUpdateUser(id,email, hashedPassword, role, name, token)
      .then(() => {
        return response
          .status(201)
          .json({ status: "success", messages: "Success" });
      })
      .catch(() => {
        return response.status(400).json({ status: "fail", messages: "Fail" });
      });
  }
  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    const account = await UserModel.login(email, password);
    if (account) {
      const token = (<Token_Decoded> await decodeToken(account.token)).status
        ? account.token
        : await generateToken(account);
      if (account.token !== token) {
        await UserModel.updateToken(account.id, token);
      }
      return response.status(200).json({ _token: token });
    }
    return response
      .status(404)
      .json({ status: "error", message: "Account does not exist." });
  }
  async getUserInformations(
    request: Request,
    response: Response,
  ) {
    const { id } = request.params;
    await UserModel.getUserInformations(id).then(res => {
      return response.status(200).json({user_infos:res});
    });
  }
  async addOrUpdateInformations( request:Request, response:Response) {
    const user_infor = <User_Infor>request.body;
    await UserModel.addUserInfo(user_infor).then(res => {
      return  response.status(200).json({status:"success",message:"Add user information success.", user_infor:user_infor});
    })
      .catch(() => { 
         return response
           .status(500)
           .json({ status: "error", message: "Add user information fail." });
      })
  }
}
export default new UserController();
