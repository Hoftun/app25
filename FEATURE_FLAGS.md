# Feature Flag Middleware - Instructions

In this project, we use **feature flags** to dynamically enable or disable specific features without needing to deploy new code or restart the server.

In this case, the feature flag controls the **visibility of the history sidebar**.

____________________________________________________________________________________________________________________________________
# Usage

## View all feature flags
-----------------------------------
curl https://app25.onrender.com/api/features
-----------------------------------

If no flags are set, you will receive:
-------
{}
--------

_____________________________________________________________________________________________________________________________________
# Enable the History Sidebar
To **enable** the **history sidebar** feature, use the following command:
-------------------------------------------------------
curl -X POST https://app25.onrender.com/api/features \
     -H "Content-Type: application/json" \
     -d '{"feature": "showHistorySidebar", "enabled": true}'
-------------------------------------------------------

Expected response:
-------------------------------------------------------
{ "message": "Feature 'showHistorySidebar' is now enabled." }
-------------------------------------------------------

___________________________________________________________________________________________________________________________________
# Disable the History Sidebar
To **disable** the **history sidebar** feature, use the following command:
----------------------------------------------------------
curl -X POST https://app25.onrender.com/api/features \
     -H "Content-Type: application/json" \
     -d '{"feature": "showHistorySidebar", "enabled": false}'
--------------------------------------------------------

Expected response:
--------------------------------------------------------
{ "message": "Feature 'showHistorySidebar' is now disabled." }
-------------------------------------------------------

___________________________________________________________________________________________________________________________________
# Test the History Sidebar Feature Flag
## Backend Setup (already set in your app):
The **history sidebar** feature flag is used in your app to toggle the visibility of the sidebar. It is connected with the following **feature flag middleware**:
-------------------------------------------------------------------------------
app.get("/new-feature", featureFlagMiddleware("showHistorySidebar"), (req, res) => {
    if (req.featureEnabled) {
        res.send("The history sidebar is visible!");
    } else {
        res.status(403).send("This feature is not available yet.");
    }
});
-------------------------------------------------------------------------------

## Testing the Feature Flag:

1. **Enable the sidebar:**
    Use the curl command provided to enable the sidebar feature.
2. **Disable the sidebar:**
    Use the curl command to disable the sidebar feature.
___________________________________________________________________________________________________________________________________
# Notes:
    -The showHistorySidebar feature flag controls the visibility of the history sidebar.
    -If enabled, the sidebar will be visible when the user clicks the History button.
    -If disabled, the sidebar will be hidden or will show a message that the feature is disabled.

___________________________________________________________________________________________________________________________________
## Final Notes:
This approach allows you to **toggle** the sidebar's visibility dynamically using feature flags. The commands and steps above help you manage this feature both on Render and locally.




