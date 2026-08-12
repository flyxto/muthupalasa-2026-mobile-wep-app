'use client';

import React, { useRef, useState, useEffect } from 'react';
import { UserProfile, Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { Upload, Loader2, AlertTriangle, CheckCircle2, ShieldAlert, Phone } from 'lucide-react';

interface RejectedImageUploadViewProps {
  user: UserProfile;
  language: Language;
  onUploadPhotoFile: (file: File) => void;
  isUploadingPhoto?: boolean;
  uploadSuccess?: boolean;
  onEmergencyContactClick: () => void;
}

export const RejectedImageUploadView: React.FC<RejectedImageUploadViewProps> = ({
  user,
  language,
  onUploadPhotoFile,
  isUploadingPhoto = false,
  uploadSuccess = false,
  onEmergencyContactClick,
}) => {
  const t = translations[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const photoSrc = (user.photo && user.photo.trim().length > 0) ? user.photo.trim() : '/avatar.png';
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  useEffect(() => {
    if (photoSrc) {
      setIsImageLoading(true);
    }
  }, [photoSrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4 MB limit
      if (file.size > MAX_SIZE_BYTES) {
        setErrorMsg(t.imageTooLargeErr || 'Image size exceeds 4 MB. Please select a smaller photo.');
        e.target.value = '';
        return;
      }
      setErrorMsg(null);
      setIsImageLoading(true);
      onUploadPhotoFile(file);
    }
  };

  const isSin = language === 'si';

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-3.5 sm:gap-4 px-3 sm:px-4 py-2 animate-in fade-in duration-300">

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Notice Card: Rejected Photo Warning or Upload Success Message */}
      {uploadSuccess ? (
        <div className="w-full p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-center space-y-1.5 shadow-[0_0_25px_rgba(16,185,129,0.3)] animate-in zoom-in-95 duration-300">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/50">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
            {isSin ? 'නව ඡායාරූපය සාර්ථකව යාවත්කාලීන විය!' : 'New image successfully updated!'}
          </h3>
          <p className="text-xs text-emerald-300/80 font-medium">
            {isSin ? 'තහවුරු කිරීමේ පිටුව වෙත යොමු වෙමින් පවතී...' : 'Redirecting to invitation confirmation...'}
          </p>
        </div>
      ) : (
        <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-amber-950/85 border border-amber-500/60 text-center space-y-1 shadow-lg backdrop-blur-md animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{isSin ? 'ඡායාරූපය ප්‍රතික්ෂේප වී ඇත' : 'Photo Rejected'}</span>
          </div>
          <p className="text-[clamp(0.68rem,1.4vh,0.78rem)] text-amber-200/90 font-medium leading-relaxed">
            {isSin 
              ? 'ඔබගේ පෙර ඡායාරූපය ප්‍රතික්ෂේප වී ඇත. කරුණාකර නව පැහැදිලි ඡායාරූපයක් එක් කරන්න.'
              : 'Your previous photo was rejected. Please upload a clear photo to update your invitation.'}
          </p>
        </div>
      )}

      {/* User Photo Frame Box */}
      <div className="relative flex justify-center w-full my-1">
        <div className="w-[min(32vh,56vw,220px)] h-auto aspect-square min-w-[130px] rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-amber-500/70 bg-navy-950 shadow-[0_0_30px_rgba(245,158,11,0.3)] relative flex items-center justify-center transition-all shrink-0">
          
          {/* Image Loader Overlay inside photo container while uploading or rendering new image */}
          {(isUploadingPhoto || isImageLoading) && (
            <div className="absolute inset-0 z-40 bg-navy-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-2 text-amber-400 animate-in fade-in duration-200">
              <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
              <p className="text-[clamp(0.65rem,1.5vh,0.75rem)] font-bold uppercase tracking-wider text-amber-400/90">
                {isUploadingPhoto ? 'Uploading Image...' : 'Loading Photo...'}
              </p>
            </div>
          )}

          {/* Photo Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={user.name}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            className="w-full h-full object-cover transition-all z-0 blur-none opacity-100"
          />

        </div>
      </div>

      {/* Helper Error Message */}
      {errorMsg && (
        <div className="w-full text-center px-3 py-1 bg-rose-950/80 border border-rose-500/60 rounded-xl text-xs font-semibold text-rose-300 flex items-center justify-center gap-1.5 shadow-sm">
          <span>{errorMsg}</span>
        </div>
      )}

      {/* User Information */}
      <div className="w-full space-y-0.5 text-center px-1">
        <h3 className="text-[clamp(0.85rem,2.4vh,1.35rem)] font-extrabold text-white tracking-wide text-wrap break-words leading-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)] max-w-full">
          {user.name}
        </h3>
        
        <p className="text-[clamp(0.68rem,1.7vh,0.85rem)] text-gold-400/90 font-semibold uppercase tracking-widest text-wrap break-words leading-tight max-w-full">
          {user.outletName}
        </p>
        
        {user.phoneNumber && (
          <div className="flex items-center justify-center gap-1 text-[clamp(0.62rem,1.4vh,0.72rem)] text-gold-400/80 font-mono font-medium pt-0.5 select-none">
            <Phone className="w-3 h-3 text-gold-500" />
            <span className="select-none">Phone: {user.phoneNumber}</span>
          </div>
        )}

        <div className="inline-flex items-center px-3 py-0.5 rounded-full bg-navy-950/90 border border-gold-600/40 text-[clamp(0.6rem,1.4vh,0.75rem)] font-mono text-gold-400 mt-0.5">
          <span>{user.code}</span>
        </div>
      </div>

      {/* CTA Buttons */}
      {!uploadSuccess && (
        <div className="w-full space-y-2 pt-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingPhoto}
            className={`golden-btn w-full text-xs sm:text-sm h-11 flex items-center justify-center gap-2 transition-all ${
              isUploadingPhoto ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            <Upload className="w-4 h-4 stroke-[2.5]" />
            <span>Upload New Photo</span>
          </button>

          <button
            type="button"
            onClick={onEmergencyContactClick}
            className="w-full h-9 px-4 rounded-full border border-gold-500/60 bg-navy-900/80 hover:bg-navy-900 text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 justify-center transition-all cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-gold-400" />
            <span>{t.emergencyContactButton}</span>
          </button>
        </div>
      )}

    </div>
  );
};
