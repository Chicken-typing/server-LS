import * as jwt from "jsonwebtoken"
const decodeToken = (token: string) => {
    const data = <jwt.JwtPayload>jwt.verify(token, <jwt.Secret>process.env.JWT_SECRET)
    return data;
}
export default decodeToken;