import pool from "../db.mjs";  // Import the database connection

// Get all sessions
export const getAllSessions = async () => {
  try {
    const result = await pool.query("SELECT * FROM pomodoro_sessions");
    return result.rows;
  } catch (err) {
    console.error("Error fetching sessions:", err);
    throw new Error("Error fetching Pomodoro sessions");
  }
};

// Get session by ID
export const getSessionById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM pomodoro_sessions WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    console.error("Error fetching session:", err);
    throw new Error("Error fetching Pomodoro session");
  }
};

// Create a new session (PostgreSQL version)
export const createSession = async (user_id, focus_time, break_time) => {
    try {
      // Log the data being passed to the query
      console.log("Creating session with user_id:", user_id, "focus_time:", focus_time, "break_time:", break_time);
  
      // Correct SQL query with session_date instead of season_date
      const result = await pool.query(
        "INSERT INTO pomodoro_sessions (user_id, focus_time, break_time, session_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, focus_time, break_time, new Date().toISOString()]  // Set session_date to current time
      );
  
      // Log the result to verify the created session
      console.log("Session created:", result.rows[0]);
  
      return result.rows[0];  // Return the created session
    } catch (err) {
      console.error("Error creating session:", err);
      throw new Error("Error creating Pomodoro session");
    }
  };
  
  

// Update an existing session
export const updateSession = async (id, focus_time, break_time) => {
  try {
    const result = await pool.query(
      "UPDATE pomodoro_sessions SET focus_time = $1, break_time = $2 WHERE id = $3 RETURNING *",
      [focus_time, break_time, id]
    );
    return result.rows[0];  // Return the updated session
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

