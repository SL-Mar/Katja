// frontend/components/InputBox.tsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface InputBoxProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  submitLabel?: string;
}

export default function InputBox({
  onSend,
  disabled = false,
  placeholder = "",
  submitLabel = "Send",
}: InputBoxProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="relative flex-1"
    >
      <textarea
        rows={3}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={placeholder}
        className="w-full pr-12 p-3 border border-gray-600 bg-gray-800 text-gray-100 rounded resize-none focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={disabled}
        title={submitLabel}
        className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-200 disabled:opacity-50 focus:outline-none"
      >
        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
      </button>
    </form>
  );
}
