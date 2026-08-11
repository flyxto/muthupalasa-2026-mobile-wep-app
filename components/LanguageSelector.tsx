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
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-[2vh] px-4 py-2 animate-in fade-in duration-500">
      {/* Header Title */}
      <div className="text-center w-full space-y-1">
        <h1 className="font-title text-[clamp(1.25rem,3.5vh,2.25rem)] font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 drop-shadow-[0_4px_15px_rgba(212,175,55,0.3)]">
          {t.selectLanguageTitle}
        </h1>
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto pt-1">
          <div className="h-px bg-gold-600/40 flex-1"></div>
          {/* <span className="text-[clamp(0.6rem,1.4vh,0.75rem)] uppercase tracking-[0.25em] font-semibold text-gold-500/80">
            Muthupalasa 2026
          </span> */}
          <div className="h-px bg-gold-600/40 flex-1"></div>
        </div>
      </div>

      {/* Selectable Language Option Cards */}
      <div className="w-full space-y-[1.5vh]">
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLanguage(lang.code)}
              className={`w-full h-[6vh] max-h-13 min-h-[44px] flex items-center justify-between px-5 sm:px-6 rounded-full transition-all cursor-pointer backdrop-blur-md ${
                isSelected
                  ? 'bg-gold-500/15 border-2 border-gold-400 text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]'
                  : 'bg-navy-900/80 border border-gold-500/40 text-gold-400 hover:border-gold-400/80 hover:bg-navy-900/95'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-[clamp(0.85rem,2vh,1rem)] tracking-wide">{lang.nativeName}</span>
                <span className={`text-[clamp(0.65rem,1.5vh,0.75rem)] font-semibold ${isSelected ? 'text-gold-400/90' : 'text-gold-500/60'}`}>
                  ({lang.label})
                </span>
              </div>

              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md'
                    : 'border border-gold-600/50 text-transparent'
                }`}
              >
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Primary CTA Continue Button */}
      <button
        type="button"
        onClick={onProceed}
        className="golden-btn w-full text-[clamp(0.7rem,1.8vh,0.85rem)] h-[5.5vh] max-h-12 min-h-[40px] flex items-center justify-center gap-2 mt-1"
      >
        <span>{t.proceed}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
