import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";  
import path from "path";
import session from "express-session";
import pg from "pg";
import pgSession from "connect-pg-simple";
import errorHandler from "./middlewares/errorHandler.mjs";
import log from "./modules/log.mjs";
import { LOGG_LEVELS, eventLogger } from "./modules/log.mjs";
import pomodoroRouters from "./routes/pomodoroRoutes.mjs";
import { loadFeatureFlags, saveFeatureFlags, featureFlagMiddleware, featureFlagRoutes } from "./middlewares/featureFlags.mjs";

const ENABLE_LOGGING = false;
const server = express();
const port = process.env.PORT || 8000;

const logger = log(LOGG_LEVELS.VERBOSE);

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
});


const allowedOrigins = ["http://localhost:8000", "https://app25.onrender.com"];
server.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

server.options("*", cors());

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
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);

server.use(express.json());
server.use(logger);
server.use(featureFlagMiddleware); 

server.use(express.static(path.join(process.cwd(), "public")));

server.use((req, res, next) => {
  console.log("Session Data:", req.session);
  next();
});

featureFlagRoutes(server);

server.use("/api/pomodoro", pomodoroRouters);

server.get("/api/features", (req, res) => {
  res.json(loadFeatureFlags());
});

server.post("/api/features", (req, res) => {
  const { feature, enabled } = req.body;
  if (typeof enabled !== "boolean") {
    return res.status(400).json({ error: "Enabled must be true or false" });
  }

  const featureFlags = loadFeatureFlags(); 
  featureFlags[feature] = enabled;
  saveFeatureFlags(featureFlags); 
  res.json({ message: `Feature '${feature}' is now ${enabled ? "enabled" : "disabled"}.` });
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
