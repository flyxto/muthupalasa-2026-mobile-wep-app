'use client';

import React, { useState } from 'react';
import { UserProfile, Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { X, Camera, User } from 'lucide-react';

interface EditDetailsModalProps {
  user: UserProfile;
  language: Language;
  onSave: (updatedFields: Partial<UserProfile>) => void;
  onClose: () => void;
}

export const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  user,
  language,
  onSave,
  onClose,
}) => {
  const t = translations[language];

  const [photo, setPhoto] = useState(user.photo);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4 MB limit
      if (file.size > MAX_SIZE_BYTES) {
        setErrorMsg(t.imageTooLargeErr || 'Image size exceeds 4 MB. Please select a smaller photo.');
        e.target.value = '';
        return;
      }
      setErrorMsg(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 260);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onSave({
        name: user.name,
        outletName: user.outletName,
        photo: photo,
      });
    }, 260);
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md ${isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop'}`}>
      <div className={`w-full max-w-sm bg-navy-900 border border-gold-500/50 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh] ${isClosing ? 'animate-modal-card-out' : 'animate-modal-card'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gold-600/30 bg-navy-950/40 shrink-0">
          <h3 className="font-title text-base font-bold text-gold-400 uppercase tracking-wide">{t.editModalTitle || 'Edit Details'}</h3>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-navy-950 border border-gold-500/50 flex items-center justify-center text-gold-400 hover:border-gold-400 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto">
          {/* PHOTO PREVIEW & PHONE UPLOAD */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-4 border-gold-500/70 bg-navy-950 shadow-[0_0_25px_rgba(212,175,55,0.3)] flex items-center justify-center">
              {photo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={photo} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-20 h-20 text-gold-600/70" />
              )}
            </div>
            <label className="golden-btn text-xs h-10 px-5 flex items-center justify-center gap-2 cursor-pointer mt-1">
              <Camera className="w-4 h-4 stroke-[2.5]" />
              <span>{t.uploadPhoto}</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
            {errorMsg && (
              <p className="text-xs text-rose-400 font-semibold text-center mt-1 animate-in fade-in duration-200">{errorMsg}</p>
            )}
          </div>

          {/* Read-Only Name */}
          <div className="space-y-1 opacity-70">
            <label className="block text-xs font-bold text-gold-500 uppercase tracking-wider">{t.name}</label>
            <input
              type="text"
              value={user.name}
              disabled
              readOnly
              className="w-full px-4 h-11 bg-navy-950/80 rounded-full border border-gold-600/40 text-sm text-gold-500/70 cursor-not-allowed select-none"
            />
          </div>

          {/* Read-Only Outlet Name */}
          <div className="space-y-1 opacity-70">
            <label className="block text-xs font-bold text-gold-500 uppercase tracking-wider">{t.outletName}</label>
            <input
              type="text"
              value={user.outletName}
              disabled
              readOnly
              className="w-full px-4 h-11 bg-navy-950/80 rounded-full border border-gold-600/40 text-sm text-gold-500/70 cursor-not-allowed select-none"
            />
          </div>

          {/* Read-Only Outlet Code */}
          <div className="space-y-1 opacity-70">
            <label className="block text-xs font-bold text-gold-500 uppercase tracking-wider">
              <span>{t.shopCode}</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={user.code}
                disabled
                readOnly
                className="w-full px-4 h-11 bg-navy-950/80 rounded-full border border-gold-600/40 text-sm text-gold-500/70 font-mono cursor-not-allowed select-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 h-11 rounded-full border border-gold-600/50 bg-navy-950 text-gold-400 text-xs font-bold uppercase tracking-wider hover:border-gold-400 transition-colors cursor-pointer"
            >
              {t.cancel || 'Cancel'}
            </button>
            <button
              type="submit"
              className="golden-btn flex-1 text-xs h-11 flex items-center justify-center"
            >
              {t.saveChanges || 'Save'}
            </button>
          </div>
        </form>
      </div>

      {/* Emergency Contact Notice Outside of Modal */}
      <div className={`mt-4 text-center z-10 px-4 ${isClosing ? 'animate-modal-backdrop-out' : 'animate-in fade-in slide-in-from-bottom-4 duration-400 delay-150'}`}>
        <p className="text-sm sm:text-base text-gold-400 font-bold tracking-wide flex items-center justify-center gap-2 flex-wrap drop-shadow-sm">
          <span>Emergency Contact For Issues :</span>
          <a
            href="tel:0786222222"
            className="text-base sm:text-lg text-gold-300 font-extrabold underline hover:text-white transition-colors font-mono tracking-wider"
          >
            0786222222
          </a>
        </p>
      </div>
    </div>
  );
};
