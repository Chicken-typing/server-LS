import * as jwt from 'jsonwebtoken';
import moment from 'moment';
const expToken = (token: string) => {
    const privateKey = <jwt.Secret>process.env.JWT_SECRET;
    const { exp } = <jwt.JwtPayload>jwt.verify(token, privateKey); 
    if (moment.unix(<number>exp) > moment()) {
        return true;
    }
    return false;
}
export default expToken;