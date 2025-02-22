import express from "express";
import {
    getSessions,
    getSession,
    createNewSession,
    updateExistingSession,
    deleteExistingSession
} from "../controllers/pomodoroController.mjs";

const router = express.Router();

router.get("/", getSessions);
router.get("/:id", getSession);
router.post("/", createNewSession);
router.put("/:id", updateExistingSession);
router.delete("/:id", deleteExistingSession);

export default router;
