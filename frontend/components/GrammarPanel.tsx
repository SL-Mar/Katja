// frontend/components/GrammarPanel.tsx
import { CorrectionRecord } from "../types/message";
import { LANGUAGES } from "../utils/languages";

interface GrammarPanelProps {
  corrections: CorrectionRecord[];
  language: string;
}

export default function GrammarPanel({
  corrections,
  language,
}: GrammarPanelProps) {
  const langMeta = LANGUAGES.find((l) => l.code === language)!;

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-gray-900 text-gray-100">
      {corrections.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 italic p-6">
          {langMeta.emptyGrammarText}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {corrections.map((c, i) => (
            <div key={i} className="space-y-2 border-b border-gray-700 pb-4">
              <div className="text-sm text-gray-400">{c.timestamp}</div>
              <div>
                <h3 className="font-semibold text-lg">
                  {langMeta.label} – Izvirnik:
                </h3>
                <p className="bg-gray-800 p-2 rounded">{c.original}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {langMeta.label} – Popravljeno:
                </h3>
                <p className="bg-gray-800 p-2 rounded">{c.corrected}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {langMeta.label} – Razlaga:
                </h3>
                <p className="whitespace-pre-wrap">{c.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
