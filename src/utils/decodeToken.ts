import * as jwt from "jsonwebtoken";
const decodeToken = async (token: string)=> {
  const data = await Promise.resolve(jwt.verify(
    token,
    <jwt.Secret>process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) {
        return {
          status: false,
          error: <jwt.JwtPayload>err,
        };
      } else {``
        return {
          status: true,
          decoded: <jwt.JwtPayload>decoded
        };
      }
    }
  ));
  return data as unknown as jwt.JwtPayload;
};
export default decodeToken;
