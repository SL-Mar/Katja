// frontend/components/ChatWindow.tsx
import { Message } from "../types/message";
import { LANGUAGES } from "../utils/languages";

interface ChatWindowProps {
  messages: Message[];
  language: string;
}

export default function ChatWindow({ messages, language }: ChatWindowProps) {
  const langMeta = LANGUAGES.find((l) => l.code === language)!;

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-gray-800">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 italic p-4">
          {langMeta.emptyChatText}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={i}
                className={`flex items-end ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl whitespace-pre-wrap break-words ${
                    isUser
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-700 text-gray-100 rounded-bl-none"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <p>{msg.content}</p>
                    <span className="ml-2 text-xs text-gray-400">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
