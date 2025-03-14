import pool from "../db.mjs";  


export const getAllSessions = async () => {
  try {
    const result = await pool.query("SELECT * FROM pomodoro_sessions ORDER BY start_time DESC");
    return result.rows;
  } catch (err) {
    console.error("Error fetching sessions:", err);
    throw new Error("Error fetching Pomodoro sessions");
  }
};

export const getSessionById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM pomodoro_sessions WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    console.error("Error fetching session:", err);
    throw new Error("Error fetching Pomodoro session");
  }
};

export const getSessionsByUserForToday = async (user_id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM pomodoro_sessions 
       WHERE user_id = $1 AND DATE(start_time) = CURRENT_DATE
       ORDER BY start_time DESC;`,
      [user_id]
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching today's sessions:", err);
    throw new Error("Error fetching today's Pomodoro sessions");
  }
};

export const getUserLifetimeStats = async (user_id) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(id) AS total_sessions, SUM(total_minutes) AS total_minutes
       FROM pomodoro_sessions WHERE user_id = $1;`,
      [user_id]
    );
    return result.rows[0] || { total_sessions: 0, total_minutes: 0 };
  } catch (err) {
    console.error("Error fetching lifetime stats:", err);
    throw new Error("Error fetching lifetime Pomodoro stats");
  }
};

export const createSession = async (user_id, focus_time) => {
  try {
    // Convert `focus_time` to an integer
    const parsedFocusTime = Number.isInteger(focus_time) ? focus_time : parseInt(focus_time, 10);

    if (isNaN(parsedFocusTime) || parsedFocusTime <= 0) {
      throw new Error(`❌ ERROR - Invalid focus_time value: ${focus_time}`);
    }

    const totalMinutes = Math.floor(parsedFocusTime / 60); // Convert seconds to minutes

    console.log("🟢 DEBUG - Creating session with:", { user_id, parsedFocusTime, totalMinutes });

    const result = await pool.query(
      `INSERT INTO pomodoro_sessions (user_id, focus_time, start_time, end_time, total_minutes) 
       VALUES ($1, CAST($2 AS INTEGER), NOW(), NOW() + INTERVAL '1 second' * $2, $3) RETURNING *;`,
      [user_id, parsedFocusTime, totalMinutes]
    );

    return result.rows[0];
  } catch (err) {
    console.error("❌ ERROR - PostgreSQL Query Failed:", err.message);
    console.error("❌ Full PostgreSQL Error:", err);  // Print full error
    throw new Error(`Database error: ${err.message}`);
  }
};

export const updateSession = async (id, focus_time) => {
  try {
    const total_minutes = Math.floor(focus_time / 60);

    const result = await pool.query(
      `UPDATE pomodoro_sessions 
       SET focus_time = $1, total_minutes = $2 
       WHERE id = $3 RETURNING *;`,
      [focus_time, total_minutes, id]
    );

    return result.rows[0];  
  } catch (err) {
    console.error("Error updating session:", err);
    throw new Error("Error updating Pomodoro session");
  }
};

export const deleteSession = async (id) => {
  try {
    await pool.query("DELETE FROM pomodoro_sessions WHERE id = $1", [id]);
  } catch (err) {
    console.error("Error deleting session:", err);
    throw new Error("Error deleting Pomodoro session");
  }
};
