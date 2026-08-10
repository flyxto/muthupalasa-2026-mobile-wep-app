'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { CheckCircle2, Phone, ShieldAlert } from 'lucide-react';

interface AlreadyRegisteredViewProps {
  language: Language;
  onEmergencyContactClick: () => void;
}

export const AlreadyRegisteredView: React.FC<AlreadyRegisteredViewProps> = ({
  language,
  onEmergencyContactClick,
}) => {
  const t = translations[language];
  const whatsappChannelUrl = 'https://whatsapp.com/channel/0029VaA123456789';

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-6 px-4 py-6 text-center animate-in fade-in duration-500">
      
      {/* Success Registered Badge */}
      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.35)] animate-bounce-short">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      {/* Already Registered Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)]">
          {t.alreadyRegisteredTitle}
        </h1>
        <p className="text-xs sm:text-sm text-gold-400/90 font-medium leading-relaxed max-w-xs mx-auto">
          {t.alreadyRegisteredSubtitle}
        </p>
      </div>

      {/* WhatsApp Channel Button */}
      <div className="w-full pt-1">
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

      {/* Emergency Contact Section */}
      <div className="w-full space-y-3 pt-3 border-t border-gold-500/20">
        <div className="text-xs text-gold-400/90 font-medium flex items-center justify-center gap-1.5 flex-wrap">
          <span>{t.emergencyContactNote}</span>
          <a href="tel:0786222222" className="text-gold-400 font-bold underline font-mono flex items-center gap-1 hover:text-white transition-colors">
            <Phone className="w-3 h-3 text-gold-500" />
            <span>0786222222</span>
          </a>
        </div>

        <button
          type="button"
          onClick={onEmergencyContactClick}
          className="w-full h-10 px-4 rounded-full border border-gold-500/50 bg-navy-900/80 hover:bg-navy-900 text-gold-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 justify-center transition-all cursor-pointer shadow-sm"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-gold-400" />
          <span>{t.emergencyContactButton}</span>
        </button>
      </div>

    </div>
  );
};
