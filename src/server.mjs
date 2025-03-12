import express from "express";
import path from "path";
import errorHandler from "./middlewares/errorHandler.mjs";
import { featureFlagMiddleware, featureFlagRoutes } from "./middlewares/featureFlags.mjs";
import log from "./modules/log.mjs";
import { LOGG_LEVELS, eventLogger} from "./modules/log.mjs";
import pomodoroRouters from "./routes/pomodoroRoutes.mjs";

const ENABLE_LOGGING = false; 

const server = express();  
const port = process.env.PORT || 8000;

const logger = log(LOGG_LEVELS.VERBOSE); 


server.use(express.json());
server.use(logger);  
server.use(express.static("public"));

server.use("/api/pomodoro", pomodoroRouters);


featureFlagRoutes(server); 

// Example route using feature flag middleware
server.get("/new-feature", featureFlagMiddleware("newFeature"), (req, res) => {
    if (req.featureEnabled) {
        res.send("Den nye funksjonen er aktiv!");
    } else {
        res.status(403).send("Denne funksjonen er ikke tilgjengelig ennå.");
    }
});


server.use(errorHandler);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

