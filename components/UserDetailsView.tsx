'use client';

import React, { useState } from 'react';
import { UserProfile, Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { User, Lock, Phone, Edit3, Check, Globe, X } from 'lucide-react';

interface UserDetailsViewProps {
  user: UserProfile;
  language: Language;
  onUpdatePhoneNumber: (phone: string) => void;
  onEditDetailsClick: () => void;
  onConfirm: () => void;
  onChangeLanguageClick: () => void;
}

export const UserDetailsView: React.FC<UserDetailsViewProps> = ({
  user,
  language,
  onUpdatePhoneNumber,
  onEditDetailsClick,
  onConfirm,
  onChangeLanguageClick,
}) => {
  const t = translations[language];
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    onUpdatePhoneNumber(value);

    if (value.length > 0) {
      if (value.length === 1 && value !== '0') {
        setErrorMsg('Phone number must start with 07');
      } else if (value.length >= 2 && !value.startsWith('07')) {
        setErrorMsg('Phone number must start with 07');
      } else {
        setErrorMsg(null);
      }
    } else {
      setErrorMsg(null);
    }
  };

  const handleConfirmClick = () => {
    const cleanPhone = user.phoneNumber.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      setErrorMsg('Phone number is required');
      return;
    }
    if (!cleanPhone.startsWith('07')) {
      setErrorMsg('Phone number must start with 07');
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMsg('Phone number must be 10 digits');
      return;
    }
    setErrorMsg(null);
    onConfirm();
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-4 px-4 py-1 animate-in fade-in duration-300">

      {/* User Photo */}
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 max-w-[85vw] rounded-3xl overflow-hidden border-4 border-gold-500/70 bg-navy-950 shadow-[0_0_35px_rgba(212,175,55,0.35)] flex items-center justify-center transition-all">
          {user.photo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-36 h-36 text-gold-600/70" />
          )}
        </div>
      </div>

      {/* User Information */}
      <div className="w-full space-y-1.5 text-center">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide truncate drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">{user.name}</h3>
        <p className="text-sm sm:text-base text-gold-400/90 truncate font-semibold uppercase tracking-widest">{user.outletName}</p>
        <div className="inline-flex items-center px-3.5 py-0.5 rounded-full bg-navy-950/90 border border-gold-600/40 text-xs font-mono text-gold-400 mt-1">
          <span>{user.code}</span>
        </div>
      </div>

      {/* Phone Number Input */}
      <div className="w-full space-y-1 text-left pt-1">
        <label className="block text-xs font-bold text-gold-500 uppercase tracking-wider flex items-center gap-1">
          <Phone className="w-3.5 h-3.5 text-gold-500" />
          <span>{t.phoneNumber}</span>
        </label>
        <div className="relative flex items-center h-12 rounded-full bg-navy-950/90 border border-gold-500/50 shadow-inner focus-within:ring-1 focus-within:ring-gold-400 transition-all px-2">
          <div className="pl-2 text-gold-600/70">
            <Phone className="w-4 h-4" />
          </div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            autoComplete="off"
            value={user.phoneNumber}
            onChange={handlePhoneChange}
            placeholder="Enter phone number (10 digits)..."
            className="w-full h-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gold-600/40 text-gold-400"
          />
          {user.phoneNumber && (
            <button
              type="button"
              onClick={() => { onUpdatePhoneNumber(''); setErrorMsg(null); }}
              className="p-1 mr-2 text-gold-600 hover:text-gold-400 transition-colors rounded-full hover:bg-gold-600/10 cursor-pointer"
              aria-label="Clear phone number"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {errorMsg && (
          <p className="text-xs text-rose-400 font-semibold px-2 animate-in fade-in duration-200">{errorMsg}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5 pt-1">
        {/* Primary CTA Confirm Button */}
        <button
          type="button"
          onClick={handleConfirmClick}
          className="golden-btn w-full text-xs h-12 flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{t.confirmButton}</span>
        </button>

        {/* Secondary Action Edit Details Button */}
        <button
          type="button"
          onClick={onEditDetailsClick}
          className="w-full h-11 px-5 rounded-full border border-gold-500/60 bg-navy-900/80 hover:bg-navy-900 hover:border-gold-400 text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <Edit3 className="w-4 h-4 text-gold-400" />
          <span>{t.editDetailsButton}</span>
        </button>
      </div>
    </div>
  );
};
