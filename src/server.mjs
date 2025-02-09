import express from "express";
import path from "path";
import deckRoutes from "./routes/deckRoutes.mjs";
import miscRoutes from "./routes/miscRoutes.mjs";
import errorHandler from "./middlewares/errorHandler.mjs";
import { featureFlagMiddleware, featureFlagRoutes } from "./middlewares/featureFlags.mjs";
import log from "./modules/log.mjs";

const server = express();  
const port = process.env.PORT || 8000;

// Middleware
server.use(express.json());
server.use(log);  
server.use(express.static("public"));


// Routes
server.use("/api/decks", deckRoutes);
server.use("/api/misc", miscRoutes);
featureFlagRoutes(server); // Updated to match new naming

// Example route using feature flag middleware
server.get("/new-feature", featureFlagMiddleware("newFeature"), (req, res) => {
    if (req.featureEnabled) {
        res.send("Den nye funksjonen er aktiv!");
    } else {
        res.status(403).send("Denne funksjonen er ikke tilgjengelig ennå.");
    }
});

// Global error handling middleware
server.use(errorHandler);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

