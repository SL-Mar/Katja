// frontend/components/Header.tsx
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  onClear: () => void;
  onSave: () => void;
}

export default function Header({ onClear, onSave }: HeaderProps) {
  return (
    <header className="relative bg-gray-800 text-gray-100 px-6 py-4 border-b border-gray-700">
      {/* Logo (absolute‐positioned on the left, now 3× larger) */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
        <Image
          src="/IconKatja.png"
          alt="Katja Logo"
          width={144}
          height={144}
        />
      </div>

      {/* Centered Title */}
      <h1 className="text-4xl font-extrabold text-center">Katja v1.0</h1>

      {/* Centered Subtitle */}
      <p className="mt-1 text-center text-sm text-gray-400">
        Chat with Katja, Check the Grammar
      </p>

      {/* Centered Action Buttons */}
      <div className="mt-4 flex justify-center space-x-3">
        <button
          onClick={onClear}
          className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white text-sm"
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Clear Chat
        </button>
        <button
          onClick={onSave}
          className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white text-sm"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Save Grammar
        </button>
      </div>
    </header>
  );
}
