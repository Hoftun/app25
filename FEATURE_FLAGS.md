# Feature Flag Middleware - Instructions

This middleware allows you to enable and disable features in an Express application without modifying the code or restarting the server.


____________________________________________________________________________________________________________________________________
# Usage

View all feature flags
-----------------------------------
curl http://localhost:8000/features
-----------------------------------

If no flags are set, you will receive:
-------
{}
--------

_____________________________________________________________________________________________________________________________________
# Enable a feature

-------------------------------------------------------
curl -X POST http://localhost:8000/features \
     -H "Content-Type: application/json" \
     -d '{"feature": "newFeature", "enabled": true}'
-------------------------------------------------------

Expected response:
-------------------------------------------------------
{ "message": "Feature 'newFeature' is now enabled." }
-------------------------------------------------------

___________________________________________________________________________________________________________________________________
# Disable a feature

----------------------------------------------------------
curl -X POST http://localhost:8000/features \
     -H "Content-Type: application/json" \
     -d '{"feature": "newFeature", "enabled": false}'
--------------------------------------------------------

Expected response:
--------------------------------------------------------
{ "message": "Feature 'newFeature' is now disabled." }
-------------------------------------------------------

___________________________________________________________________________________________________________________________________
# Test feature flag middleware

Add this route to server.mjs:
-------------------------------------------------------------------------------
app.get("/new-feature", featureFlagMiddleware("newFeature"), (req, res) => {
    if (req.featureEnabled) {
        res.send("The new feature is active!");
    } else {
        res.status(403).send("This feature is not available yet.");
    }
});
-------------------------------------------------------------------------------

Test with:
----------------------------------------
curl http://localhost:8000/new-feature
---------------------------------------

If enabled (true):
----------------------------
The new feature is active!
----------------------------

If disabled (false):
-------------------------------------------
This feature is not available yet.
-------------------------------------------



