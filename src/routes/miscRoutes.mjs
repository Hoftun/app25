import express from "express";
import { getPoem, getQuote, sumNumbers } from "../controllers/miscController.mjs";

const router = express.Router();

router.get("/poem", getPoem);
router.get("/quote", getQuote);
router.post("/sum/:a/:b", sumNumbers);

export default router;
