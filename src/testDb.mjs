import pool from "./db.mjs";

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connection successful! Current time:", res.rows[0].now);
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
};

testConnection();

