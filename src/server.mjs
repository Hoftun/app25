import express from "express";
import path from "path";
import deckRoutes from "./routes/deckRoutes.mjs";
import miscRoutes from "./routes/miscRoutes.mjs";
import errorHandler from "./middlewares/errorHandler.mjs";
import { featureFlagMiddleware, featureFlagRoutes } from "./middlewares/featureFlags.mjs";

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/decks", deckRoutes);
app.use("/api/misc", miscRoutes);
featureFlagRoutes(app); // Legg til feature flag-routes

// Eksempel på bruk i en route med feature flag middleware
app.get("/new-feature", featureFlagMiddleware("newFeature"), (req, res) => {
    if (req.featureEnabled) {
        res.send("Den nye funksjonen er aktiv!");
    } else {
        res.status(403).send("Denne funksjonen er ikke tilgjengelig ennå.");
    }
});

// Global error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
