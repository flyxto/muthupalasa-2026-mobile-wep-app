'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/types/flow';
import { translations } from '@/lib/translations';

interface ThankYouViewProps {
  language: Language;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({ language }) => {
  const t = translations[language];
  const whatsappChannelUrl = 'https://whatsapp.com/channel/0029VaA123456789'; // Official WhatsApp channel link

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-6 px-4 py-6 text-center animate-in fade-in duration-500">
      {/* Standalone Floating WhatsApp Icon */}
      <div className="animate-gentle-float drop-shadow-[0_0_25px_rgba(37,211,102,0.45)]">
        <Image
          src="https://thesvg.org/icons/whatsapp/default.svg"
          alt="WhatsApp"
          width={80}
          height={80}
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
      </div>

      {/* Thank You Header */}
      <div className="space-y-2">
        <h1 className="font-title text-2xl sm:text-3xl font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)]">
          {t.thankYouTitle}
        </h1>
        <p className="text-sm sm:text-base text-gold-400/90 font-medium leading-relaxed max-w-xs mx-auto">
          {t.thankYouSubtitle}
        </p>
      </div>

      {/* WhatsApp Channel Button with Responsive Auto-Height & Text Wrapping */}
      <div className="w-full pt-2">
        <a
          href={whatsappChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="golden-btn w-full min-h-[3.25rem] py-3 px-5 flex items-center justify-center gap-3 shadow-xl transition-transform hover:scale-[1.02] text-xs sm:text-sm font-extrabold tracking-wide"
        >
          <Image
            src="https://thesvg.org/icons/whatsapp/default.svg"
            alt="WhatsApp"
            width={24}
            height={24}
            className="w-6 h-6 object-contain shrink-0"
          />
          <span className="text-center leading-snug text-navy-950 whitespace-normal">
            {t.joinWhatsappButton}
          </span>
        </a>
      </div>

      {/* Emergency Contact Note */}
      <div className="pt-4 text-xs text-gold-500/80 font-medium">
        <span>Emergency Contact For Issues: </span>
        <a href="tel:0786222222" className="text-gold-400 font-bold underline font-mono">
          0786222222
        </a>
      </div>
    </div>
  );
};
