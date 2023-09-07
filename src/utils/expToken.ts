import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import decodeToken from './decodeToken';
const expToken = (token: string) => {
    const { exp } = decodeToken(token); 
    if (moment.unix(<number>exp) > moment()) {
        return true;
    }
    return false;
}
export default expToken;