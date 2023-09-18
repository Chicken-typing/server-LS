import * as jwt from "jsonwebtoken";
export default interface Token_Decoded{
    status: boolean;
    error: jwt.JwtPayload,
    decoded: jwt.JwtPayload,

}