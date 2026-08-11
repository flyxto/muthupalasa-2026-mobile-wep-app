'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { FlowStep, Language, UserProfile, InvitationDocument, ClubType } from '@/types/flow';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserDetailsView } from '@/components/UserDetailsView';
import { AlreadyRegisteredView } from '@/components/AlreadyRegisteredView';
import { EmergencyContactModal } from '@/components/EmergencyContactModal';
import { VideoThankYouView } from '@/components/VideoThankYouView';
import { ThankYouView } from '@/components/ThankYouView';
import { AlertCircle, RefreshCw, Loader2 } from 'lucide-react';

const PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${(i * 2.2 + (i % 7) * 3.9) % 96 + 2}%`,
  size: `${(i % 4) * 0.5 + 1.5}px`,
  duration: `${14 + (i % 8) * 3}s`,
  delay: `${(i % 10) * 1.2}s`,
  opacity: 0.12 + (i % 4) * 0.05,
}));

interface MainFlowProps {
  goldenPass?: string;
  clubType?: ClubType;
}

const getFrameImage = (club: ClubType, is17th: boolean): string => {
  // If date is 17th August, always show '/mp-dm-frame.png'
  if (is17th) return '/mp-dm-frame.png';
  if (club === 'starclub') return '/sc-frame.png';
  return '/mp-dm-frame.png';
};

const getLogoImage = (club: ClubType): string => {
  if (club === 'dmart') return '/dm.png';
  if (club === 'starclub') return '/sc.png';
  return '/mp-logo.png';
};

export const MainFlow: React.FC<MainFlowProps> = ({ goldenPass, clubType }) => {
  const pathname = usePathname();

  // Determine active club type dynamically from prop or URL pathname
  let activeClub: ClubType = clubType || 'mp';
  if (pathname) {
    if (pathname.includes('/dmart')) activeClub = 'dmart';
    else if (pathname.includes('/starclub')) activeClub = 'starclub';
    else if (pathname.includes('/mp')) activeClub = 'mp';
  }

  const [step, setStep] = useState<FlowStep>('language');
  const [language, setLanguage] = useState<Language>('en');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState<boolean>(false);

  // Loading & error state for fetching MongoDB invitation data
  const [isLoading, setIsLoading] = useState<boolean>(!!goldenPass);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  // User state pre-populated with default/demo data, updated dynamically when MongoDB returns
  const [user, setUser] = useState<UserProfile>({
    name: 'Valued Guest',
    outletName: 'Exclusive Outlet',
    code: goldenPass ? `PASS-${goldenPass}` : 'OUT-94821',
    photo: '/avatar.png',
    phoneNumber: '',
    whatsappNumber: '',
  });

  // Check if object date is 17th August (case-insensitive check)
  const rawDate = (
    user.rawInvitation?.["DATE"] ||
    user.rawInvitation?.["Date"] ||
    user.rawInvitation?.eventDate ||
    user.rawInvitation?.["EVENT DATE"] ||
    user.rawInvitation?.["Event Date"] ||
    ''
  ).toString().toLowerCase().trim();
  const is17thAugust = rawDate.includes('17th aug') || rawDate.includes('17th august') || rawDate.includes('17 aug') || rawDate.includes('17 august');

  // Dynamic frame image selection (if date is 17th, force '/mp-dm-frame.png')
  const frameImageSrc = getFrameImage(activeClub, is17thAugust);
  const logoImageSrc = getLogoImage(activeClub);

  // Check if invitation data and date check are fully ready
  const isDataReady = goldenPass ? (!isLoading && user.rawInvitation !== undefined) : true;

  // Reusable function to fetch/refetch invitation data from MongoDB without page refresh
  const fetchInvitationData = useCallback(async (passNumber: string) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`/api/invitation/${passNumber}`);
      if (!res.ok) {
        throw new Error(`Invitation pass "${passNumber}" not found.`);
      }
      const resData = await res.json();
      if (resData.success && resData.data) {
        const doc: InvitationDocument = resData.data;

        let rawPhone = (doc["MOBILE NUMBER"] || doc.mobileNumber || '').toString().trim().replace(/\D/g, '');
        if (rawPhone.length === 9 && rawPhone.startsWith('7')) {
          rawPhone = `0${rawPhone}`;
        }

        // Strictly check if the MongoDB document has a non-empty WHATSAPP NUMBER
        const whatsappNum = (doc["WHATSAPP NUMBER"] || doc.waNumber || '').toString().trim();
        const hasWhatsappNumber = whatsappNum.length > 0;

        setIsAlreadyRegistered(hasWhatsappNumber);

        setUser({
          name: doc["OWNER'S NAME"] || doc["BP Name"] || doc.ownerName || doc.bpName || 'Valued Guest',
          outletName: doc["OUTLET NAME"] || doc.outletName || 'Exclusive Outlet',
          code: doc["Outlet Code"] || doc["BP Code"] || doc["GOLDEN PASS"] || doc.outletCode || doc.bpCode || doc.goldenPass || passNumber,
          photo: (doc["image url"] && doc["image url"].trim().length > 0) ? doc["image url"].trim() :
            (doc.processedImage && doc.processedImage.trim().length > 0) ? doc.processedImage.trim() :
              (doc.originalImage && doc.originalImage.trim().length > 0) ? doc.originalImage.trim() : '/avatar.png',
          phoneNumber: rawPhone,
          whatsappNumber: whatsappNum,
          goldenPass: doc["GOLDEN PASS"] || doc.goldenPass || passNumber,
          rawInvitation: doc,
        });
      }
    } catch (err: any) {
      console.error('Failed to load invitation data:', err);
      setFetchError(err.message || 'Unable to fetch invitation details.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch MongoDB invitation data immediately on mount as soon as site opens
  useEffect(() => {
    if (goldenPass) {
      fetchInvitationData(goldenPass);
    }
  }, [goldenPass, fetchInvitationData]);

  const handleUpdateWhatsappNumber = (whatsapp: string) => {
    setUser((prev) => ({ ...prev, whatsappNumber: whatsapp }));
  };

  // Upload photo file directly to Cloudflare R2 bucket, update MongoDB, and refetch without refresh
  const handleUploadPhotoFile = async (file: File) => {
    const targetPass = user.goldenPass || goldenPass || user.code;
    if (!targetPass) return;

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('goldenPass', targetPass);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload photo to Cloudflare R2');
      }

      // Refetch invitation data from MongoDB to update UI without page reload
      await fetchInvitationData(targetPass);
    } catch (err: any) {
      console.error('Image upload failed:', err);
      alert(`Photo upload failed: ${err.message || 'Server error'}`);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Post the confirmed WhatsApp number to MongoDB and transition to video step
  const handleConfirm = async (whatsappNumber: string) => {
    const targetPass = user.goldenPass || goldenPass || user.code;

    setIsConfirming(true);
    try {
      if (targetPass) {
        const res = await fetch('/api/invitation/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            goldenPass: targetPass,
            whatsappNumber: whatsappNumber,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          console.warn('MongoDB confirm update warning:', data.error);
        }
      }
    } catch (err: any) {
      console.error('Error submitting WhatsApp number to MongoDB:', err);
    } finally {
      setIsConfirming(false);
      setStep('video');
    }
  };

  return (
    <div className="min-h-svh max-h-svh h-svh bg-navy-800 text-gold-400 font-sans px-3 sm:px-6 py-2 sm:py-3 relative overflow-hidden flex flex-col items-center justify-between select-none">

      {/* Blurred Fullscreen Overlay Loader until frame and logos load */}
      {goldenPass && !isDataReady && !fetchError && (
        <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-lg flex flex-col items-center justify-center gap-3 animate-in fade-in duration-200">
          <Loader2 className="w-10 h-10 animate-spin text-gold-400 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
          <p className="text-xs font-extrabold uppercase tracking-widest text-gold-400/90 animate-pulse">
            Loading...
          </p>
        </div>
      )}

      {/* Dynamic Background Frame Overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameImageSrc}
        alt="Background Frame"
        className="fixed inset-0 w-full h-full object-fill pointer-events-none z-0 opacity-90 transition-all duration-300"
      />

      {/* Floating Golden Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="golden-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Dark Blue Bottom-to-Top Backdrop Gradient in Details View (above knight-2.png at z-[5], below content at z-10) */}
      {step === 'details' && !isAlreadyRegistered && (
        <div
          className="fixed inset-x-0 bottom-0 h-[65vh] pointer-events-none z-[6] transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, #030e1f 0%, rgba(3, 14, 31, 0.95) 40%, rgba(3, 14, 31, 0.7) 70%, rgba(3, 14, 31, 0) 100%)',
          }}
        />
      )}

      {/* Top Header Bar */}
      <div className="w-full max-w-md mx-auto relative flex items-center justify-end pt-1 px-1 z-10 shrink-0 min-h-[4rem] sm:min-h-[5rem]">
        {/* Absolutely Positioned Dynamic Top Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 sm:top-8 pointer-events-none z-10 flex items-center justify-center gap-2 sm:gap-3 max-w-[90vw]">
          {isDataReady && (
            <div className="flex items-center justify-center gap-2 sm:gap-3 animate-in fade-in zoom-in-95 slide-in-from-top-3 duration-500 ease-out">
              {is17thAugust ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/mp-logo.png"
                    alt="Muthupalasa Logo"
                    className="h-[8.5vh] max-h-24 min-h-[44px] w-auto max-w-[38vw] object-contain  transition-all duration-300"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/dm.png"
                    alt="D-Mart Logo"
                    className="h-[8.5vh] max-h-24 min-h-[44px] w-auto max-w-[38vw] object-contain transition-all duration-300"
                  />
                </>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={logoImageSrc}
                  alt="Logo"
                  className="h-[11vh] max-h-28 min-h-[56px] w-auto max-w-[75vw] object-contain transition-all duration-300"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-md mx-auto flex-1 flex items-center justify-center overflow-y-auto relative z-10 my-auto py-1">
        {isAlreadyRegistered ? (
          <AlreadyRegisteredView
            language={language}
            onEmergencyContactClick={() => setIsEmergencyModalOpen(true)}
            rawDate={rawDate}
            user={user}
          />
        ) : (
          <>
            {step === 'language' && (
              <LanguageSelector
                selectedLanguage={language}
                onSelectLanguage={(lang) => setLanguage(lang)}
                onProceed={() => setStep('details')}
              />
            )}

            {step === 'details' && (
              <>
                {fetchError ? (
                  <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-navy-950/90 border border-rose-500/50 text-center space-y-3 shadow-xl">
                    <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white">Invitation Not Found</h3>
                      <p className="text-xs text-gold-400/80">{fetchError}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('language')}
                      className="golden-btn text-xs h-9 w-full flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Back to Language</span>
                    </button>
                  </div>
                ) : (
                  <UserDetailsView
                    user={user}
                    language={language}
                    onUpdateWhatsappNumber={handleUpdateWhatsappNumber}
                    onUploadPhotoFile={handleUploadPhotoFile}
                    isUploadingPhoto={isUploadingPhoto}
                    isConfirming={isConfirming}
                    onEmergencyContactClick={() => setIsEmergencyModalOpen(true)}
                    onConfirm={handleConfirm}
                    onChangeLanguageClick={() => setStep('language')}
                  />
                )}
              </>
            )}

            {step === 'video' && (
              <VideoThankYouView
                language={language}
                onVideoEnded={() => setStep('thankyou')}
                rawDate={rawDate}
                clubType={activeClub}
              />
            )}

            {step === 'thankyou' && (
              <ThankYouView
                language={language}
                onEmergencyContactClick={() => setIsEmergencyModalOpen(true)}
                rawDate={rawDate}
                user={user}
              />
            )}
          </>
        )}
      </main>

      {/* Knight Emblem at Bottom of Screen */}
      <div
        className="fixed pointer-events-none z-[5] flex justify-center"
        style={{
          left: 'calc(50% - 15px)',
          bottom: '74px',
          transform: 'translateX(-50%) scale(2.05)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/knight-2.png"
          alt="Knight Emblem"
          className="w-44 sm:w-56 md:w-64 max-h-48 sm:max-h-56 object-contain drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)] origin-bottom opacity-85"
        />
      </div>

      {/* Emergency Contact Modal Popup */}
      {isEmergencyModalOpen && (
        <EmergencyContactModal
          language={language}
          onClose={() => setIsEmergencyModalOpen(false)}
        />
      )}

      {/* Footer */}
      {/* <footer className="w-full text-center py-1 text-[9px] sm:text-[10px] text-gold-500/70 shrink-0 relative z-10 tracking-widest uppercase font-semibold">
        Muthupalasa 2026
      </footer> */}
    </div>
  );
};