'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Language } from '@/types/flow';
import { translations } from '@/lib/translations';
import { User, Phone, Check, X, ShieldAlert, MessageCircle, Upload, Loader2, AlertCircle } from 'lucide-react';

interface UserDetailsViewProps {
  user: UserProfile;
  language: Language;
  onUpdateWhatsappNumber: (phone: string) => void;
  onUploadPhotoFile: (file: File) => void;
  isUploadingPhoto?: boolean;
  isConfirming?: boolean;
  onEmergencyContactClick: () => void;
  onConfirm: (whatsappNumber: string) => void;
  onChangeLanguageClick: () => void;
}

export const UserDetailsView: React.FC<UserDetailsViewProps> = ({
  user,
  language,
  onUpdateWhatsappNumber,
  onUploadPhotoFile,
  isUploadingPhoto = false,
  isConfirming = false,
  onEmergencyContactClick,
  onConfirm,
  onChangeLanguageClick,
}) => {
  const t = translations[language];
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Strictly empty by default if not set by user
  const currentWhatsappVal = user.whatsappNumber || '';
  
  // Check if the fetched MongoDB document has a valid, non-empty image URL
  const fetchedImageUrl = user.rawInvitation?.["image url"]?.trim();

  // Check if user currently has a valid non-fallback image
  const hasValidImage = Boolean(
    (fetchedImageUrl && fetchedImageUrl.length > 0) ||
    (user.photo && user.photo.trim().length > 0 && user.photo.trim() !== '/avatar.png')
  );

  // The upload button is only visible if there is NO valid image URL on the fetched object
  const showUploadButton = !hasValidImage;

  // Determine photo source: fetched image URL, uploaded photo URL, or default /avatar.png fallback
  const photoSrc = (user.photo && user.photo.trim().length > 0) ? user.photo.trim() : '/avatar.png';

  // Image loading state for browser rendering of new image
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  // When photoSrc changes, set image loading state until onLoad fires
  useEffect(() => {
    if (photoSrc) {
      setIsImageLoading(true);
    }
  }, [photoSrc]);

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    onUpdateWhatsappNumber(value);

    if (value.length > 0) {
      if (value.length === 1 && value !== '0') {
        setErrorMsg('WhatsApp number must start with 07');
      } else if (value.length >= 2 && !value.startsWith('07')) {
        setErrorMsg('WhatsApp number must start with 07');
      } else {
        setErrorMsg(null);
      }
    } else {
      setErrorMsg(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageLoading(true);
      onUploadPhotoFile(file);
    }
  };

  const handleConfirmClick = () => {
    if (!hasValidImage) {
      setErrorMsg(t.uploadRequiredErr);
      return;
    }

    const cleanPhone = currentWhatsappVal.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      setErrorMsg(t.phoneRequiredErr);
      return;
    }
    if (!cleanPhone.startsWith('07')) {
      setErrorMsg('WhatsApp number must start with 07');
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMsg('WhatsApp number must be 10 digits');
      return;
    }
    setErrorMsg(null);
    onConfirm(cleanPhone);
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-4 px-4 py-1 animate-in fade-in duration-300">

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* User Photo Frame Box */}
      <div className="relative flex justify-center w-full">
        <div className="w-72 h-72 sm:w-80 sm:h-80 max-w-[85vw] rounded-3xl overflow-hidden border-4 border-gold-500/70 bg-navy-950 shadow-[0_0_35px_rgba(212,175,55,0.35)] relative flex items-center justify-center transition-all">
          
          {/* Image Loader Overlay inside photo container while uploading or rendering new image */}
          {(isUploadingPhoto || isImageLoading) && (
            <div className="absolute inset-0 z-40 bg-navy-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-2.5 text-gold-400 animate-in fade-in duration-200">
              <Loader2 className="w-10 h-10 animate-spin text-gold-400 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
              <p className="text-xs font-bold uppercase tracking-wider text-gold-400/90">
                {isUploadingPhoto ? 'Uploading Image...' : 'Loading Photo...'}
              </p>
            </div>
          )}

          {/* Photo Image (blurred if fallback/upload photo, clear if valid image present) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt={user.name}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            className={`w-full h-full object-cover transition-all z-0 ${
              showUploadButton ? 'blur-[2px] opacity-95' : 'blur-none opacity-100'
            }`}
          />

          {/* Upload Button: ONLY visible if there is NO image URL on the fetched object and not loading */}
          {showUploadButton && !isUploadingPhoto && !isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="pointer-events-auto px-4 py-2 rounded-full bg-navy-950/90 border border-gold-500/80 hover:border-gold-400 text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <Upload className="w-4 h-4 text-gold-500" />
                <span>{t.uploadPhoto}</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Helper text if image is missing */}
      {!hasValidImage && !isUploadingPhoto && (
        <div className="w-full text-center px-3 py-1.5 bg-navy-950/80 border border-gold-500/40 rounded-xl text-xs font-semibold text-gold-400 flex items-center justify-center gap-1.5 shadow-sm animate-in fade-in duration-200">
          <AlertCircle className="w-3.5 h-3.5 text-gold-500 shrink-0" />
          <span>{t.uploadRequiredErr}</span>
        </div>
      )}

      {/* User Information */}
      <div className="w-full space-y-1 text-center">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide truncate drop-shadow-[0_2px_12px_rgba(255,255,255,0.3)]">{user.name}</h3>
        <p className="text-sm sm:text-base text-gold-400/90 truncate font-semibold uppercase tracking-widest">{user.outletName}</p>
        
        {/* Registered Phone Number displayed under Outlet Name if present */}
        {user.phoneNumber && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-gold-400/80 font-mono font-medium pt-0.5">
            <Phone className="w-3 h-3 text-gold-500" />
            <span>Phone: {user.phoneNumber}</span>
          </div>
        )}

        {/* Read-only Code Badge */}
        <div className="inline-flex items-center px-3.5 py-0.5 rounded-full bg-navy-950/90 border border-gold-600/40 text-xs font-mono text-gold-400 mt-1">
          <span>{user.code}</span>
        </div>
      </div>

      {/* WhatsApp Phone Number Input */}
      <div className="w-full space-y-1 text-left pt-1">
        <label className="block text-xs font-bold text-gold-500 uppercase tracking-wider">
          <span>{t.whatsappNumber}</span>
        </label>
        <div className="relative flex items-center h-12 rounded-full bg-navy-950/90 border border-gold-500/50 shadow-inner focus-within:ring-1 focus-within:ring-gold-400 transition-all px-2">
          <div className="pl-2 text-gold-600/70">
            <MessageCircle className="w-4 h-4" />
          </div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            autoComplete="off"
            value={currentWhatsappVal}
            onChange={handleWhatsappChange}
            placeholder={t.enterWhatsappPlaceholder}
            className="w-full h-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gold-600/40 text-gold-400"
          />
          {currentWhatsappVal && (
            <button
              type="button"
              onClick={() => { onUpdateWhatsappNumber(''); setErrorMsg(null); }}
              className="p-1 mr-2 text-gold-600 hover:text-gold-400 transition-colors rounded-full hover:bg-gold-600/10 cursor-pointer"
              aria-label="Clear WhatsApp number"
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
        {/* Primary CTA Confirm Button: Disabled if no valid image is uploaded/present or confirming */}
        <button
          type="button"
          onClick={handleConfirmClick}
          disabled={!hasValidImage || isUploadingPhoto || isImageLoading || isConfirming}
          className={`golden-btn w-full text-xs h-12 flex items-center justify-center gap-2 transition-all ${
            (!hasValidImage || isUploadingPhoto || isImageLoading || isConfirming)
              ? 'opacity-40 cursor-not-allowed pointer-events-none grayscale'
              : ''
          }`}
        >
          {isConfirming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-navy-950" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{t.confirmButton}</span>
            </>
          )}
        </button>

        {/* Secondary Action Emergency Contact Button */}
        <button
          type="button"
          onClick={onEmergencyContactClick}
          className="w-full h-11 px-5 rounded-full border border-gold-500/60 bg-navy-900/80 hover:bg-navy-900 hover:border-gold-400 text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 justify-center transition-all cursor-pointer shadow-sm"
        >
          <ShieldAlert className="w-4 h-4 text-gold-400" />
          <span>{t.emergencyContactButton}</span>
        </button>
      </div>
    </div>
  );
};
