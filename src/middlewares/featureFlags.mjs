import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FEATURE_FLAGS_FILE = path.join(__dirname, '../config/featureFlags.json');

function loadFeatureFlags() {
    if (!fs.existsSync(FEATURE_FLAGS_FILE)) {
        fs.writeFileSync(FEATURE_FLAGS_FILE, JSON.stringify({}), 'utf8');
    }
    return JSON.parse(fs.readFileSync(FEATURE_FLAGS_FILE, 'utf8'));
}

function saveFeatureFlags(flags) {
    fs.writeFileSync(FEATURE_FLAGS_FILE, JSON.stringify(flags, null, 2), 'utf8');
}

function featureFlagMiddleware(featureName) {
    return (req, res, next) => {
        const featureFlags = loadFeatureFlags();
        req.featureEnabled = !!featureFlags[featureName];
        next();
    };
}

function featureFlagRoutes(app) {
    app.get('/features', (req, res) => {
        res.json(loadFeatureFlags());
    });

    app.post('/features', (req, res) => {
        const { feature, enabled } = req.body;
        if (typeof enabled !== 'boolean') {
            return res.status(400).json({ error: 'Enabled must be true or false' });
        }

        const featureFlags = loadFeatureFlags();
        featureFlags[feature] = enabled;
        saveFeatureFlags(featureFlags);

        res.json({ message: `Feature '${feature}' is now ${enabled ? 'enabled' : 'disabled'}.` });
    });
}

export { featureFlagMiddleware, featureFlagRoutes };
