import {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession
} from "../models/pomodoroModel.mjs";

// GET all sessions
export const getSessions = (req, res) => {
  const sessions = getAllSessions();
  res.json(sessions);
};

// GET session by ID
export const getSession = (req, res) => {
  const session = getSessionById(req.params.id);
  if (!session) {
      return res.status(404).json({ error: "Session not found" });
  }
  res.json(session);
};

// POST 
export const createNewSession = (req, res) => {
  const { type, duration } = req.body;
  const newSession = createSession(type, duration);
  res.status(201).json(newSession);
};

// PUT 
export const updateExistingSession = (req, res) => {
  const session = updateSession(req.params.id);
  if (!session) {
      return res.status(404).json({ error: "Session not found" });
  }
  res.json(session);
};


export const deleteExistingSession = (req, res) => {
  deleteSession(req.params.id);
  res.status(204).send();
};
