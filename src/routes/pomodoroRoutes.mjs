import express from "express";
import {
    getSessions,
    getSession,
    createNewSession,
    getTodaySessions,
    getLifetimeStats,
    updateExistingSession,
    deleteExistingSession
} from "../controllers/pomodoroController.mjs";

const router = express.Router();

router.get("/", getSessions);

router.get("/:id", getSession);

router.post("/", createNewSession);

router.get("/today/:user_id", getTodaySessions);

router.get("/stats/:user_id", getLifetimeStats);

router.put("/:id", updateExistingSession);

router.delete("/:id", deleteExistingSession);

export default router;

