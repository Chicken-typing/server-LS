import bcrypt from 'bcrypt';
const saltRounds = 10;
const hashPassword = (password: string)=>{
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
}
const compareHashPassword = (inputPassword: string, userHashPassword: string) => {    
    const is_match = bcrypt.compareSync(inputPassword, userHashPassword);
    return is_match;
}
export {
    hashPassword,
    compareHashPassword
}