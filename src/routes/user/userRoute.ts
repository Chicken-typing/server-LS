import express from "express";
import UserController from '../../controller/UserController';
import register from "./register";
const user_route = express.Router()
// user_route.get("/", UserController.getUser);
user_route.post("/login", UserController.login);
user_route.use('/register',register)
export default user_route;