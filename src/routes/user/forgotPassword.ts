import express from "express";
import UserController from "../../controller/UserController";
import authOTP from "../../middlewares/authOTP";
const forgot = express.Router();
forgot.post("/", UserController.forgot);
forgot.post("/confirm", UserController.confirmOTP);
forgot.post("/update", authOTP, UserController.addOrUpdate);
export default forgot;