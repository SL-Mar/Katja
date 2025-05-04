from agents.teacher_agent import teacher_llm
from core.memory import get_history, append_message
import json

def extract_json_block(text: str) -> dict:
    text = text.strip()
    start = text.find('{')
    if start == -1:
        return {}
    try:
        return json.loads(text[start:])
    except json.JSONDecodeError:
        return {}

def run_teacher_flow(session_id: str, user_text: str, language: str) -> dict:
    """
    1) Load history
    2) Append the new user message
    3) Build [system_prompt] + history
    4) Call LLM
    5) Parse JSON reply (reply + correction)
    6) Append assistant message
    7) Return the parsed JSON
    """
    history = get_history(session_id)

    # Step 2: record user
    user_msg = {"role": "user", "content": user_text}
    append_message(session_id, user_msg)

    # Step 3: system prompt + full history
    system_prompt = {
        "role": "system",
        "content": f"""You are a friendly and helpful {language} teacher.

For each user message you MUST:
1) Reply conversationally (in {language}).
2) Correct the user's sentence and give a short grammar explanation.

Return ONLY this JSON shape (no extra text):
{{
  "reply": "…",
  "correction": {{
    "corrected": "…",
    "explanation": "…"
  }}
}}
"""
    }
    full_messages = [system_prompt] + history + [user_msg]

    # Step 4: call LLM
    raw = teacher_llm(full_messages)
    print("🧠 Raw LLM output:\n", raw)

    # Step 5: parse JSON
    parsed = extract_json_block(raw)
    reply = parsed.get("reply", "")
    correction = parsed.get("correction", {})

    # Step 6: record assistant
    assistant_msg = {"role": "assistant", "content": reply}
    append_message(session_id, assistant_msg)

    # Final return
    return {
        "reply": reply,
        "correction": {
            "corrected": correction.get("corrected", ""),
            "explanation": correction.get("explanation", "")
        }
    }
