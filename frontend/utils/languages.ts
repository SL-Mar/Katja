// frontend/utils/languages.ts

export interface LanguageMeta {
  code: string;
  label: string;
  flag: string;
  placeholder: string;
  submitLabel: string;
  emptyChatText: string;      // ← new
  emptyGrammarText: string;   // ← new
}

export const LANGUAGES: LanguageMeta[] = [
  {
    code: "slovene",
    label: "Slovenščina",
    flag: "🇸🇮",
    placeholder: "Vnesi poved v slovenščini...",
    submitLabel: "Pošlji",
    emptyChatText: "Začni pogovor tukaj…",
    emptyGrammarText: "Tu bodo prikazane slovnične razlage.",
  },
  {
    code: "german",
    label: "Deutsch",
    flag: "🇩🇪",
    placeholder: "Gib einen Satz auf Deutsch ein...",
    submitLabel: "Senden",
    emptyChatText: "Beginne hier das Gespräch…",
    emptyGrammarText: "Hier werden grammatische Erklärungen angezeigt.",
  },
  {
    code: "italian",
    label: "Italiano",
    flag: "🇮🇹",
    placeholder: "Inserisci una frase in italiano...",
    submitLabel: "Invia",
    emptyChatText: "Inizia la conversazione qui…",
    emptyGrammarText: "Qui verranno mostrate le spiegazioni grammaticali.",
  },
  {
    code: "croatian",
    label: "Hrvatski",
    flag: "🇭🇷",
    placeholder: "Unesite rečenicu na hrvatskom...",
    submitLabel: "Pošalji",
    emptyChatText: "Započni razgovor ovdje…",
    emptyGrammarText: "Ovdje će biti prikazana gramatička objašnjenja.",
  },
  {
    code: "french",
    label: "Français",
    flag: "🇫🇷",
    placeholder: "Entrez une phrase en français...",
    submitLabel: "Envoyer",
    emptyChatText: "Commencez la conversation ici…",
    emptyGrammarText: "Ici seront affichées les explications grammaticales.",
  },
  {
    code: "english",
    label: "English",
    flag: "🇬🇧",
    placeholder: "Type a sentence in English...",
    submitLabel: "Send",
    emptyChatText: "Start the conversation here…",
    emptyGrammarText: "Grammar explanations will appear here.",
  },
  {
    code: "portuguese",
    label: "Português",
    flag: "🇵🇹",
    placeholder: "Digite uma frase em português...",
    submitLabel: "Enviar",
    emptyChatText: "Inicie a conversa aqui…",
    emptyGrammarText: "As explicações gramaticais aparecerão aqui.",
  },
];
