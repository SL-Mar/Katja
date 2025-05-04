# backend/core/memory.py
from typing import Dict, List

# Simple in‐process store; for production swap out for Redis/DB
_conversations: Dict[str, List[dict]] = {}

def get_history(session_id: str) -> List[dict]:
    return _conversations.setdefault(session_id, [])

def append_message(session_id: str, message: dict):
    history = _conversations.setdefault(session_id, [])
    history.append(message)
