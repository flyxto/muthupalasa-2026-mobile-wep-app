'use client';

import React from 'react';
import { Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { Check, ArrowRight } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onProceed: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onProceed,
}) => {
  const t = translations[selectedLanguage];

  const languages: { code: Language; nativeName: string; label: string }[] = [
    { code: 'si', nativeName: 'සිංහල', label: 'Sinhala' },
    { code: 'ta', nativeName: 'தமிழ்', label: 'Tamil' },
    { code: 'en', nativeName: 'English', label: 'English' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-6 px-4 py-4 animate-fadeIn">
      {/* Title */}
      <h1 className="text-2xl font-bold text-white tracking-tight text-center">
        {t.selectLanguageTitle}
      </h1>

      {/* 3 Selectable Buttons (rounded-full & uniform h-12 height) */}
      <div className="w-full space-y-3">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLanguage(lang.code)}
              className={`w-full h-12 flex items-center justify-between px-6 rounded-full border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-sky-500/15 border-sky-400 text-white shadow-lg shadow-sky-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{lang.nativeName}</span>
                <span className="text-xs text-slate-400">({lang.label})</span>
              </div>

              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-sky-400 text-slate-950 shadow-md'
                    : 'border border-slate-700 text-transparent'
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Continue Button (rounded-full & uniform h-12 height) */}
      <button
        type="button"
        onClick={onProceed}
        className="w-full h-12 px-6 rounded-full font-bold text-base text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 shadow-lg shadow-sky-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
      >
        <span>{t.proceed}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
