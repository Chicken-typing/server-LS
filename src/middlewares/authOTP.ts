import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import * as jwt from 'jsonwebtoken';
const authOTP = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
    
    const { email, key } = request.body;

  const decode_key = <jwt.JwtPayload>(
    jwt.verify(key, <jwt.Secret>process.env.JWT_SECRET)
    );
  if (
    moment.unix(<number>decode_key.exp) > moment() &&
    decode_key.email === email &&
    decode_key.status === "accept"
  ) {
    next();
  } else {
    return response.status(403).send("Your OTP is expired.");
  }
};
export default authOTP;