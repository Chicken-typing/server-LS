import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import * as jwt from 'jsonwebtoken';
import decodeToken from '../utils/decodeToken';
import Token_Decoded from '../interface/token_decoded';
const authOTP = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
    
    const { email, key } = request.body;

  const decode = <Token_Decoded>await decodeToken(key);
  if (
    decode.status&&
    decode.decoded.email=== email &&
    decode.decoded.status === "accept"
  ) {
    next();
  } else {
    return response.status(403).send("Your OTP is expired.");
  }
};
export default authOTP;