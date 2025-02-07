import express from "express";
import path from "path";
import deckRoutes from "./routes/deckRoutes.mjs";
import miscRoutes from "./routes/miscRoutes.mjs";
import errorHandler from "./middlewares/errorHandler.mjs";

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/decks", deckRoutes);
app.use("/api/misc", miscRoutes);

// Global error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
