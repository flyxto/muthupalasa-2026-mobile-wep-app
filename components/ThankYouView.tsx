'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { ShieldAlert } from 'lucide-react';

interface ThankYouViewProps {
  language: Language;
  onEmergencyContactClick: () => void;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({
  language,
  onEmergencyContactClick,
}) => {
  const t = translations[language];
  const whatsappChannelUrl = 'https://whatsapp.com/channel/0029VaA123456789'; // Official WhatsApp channel link

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-[2.5vh] px-4 py-3 text-center animate-in fade-in duration-500">
      {/* Standalone Floating WhatsApp Icon */}
      <div className="animate-gentle-float drop-shadow-[0_0_25px_rgba(37,211,102,0.45)]">
        <Image
          src="https://thesvg.org/icons/whatsapp/default.svg"
          alt="WhatsApp"
          width={80}
          height={80}
          className="w-[12vh] h-[12vh] max-w-20 max-h-20 min-w-12 min-h-12 object-contain"
        />
      </div>

      {/* Thank You Header */}
      <div className="space-y-1.5">
        <h1 className="font-title text-[clamp(1.2rem,3.2vh,2rem)] font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)] leading-tight">
          {t.thankYouTitle}
        </h1>
        <p className="text-[clamp(0.75rem,1.8vh,0.95rem)] text-gold-400/90 font-medium leading-relaxed max-w-xs mx-auto">
          {t.thankYouSubtitle}
        </p>
      </div>

      {/* WhatsApp Channel Button with Responsive Auto-Height & Text Wrapping */}
      <div className="w-full pt-1">
        <a
          href={whatsappChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="golden-btn w-full min-h-[44px] h-[6vh] max-h-14 py-2 px-4 flex items-center justify-center gap-2.5 shadow-xl transition-transform hover:scale-[1.02] text-[clamp(0.68rem,1.8vh,0.85rem)] font-extrabold tracking-wide"
        >
          <Image
            src="https://thesvg.org/icons/whatsapp/default.svg"
            alt="WhatsApp"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
          />
          <span className="text-center leading-snug text-navy-950 whitespace-normal">
            {t.joinWhatsappButton}
          </span>
        </a>
      </div>

      {/* Emergency Contact Button */}
      <div className="w-full pt-2 border-t border-gold-500/20">
        <button
          type="button"
          onClick={onEmergencyContactClick}
          className="w-full h-[4.8vh] max-h-10 min-h-[36px] px-4 rounded-full border border-gold-500/50 bg-navy-900/80 hover:bg-navy-900 text-gold-400 text-[clamp(0.62rem,1.5vh,0.75rem)] font-bold uppercase tracking-wider flex items-center gap-1.5 justify-center transition-all cursor-pointer shadow-sm"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-gold-400" />
          <span>{t.emergencyContactButton}</span>
        </button>
      </div>
    </div>
  );
};
