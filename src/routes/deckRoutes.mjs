import express from "express";
import { createDeck, shuffleDeck, getDeck, drawCard } from "../controllers/deckController.mjs";

const router = express.Router();

router.post("/", createDeck);
router.patch("/shuffle/:deck_id", shuffleDeck);
router.get("/:deck_id", getDeck);
router.get("/:deck_id/card", drawCard);

export default router;
