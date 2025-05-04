from core.llm_provider import get_llm

def teacher_llm(messages: list[dict]) -> str:
    """Send messages to GPT-4o and return raw text."""
    llm = get_llm(flow="katja", agent="teacher")
    return llm(messages)
