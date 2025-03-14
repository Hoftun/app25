import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FEATURE_FLAGS_FILE = path.join(__dirname, '../config/featureFlags.json');

function loadFeatureFlags() {
    if (!fs.existsSync(FEATURE_FLAGS_FILE)) {
        const defaultFlags = { showHistorySidebar: true };
        fs.writeFileSync(FEATURE_FLAGS_FILE, JSON.stringify(defaultFlags, null, 2), 'utf8');
    }
    return JSON.parse(fs.readFileSync(FEATURE_FLAGS_FILE, 'utf8'));
}

function saveFeatureFlags(flags) {
    fs.writeFileSync(FEATURE_FLAGS_FILE, JSON.stringify(flags, null, 2), 'utf8');
}

export { loadFeatureFlags, saveFeatureFlags };

function featureFlagMiddleware(req, res, next) {
    req.featureFlags = loadFeatureFlags();
    next();
}

function featureFlagRoutes(app) {
    app.get('/api/features', (req, res) => {
        res.json(loadFeatureFlags());
    });

    app.post('/api/features', (req, res) => {
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

