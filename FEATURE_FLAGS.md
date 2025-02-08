# Feature Flag Middleware - Instruksjon

Dette middlewaret lar deg aktivere og deaktivere funksjoner i en Express-applikasjon uten å endre koden eller restarte serveren.


____________________________________________________________________________________________________________________________________
# Bruk

Se alle feature flags
-----------------------------------
curl http://localhost:8000/features
-----------------------------------

Hvis ingen flagg er satt, får du:
-------
{}
--------

_____________________________________________________________________________________________________________________________________
# Aktivere en feature

-------------------------------------------------------
curl -X POST http://localhost:8000/features \
     -H "Content-Type: application/json" \
     -d '{"feature": "newFeature", "enabled": true}'
-------------------------------------------------------

Forventet respons:
-------------------------------------------------------
{ "message": "Feature 'newFeature' er nå aktivert." }
-------------------------------------------------------

___________________________________________________________________________________________________________________________________
# Deaktivere en feature

----------------------------------------------------------
curl -X POST http://localhost:8000/features \
     -H "Content-Type: application/json" \
     -d '{"feature": "newFeature", "enabled": false}'
--------------------------------------------------------

Forventet respons:
--------------------------------------------------------
{ "message": "Feature 'newFeature' er nå deaktivert." }
-------------------------------------------------------

___________________________________________________________________________________________________________________________________
# Teste feature flag-middleware

Legg til denne route i server.mjs:
-------------------------------------------------------------------------------
app.get("/new-feature", featureFlagMiddleware("newFeature"), (req, res) => {
    if (req.featureEnabled) {
        res.send("Den nye funksjonen er aktiv!");
    } else {
        res.status(403).send("Denne funksjonen er ikke tilgjengelig ennå.");
    }
});
-------------------------------------------------------------------------------

Test med:
----------------------------------------
curl http://localhost:8000/new-feature
---------------------------------------

Hvis aktivert (true):
----------------------------
Den nye funksjonen er aktiv!
----------------------------

Hvis deaktivert (false):
-------------------------------------------
Denne funksjonen er ikke tilgjengelig ennå.
-------------------------------------------



