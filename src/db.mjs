import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set! Check your environment variables.");
}

// Convert `postgresql://` to `postgres://` if necessary
const connectionString = process.env.DATABASE_URL.startsWith("postgresql://")
  ? process.env.DATABASE_URL.replace("postgresql://", "postgres://")
  : process.env.DATABASE_URL;

const { Pool } = pkg;

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false } // Required for Render
});

export default pool;
