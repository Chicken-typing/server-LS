import express from "express";
import  user_route from "./userRoute";
const router = express.Router();
router.get("/", function (request, response) {
  response.send("Welcome to LifeSport api.");
});
router.use("/users", user_route);
// router.use("/products",product_route)
export default router;
