import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); 

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set! Check your environment variables.");
}

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false 
  }
});

export default pool;

