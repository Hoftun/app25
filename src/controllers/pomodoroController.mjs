import {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession
} from "../models/pomodoroModel.mjs";

// GET all sessions
export const getSessions = async (req, res) => {
  try {
    const sessions = await getAllSessions();  // Call the model function
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Error fetching Pomodoro sessions" });
  }
};

// GET session by ID
export const getSession = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await getSessionById(id);  // Call the model function
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Error fetching Pomodoro session" });
  }
};

// POST (create new session)
export const createNewSession = async (req, res) => {
  const { user_id, focus_time, break_time } = req.body;

  try {
    const newSession = await createSession(user_id, focus_time, break_time);  // Call the model function
    res.status(201).json(newSession);
  } catch (err) {
    console.error('Error creating session:', err);
    res.status(500).json({ error: "Error creating Pomodoro session" });
  }
};

// PUT (update existing session)
export const updateExistingSession = async (req, res) => {
  const { id } = req.params;
  const { focus_time, break_time } = req.body;

  try {
    const session = await updateSession(id, focus_time, break_time);  // Call the model function
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Error updating Pomodoro session" });
  }
};

// DELETE (delete existing session)
export const deleteExistingSession = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteSession(id);  // Call the model function
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error deleting Pomodoro session" });
  }
};
