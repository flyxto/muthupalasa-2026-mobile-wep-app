'use client';

import React, { useState } from 'react';
import { UserProfile, Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { X, Lock, Camera } from 'lucide-react';

interface EditDetailsModalProps {
  user: UserProfile;
  language: Language;
  onSave: (updatedFields: Partial<UserProfile>) => void;
  onClose: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
];

export const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  user,
  language,
  onSave,
  onClose,
}) => {
  const t = translations[language];

  const [name, setName] = useState(user.name);
  const [outletName, setOutletName] = useState(user.outletName);
  const [photo, setPhoto] = useState(user.photo);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || user.name,
      outletName: outletName.trim() || user.outletName,
      photo: photo,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800">
          <h3 className="text-base font-bold text-white">{t.editModalTitle}</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-5 space-y-3">
          {/* PHOTO PREVIEW & SELECTION */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-sky-400 bg-slate-950 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <label className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shadow-lg hover:bg-sky-400 cursor-pointer transition-transform hover:scale-110">
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-2">
              {PRESET_AVATARS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhoto(url)}
                  className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                    photo === url ? 'border-sky-400 ring-2 ring-sky-400/40 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300">{t.name}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 h-11 bg-slate-950 rounded-full border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          {/* Outlet Name */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300">{t.outletName}</label>
            <input
              type="text"
              value={outletName}
              onChange={(e) => setOutletName(e.target.value)}
              required
              className="w-full px-4 h-11 bg-slate-950 rounded-full border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          {/* Read-Only Shop Code */}
          <div className="space-y-1 opacity-60">
            <label className="block text-xs font-semibold text-slate-400 flex items-center justify-between">
              <span>{t.shopCode}</span>
              <span className="text-[10px] text-amber-400 font-mono">({t.readOnlyBadge})</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={user.code}
                disabled
                readOnly
                className="w-full px-4 h-11 bg-slate-950/80 rounded-full border border-slate-800 text-sm text-slate-400 font-mono cursor-not-allowed select-none"
              />
              <Lock className="w-3.5 h-3.5 text-amber-400 absolute right-4 top-4" />
            </div>
          </div>

          {/* Buttons (rounded-full & uniform h-12 height) */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-full border border-slate-800 bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 h-12 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              {t.saveChanges}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
