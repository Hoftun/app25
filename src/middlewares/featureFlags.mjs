import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Filen der feature flags lagres
const FEATURE_FLAGS_FILE = path.join(__dirname, '../config/featureFlags.json');

// Hjelpefunksjon for å laste feature flags fra fil
function loadFeatureFlags() {
    if (!fs.existsSync(FEATURE_FLAGS_FILE)) {
        fs.writeFileSync(FEATURE_FLAGS_FILE, JSON.stringify({}), 'utf8');
    }
    return JSON.parse(fs.readFileSync(FEATURE_FLAGS_FILE, 'utf8'));
}

// Hjelpefunksjon for å lagre feature flags til fil
function saveFeatureFlags(flags) {
    fs.writeFileSync(FEATURE_FLAGS_FILE, JSON.stringify(flags, null, 2), 'utf8');
}

// Middleware for å sjekke om en feature er aktivert
function featureFlagMiddleware(featureName) {
    return (req, res, next) => {
        const featureFlags = loadFeatureFlags();
        req.featureEnabled = !!featureFlags[featureName];
        next();
    };
}

// API-endpoints for å hente og oppdatere feature flags
function featureFlagRoutes(app) {
    app.get('/features', (req, res) => {
        res.json(loadFeatureFlags());
    });

    app.post('/features', (req, res) => {
        const { feature, enabled } = req.body;
        if (typeof enabled !== 'boolean') {
            return res.status(400).json({ error: 'enabled må være true eller false' });
        }

        const featureFlags = loadFeatureFlags();
        featureFlags[feature] = enabled;
        saveFeatureFlags(featureFlags);

        res.json({ message: `Feature '${feature}' er nå ${enabled ? 'aktivert' : 'deaktivert'}.` });
    });
}

export { featureFlagMiddleware, featureFlagRoutes };
