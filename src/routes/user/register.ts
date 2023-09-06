import express from 'express';
import UserController from '../../controller/UserController';
import authOTP from '../../middlewares/authOTP';
const register = express.Router();
register.post("/", UserController.register);
register.post('/confirm', UserController.confirmOTP);
register.post('/create',authOTP, UserController.addOrUpdate);
export default register;
