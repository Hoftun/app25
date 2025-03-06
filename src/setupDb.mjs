import pool from "./db.mjs";

const createTables = async () => {
  const client = await pool.connect();
  try {
    console.log("Creating tables...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS pomodoro_sessions (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        focus_time INT NOT NULL,
        break_time INT NOT NULL,
        session_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Pomodoro history table created successfully!");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    client.release();
  }
};

createTables();
