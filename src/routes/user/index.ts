import express from "express";
import UserController from '../../controller/UserController';
import register from "./register";
import forgot from "./forgotPassword";
import authMidleware from "../../middlewares/authMidleware";
const user_route = express.Router()
user_route.post("/login", UserController.login);
user_route.use('/register', register);
user_route.use("/forgot_password",forgot)
user_route.get("/info",authMidleware, UserController.getUserInformations);
export default user_route;