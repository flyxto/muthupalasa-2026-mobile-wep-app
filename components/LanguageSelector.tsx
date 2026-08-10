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
    { code: 'en', nativeName: 'English', label: 'English' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-6 px-4 py-4 animate-in fade-in duration-500">
      {/* Header Title */}
      <div className="text-center w-full">
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 drop-shadow-[0_4px_15px_rgba(212,175,55,0.3)] mb-1">
          {t.selectLanguageTitle}
        </h1>
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto mt-2">
          <div className="h-px bg-gold-600/40 flex-1"></div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-500/80">
            Muthupalasa 2026
          </span>
          <div className="h-px bg-gold-600/40 flex-1"></div>
        </div>
      </div>

      {/* Selectable Language Option Cards */}
      <div className="w-full space-y-3">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLanguage(lang.code)}
              className={`w-full h-13 flex items-center justify-between px-6 rounded-full transition-all cursor-pointer backdrop-blur-md ${
                isSelected
                  ? 'bg-gold-500/15 border-2 border-gold-400 text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]'
                  : 'bg-navy-900/80 border border-gold-500/40 text-gold-400 hover:border-gold-400/80 hover:bg-navy-900/95'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-wide">{lang.nativeName}</span>
                <span className={`text-xs font-semibold ${isSelected ? 'text-gold-400/90' : 'text-gold-500/60'}`}>
                  ({lang.label})
                </span>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md'
                    : 'border border-gold-600/50 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Primary CTA Continue Button */}
      <button
        type="button"
        onClick={onProceed}
        className="golden-btn w-full text-xs h-12 flex items-center justify-center gap-2 mt-2"
      >
        <span>{t.proceed}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
