'use client';

import React from 'react';
import Image from 'next/image';
import { Language, UserProfile } from '@/types/flow';
import { translations } from '@/lib/translations';
import { getWhatsappChannelUrl } from '@/lib/whatsapp';
import { ShieldAlert, Calendar, Clock, MapPin } from 'lucide-react';

interface ThankYouViewProps {
  language: Language;
  onEmergencyContactClick: () => void;
  rawDate?: string;
  user?: UserProfile;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({
  language,
  onEmergencyContactClick,
  rawDate,
  user,
}) => {
  const t = translations[language];
  const whatsappChannelUrl = getWhatsappChannelUrl(rawDate);

  const rawDateStr = (
    user?.rawInvitation?.["DATE"] ||
    user?.rawInvitation?.["Date"] ||
    user?.rawInvitation?.eventDate ||
    user?.rawInvitation?.["EVENT DATE"] ||
    user?.rawInvitation?.["Event Date"] ||
    rawDate ||
    ''
  ).toString().trim();

  let displayDate = rawDateStr;
  const lowerDate = displayDate.toLowerCase();
  if (lowerDate.includes('17')) {
    displayDate = '17th August 2026';
  } else if (lowerDate.includes('18')) {
    displayDate = '18th August 2026';
  } else if (lowerDate.includes('19')) {
    displayDate = '19th August 2026';
  } else if (!displayDate) {
    displayDate = '17th August 2026';
  }

  const rawVenue = (
    user?.rawInvitation?.["HOTEL"] ||
    user?.rawInvitation?.["Hotel"] ||
    user?.rawInvitation?.hotel ||
    user?.rawInvitation?.venue ||
    user?.rawInvitation?.["VENUE"] ||
    'Shangri-La Hambantota'
  ).toString().trim();

  const displayVenue = rawVenue || 'Shangri-La Hambantota';

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-5 sm:gap-6 px-4 py-4 sm:py-6 text-center animate-in fade-in duration-500">
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

      {/* Thank You Header & Event Info */}
      <div className="space-y-4 w-full">
        <div className="space-y-1.5">
          <h1 className="font-title text-2xl sm:text-3xl font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)] leading-tight">
            {t.thankYouTitle}
          </h1>
        </div>

        {/* Date, Time & Venue Spaced Card */}
        <div className="bg-navy-950/85 border border-gold-500/35 rounded-2xl p-4 sm:p-5 space-y-3 w-full mx-auto text-gold-300 shadow-xl backdrop-blur-md">
          {/* Date & Time Row */}
          <div className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold tracking-wide flex-wrap">
            <div className="flex items-center gap-1.5 bg-navy-900/90 px-3 py-1.5 rounded-xl border border-gold-500/20">
              <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{displayDate}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-navy-900/90 px-3 py-1.5 rounded-xl border border-gold-500/20">
              <Clock className="w-4 h-4 text-gold-400 shrink-0" />
              <span>4.00 PM</span>
            </div>
          </div>

          {/* Venue Row */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white pt-2.5 border-t border-gold-500/20">
            <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
            <span className="tracking-wide">{displayVenue}</span>
          </div>
        </div>
      </div>

      {/* WhatsApp Channel Button with Responsive Auto-Height & Text Wrapping */}
      <div className="w-full pt-2">
        <a
          href={whatsappChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="golden-btn w-full min-h-[48px] h-12 py-2.5 px-4 flex items-center justify-center gap-3 shadow-xl transition-transform hover:scale-[1.02] text-xs sm:text-sm font-extrabold tracking-wide rounded-2xl"
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

      {/* Emergency Contact Button */}
      <div className="w-full pt-3 mt-1 border-t border-gold-500/20">
        <button
          type="button"
          onClick={onEmergencyContactClick}
          className="w-full h-10 px-4 rounded-full border border-gold-500/50 bg-navy-900/80 hover:bg-navy-900 text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 justify-center transition-all cursor-pointer shadow-sm"
        >
          <ShieldAlert className="w-4 h-4 text-gold-400" />
          <span>{t.emergencyContactButton}</span>
        </button>
      </div>
    </div>
  );
};
