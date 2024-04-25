TITLE "api DESA"
ECHO "API server DESA"
E:
cd api_liquid
START node --env-file=.dev.env index.js
PAUSE
