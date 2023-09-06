import { NextFunction, Request, Response } from "express";

const authAccess = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.header("Access-Key") == process.env.ACCESS_SECRET) {
    next();
  } else {
    response.status(401).send("Cannot connect.");
  }
};
export default authAccess;