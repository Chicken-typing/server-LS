import express from "express";
import UserController from '../controller/UserController';
const user_route = express.Router()
user_route.get("/", UserController.getUser);
// user_route.post("/login",UserController.login)
export default user_route;