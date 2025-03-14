import {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  getSessionsByUserForToday,
  getUserLifetimeStats
} from "../models/pomodoroModel.mjs";

export const getSessions = async (req, res) => {
  try {
    const sessions = await getAllSessions();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Error fetching Pomodoro sessions" });
  }
};

export const getSession = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await getSessionById(id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Error fetching Pomodoro session" });
  }
};

export const getTodaySessions = async (req, res) => {
  const { user_id } = req.params;
  try {
    const sessions = await getSessionsByUserForToday(user_id);
    res.json(sessions || []);
  } catch (err) {
    res.status(500).json({ error: "Error fetching today's sessions" });
  }
};

export const getLifetimeStats = async (req, res) => {
  const { user_id } = req.params;
  try {
    const stats = await getUserLifetimeStats(user_id);
    res.json(stats || { total_sessions: 0, total_minutes: 0 });
  } catch (err) {
    res.status(500).json({ error: "Error fetching lifetime stats" });
  }
};

export const createNewSession = async (req, res) => {
  const { user_id, focus_time } = req.body;

  try {
  
    const totalMinutes = Math.floor(focus_time / 60);

    const newSession = await createSession(user_id, focus_time, totalMinutes);
    res.status(201).json(newSession);
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).json({ error: "Error creating Pomodoro session" });
  }
};

export const updateExistingSession = async (req, res) => {
  const { id } = req.params;
  const { focus_time } = req.body;

  try {
    const session = await updateSession(id, focus_time);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Error updating Pomodoro session" });
  }
};

export const deleteExistingSession = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteSession(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error deleting Pomodoro session" });
  }
};

