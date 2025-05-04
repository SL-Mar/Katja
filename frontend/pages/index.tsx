// pages/index.tsx
import { useState } from "react";
import {
  Message,
  CorrectionRecord,
  ChatResponse,
  LanguageCode,
} from "../types/message";
import { sendChat } from "../utils/api";
import { LANGUAGES, LanguageMeta } from "../utils/languages";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";
import GrammarPanel from "../components/GrammarPanel";
import InputBox from "../components/InputBox";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [corrections, setCorrections] = useState<CorrectionRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const [languageCode, setLanguageCode] = useState<LanguageCode>(
    LANGUAGES[0].code as LanguageCode
  );
  const langMeta: LanguageMeta = LANGUAGES.find(
    (l) => l.code === languageCode
  )!;

  const now = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleSend = async (text: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, timestamp: now() },
    ]);
    setLoading(true);
    try {
      const { reply, correction }: ChatResponse = await sendChat(
        text,
        languageCode
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, timestamp: now() },
      ]);
      setCorrections((prev) => [
        ...prev,
        {
          original: text,
          corrected: correction.corrected,
          explanation: correction.explanation,
          timestamp: now(),
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setCorrections([]);
  };

  const handleSave = () => {
    const blob = new Blob([JSON.stringify(corrections, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grammar-${languageCode}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-900 text-gray-100">
      <Header onClear={handleClear} onSave={handleSave} />

      {/* Flags */}
      <div className="flex justify-center space-x-4 py-2 bg-gray-800 border-b border-gray-700">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguageCode(lang.code as LanguageCode)}
            className={`p-2 rounded-full ${
              languageCode === lang.code ? "bg-blue-600" : "bg-gray-700"
            }`}
            aria-label={lang.label}
          >
            {lang.flag}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat */}
        <div className="w-1/2 flex flex-col border-r border-gray-700 min-h-0">
          <ChatWindow messages={messages} language={languageCode} />
        </div>
        {/* Grammar */}
        <div className="w-1/2 flex flex-col min-h-0">
          <GrammarPanel corrections={corrections} language={languageCode} />
        </div>
      </div>

      {/* Input Box */}
      <div className="border-t border-gray-700 p-4 bg-gray-800 flex justify-center">
        <div className="w-full max-w-4xl">
          <InputBox
            onSend={handleSend}
            disabled={loading}
            placeholder={langMeta.placeholder}
            submitLabel={langMeta.submitLabel}
          />
        </div>
      </div>

    </div>
  );
}
