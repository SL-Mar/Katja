// frontend/utils/api.ts
import { v4 as uuidv4 } from "uuid";
import { ChatResponse } from "../types/message";

const BACKEND_URL = "http://localhost:8000/katja/chat";

// generate once per session
const sessionId = uuidv4();

export async function sendChat(
  text: string,
  language: string
): Promise<ChatResponse> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      language,
      text,
    }),
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json() as Promise<ChatResponse>;
}
