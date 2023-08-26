import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const mode = process.env.MODE_ENV;
let poolConfig:object;
if (mode == "live") {
  const { DATABASE_URL } = process.env;
  poolConfig = {
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  poolConfig = {
    user: "Kreal244",
    host: "localhost",
    database: "life-travel",
    password: "2404",
    port: 5432,
  };
}
const pool = new Pool(poolConfig);
async function executeDBScript(text: string) {
  const client = await pool.connect();
  try {
    const res = await client.query(text);
    return res.rows;
  } catch {
    throw new Error("Can not access databse.");
  } finally {
    client.release();
  }
}
export default executeDBScript;
