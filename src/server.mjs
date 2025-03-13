import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import session from "express-session";
import pg from "pg";
import pgSession from "connect-pg-simple";
import errorHandler from "./middlewares/errorHandler.mjs";
import { featureFlagMiddleware, featureFlagRoutes } from "./middlewares/featureFlags.mjs";
import log from "./modules/log.mjs";
import { LOGG_LEVELS, eventLogger } from "./modules/log.mjs";
import pomodoroRouters from "./routes/pomodoroRoutes.mjs";

const ENABLE_LOGGING = false;
const server = express();
const port = process.env.PORT || 8000;

const logger = log(LOGG_LEVELS.VERBOSE);


const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Render PostgreSQL
});


const PgSessionStore = pgSession(session);
server.use(
  session({
    store: new PgSessionStore({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET || "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

server.use(express.json());
server.use(logger);


server.use(express.static(path.join(process.cwd(), "public")));

server.use((req, res, next) => {
  console.log("Session Data:", req.session);
  next();
});


server.use("/api/pomodoro", pomodoroRouters);


featureFlagRoutes(server);


server.get("/new-feature", featureFlagMiddleware("newFeature"), (req, res) => {
  if (req.featureEnabled) {
    res.send("Den nye funksjonen er aktiv!");
  } else {
    res.status(403).send("Denne funksjonen er ikke tilgjengelig ennå.");
  }
});


server.get("/session-test", (req, res) => {
  if (!req.session.views) req.session.views = 1;
  else req.session.views++;

  res.send(`Session views: ${req.session.views}`);
});


server.use(errorHandler);


server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
