'use client';

import React, { useState } from 'react';
import { UserProfile, Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { User, Lock, Phone, Edit3, Check, Globe } from 'lucide-react';

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
    onUpdatePhoneNumber(e.target.value);
    if (errorMsg) setErrorMsg(null);
  };

  const handleConfirmClick = () => {
    const cleanPhone = user.phoneNumber.trim().replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMsg(t.phoneRequiredErr);
      return;
    }
    setErrorMsg(null);
    onConfirm();
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-3 px-4 py-1 animate-fadeIn">
      {/* Header & Language switcher */}
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">
          {t.userDetailsTitle}
        </h2>
        <button
          type="button"
          onClick={onChangeLanguageClick}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-sky-400 font-medium hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language.toUpperCase()}</span>
        </button>
      </div>

      {/* Main Details Card */}
      <div className="w-full rounded-3xl bg-slate-900/80 border border-slate-800 p-4 space-y-3 shadow-2xl flex flex-col items-center text-center">
        {/* HUGE USER AVATAR / PHOTO */}
        <div className="relative">
          <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-4 border-sky-400/60 bg-slate-950 shadow-2xl shadow-sky-500/20 flex items-center justify-center">
            {user.photo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-24 h-24 text-slate-400" />
            )}
          </div>
        </div>

        {/* User Information */}
        <div className="w-full space-y-0.5">
          <h3 className="text-xl font-bold text-white tracking-tight truncate">{user.name}</h3>
          <p className="text-xs text-slate-400 truncate font-medium">{user.outletName}</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-sky-400 mt-1">
            <span>{user.code}</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-0.5">
              <Lock className="w-2.5 h-2.5" />
              {t.readOnlyBadge}
            </span>
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="w-full space-y-1 text-left pt-2 border-t border-slate-800/80">
          <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.phoneNumber}</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-xs font-medium text-slate-400 pointer-events-none">
              +94
            </span>
            <input
              type="tel"
              value={user.phoneNumber}
              onChange={handlePhoneChange}
              placeholder={t.enterPhonePlaceholder}
              className={`w-full pl-14 pr-4 h-12 bg-slate-950 rounded-full border text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                errorMsg
                  ? 'border-rose-500'
                  : 'border-slate-800 focus:border-sky-400'
              }`}
            />
          </div>
          {errorMsg && (
            <p className="text-xs text-rose-400 font-medium px-2">{errorMsg}</p>
          )}
        </div>
      </div>

      {/* Buttons (rounded-full & uniform h-12 height) */}
      <div className="w-full space-y-2">
        <button
          type="button"
          onClick={handleConfirmClick}
          className="w-full h-12 px-5 rounded-full font-bold text-base text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-5 h-5 stroke-[3]" />
          <span>{t.confirmButton}</span>
        </button>

        <button
          type="button"
          onClick={onEditDetailsClick}
          className="w-full h-12 px-5 rounded-full border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Edit3 className="w-4 h-4" />
          <span>{t.editDetailsButton}</span>
        </button>
      </div>
    </div>
  );
};
