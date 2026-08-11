'use client';

import React from 'react';
import { Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { PhoneCall, X, ShieldAlert, MessageCircle } from 'lucide-react';

interface EmergencyContactModalProps {
  language: Language;
  onClose: () => void;
}

const EMERGENCY_NUMBERS = [
  { label: 'Hotline 1', number: '0786765115', display: '078 676 5115' },
  { label: 'Hotline 2', number: '0786738624', display: '078 673 8624' },
];

const WHATSAPP_CONTACT = {
  label: 'Official WhatsApp Helpdesk',
  number: '94752687114',
  display: '075 268 7114',
};

export const EmergencyContactModal: React.FC<EmergencyContactModalProps> = ({
  language,
  onClose,
}) => {
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-navy-900 border-2 border-gold-500/60 rounded-3xl p-5 shadow-[0_0_50px_rgba(212,175,55,0.3)] relative text-gold-400 space-y-4">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gold-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-navy-950 border border-gold-500/50 flex items-center justify-center text-gold-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">{t.emergencyModalTitle}</h3>
              <p className="text-[11px] text-gold-400/80">{t.emergencyModalSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gold-500/70 hover:text-gold-400 transition-colors rounded-full hover:bg-gold-500/10 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Phone Hotline Numbers */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-gold-500 uppercase tracking-wider">Direct Phone Lines</p>
          {EMERGENCY_NUMBERS.map((item, idx) => (
            <a
              key={idx}
              href={`tel:${item.number}`}
              className="flex items-center justify-between p-3 rounded-2xl bg-navy-950/80 border border-gold-600/30 hover:border-gold-400 hover:bg-navy-950 transition-all cursor-pointer group"
            >
              <div>
                <p className="text-[10px] text-gold-400/70 font-semibold uppercase">{item.label}</p>
                <p className="text-sm font-bold text-white font-mono">{item.display}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 group-hover:bg-gold-500 group-hover:text-navy-950 text-gold-400 flex items-center justify-center transition-all">
                <PhoneCall className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

        {/* WhatsApp Support Number */}
        <div className="space-y-2 pt-1">
          <p className="text-[11px] font-bold text-gold-500 uppercase tracking-wider">WhatsApp Instant Support</p>
          <a
            href={`https://wa.me/${WHATSAPP_CONTACT.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-2xl bg-navy-950/80 border border-gold-600/40 hover:border-gold-400 hover:bg-navy-950 transition-all cursor-pointer group"
          >
            <div>
              <p className="text-[10px] text-gold-400/70 font-semibold uppercase">{WHATSAPP_CONTACT.label}</p>
              <p className="text-sm font-bold text-white font-mono">{WHATSAPP_CONTACT.display}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 group-hover:bg-gold-500 group-hover:text-navy-950 text-gold-400 flex items-center justify-center transition-all">
              <MessageCircle className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 rounded-full border border-gold-600/40 bg-navy-950 hover:bg-navy-900 text-gold-400 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            {t.cancel}
          </button>
        </div>

      </div>
    </div>
  );
};
