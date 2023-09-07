import express from "express";
import  user_route from "./user";
import authAccess from "../middlewares/authAccess";
const router = express.Router();
router.get("/",authAccess, function (request, response) {
  response.send("Welcome to LifeTravel api.");
});
router.use("/users",authAccess, user_route);
// router.use("/products",product_route)
export default router;
