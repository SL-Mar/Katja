#!/usr/bin/env bash
# launch.sh – Start Katja Full Stack (Frontend + Backend)
# ────────────────────────────────────────────────────────────────

BASE="$HOME/projects"
ROOT="$BASE/katja"
FRONTEND_DIR="$ROOT/frontend"
BACKEND_DIR="$ROOT/backend"
VENV_DIR="$BACKEND_DIR/venv"

# ────────────────────────────────────────────────────────────────

# 1) Launch Frontend (Next.js) in terminal
gnome-terminal \
  --title="Katja Frontend" \
  -- bash -ic "\
    cd \"$FRONTEND_DIR\" && \
    npm install && \
    npm run dev || (echo '❌ Frontend crashed. Press Enter to exit.'; read)"

# 2) Launch Backend (FastAPI) in terminal
gnome-terminal \
  --title="Katja Backend" \
  -- bash -ic "\
    cd \"$BACKEND_DIR\" && \
    source \"$VENV_DIR/bin/activate\" && \
    pip install -r requirements.txt && \
    uvicorn main:app --reload || (echo '❌ Backend crashed. Press Enter to exit.'; read)"

# 3) Open app and docs in browser
( sleep 2 && xdg-open http://localhost:3000 ) &
( sleep 2 && xdg-open http://localhost:8000/docs ) &
