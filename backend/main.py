from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.teacher import teacher_router

app = FastAPI(title="Katja Chat")

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register the teacher router
app.include_router(teacher_router, prefix="/katja", tags=["Teacher"])
