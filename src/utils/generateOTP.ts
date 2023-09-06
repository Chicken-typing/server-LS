import executeDBScript from "../config/database";

const generateOTP = async (email: string) => {
  const min = 100000;
  const max = 999999;
  const opt_string = Math.floor(Math.random() * (max - min + 1) + min);
  const q = `INSERT INTO users_otp(email,otp) 
            VALUES ('${email}','${opt_string}')
            ON CONFLICT(email) DO 
            UPDATE SET otp=EXCLUDED.otp`;
  await executeDBScript(q);
  return opt_string;
};
export default generateOTP;
