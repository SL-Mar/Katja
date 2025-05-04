from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from flows.teacher_flow import run_teacher_flow

teacher_router = APIRouter()

class ChatRequest(BaseModel):
    session_id: str          # any unique string (UUID or user ID)
    language: str            # "slovene" or "italian"
    text: str                # the new user sentence

class ChatResponse(BaseModel):
    reply: str
    correction: dict

@teacher_router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        return run_teacher_flow(req.session_id, req.text, req.language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
