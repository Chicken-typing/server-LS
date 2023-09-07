import executeDBScript from "../config/database";
import User from "../interface/user";
import { hashPassword, compareHashPassword } from "../utils/hashPassword";
class UserModel {
  async login(email: string, password: string) {
    try {
      const q = `SELECT id,email,password,name,role,token
      FROM users
      WHERE email ='${email}' 
       LIMIT 1`;
      const result = <User>await executeDBScript(q).then((res) => {        
        if (compareHashPassword(password, res[0].password)) {
          return res[0];
        } else {
          throw new Error("Email and Password are not match.")
        }
      })
      return result;
    } catch (err) {
      console.error("Error in checking if a user exists", err);
    }
  }
  async updateToken(id: string | number, token: string) {
    const q = `UPDATE users SET token='${token}' WHERE id='${id}'`;
    console.log(q);
    
    return await executeDBScript(q)
      .then(() => {
        console.log("Update token successfully.");
        return true;
      })
      .catch((error) => {
        console.log("Update fail.", error);
        return true;
      });
  }
  async createOrUpdateUser(id:string,email: string, password: string, role: string="customer", name: string, token: string) {
    
    const q = `INSERT INTO users(id,email, password,role, name,token)
    VALUES('${id}','${email}', '${password}','${role}', '${name}','${token}')
    ON CONFLICT(email) DO UPDATE
    SET  token = EXCLUDED.token, password= EXCLUDED.password, updated_at = NOW()`;

    const result = await executeDBScript(q)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new Error("Error in getting the user: ", error);
      });
    return result;
  }
  async getUserInformations(id: string) {
    try {
      const q = ` SELECT * FROM user_informations WHERE user_id ='${id}'`;
      console.log(q);
      
      const result = await executeDBScript(q)
        .then((res) => {
          return res;
        })
        .catch(() => {
          return "Invalid user.";
        });
      return result;
    } catch (err) {
      console.log("Error in getting the user: ", err);
    }
  }
  async isExistUser(email: string) {
    try {
      const q = `SELECT EXISTS(
        SELECT *
        FROM users
        WHERE email ='${email}' 
        )`;
      const result = await executeDBScript(q).then((res) => {
        return res[0].exists;
      });
      return result;
    } catch (err) {
      console.error("Error in checking if a user exists", err);
    }
  }
  async getOTP(email: string, otp: number) {
    try {
      const q = `SELECT EXISTS(
        SELECT *
        FROM users_otp
        WHERE email ='${email}'
        AND otp = '${otp}'
        )`;
      const result = await executeDBScript(q).then((res) => {
        return res;
      });
      return result;
    } catch (err) {
      console.error("Error in checking if a user exists", err);
    }
  }
}
export default new UserModel();
