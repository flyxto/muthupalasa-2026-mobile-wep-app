'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { FlowStep, Language, UserProfile, InvitationDocument, ClubType } from '@/types/flow';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserDetailsView } from '@/components/UserDetailsView';
import { EmergencyContactModal } from '@/components/EmergencyContactModal';
import { VideoThankYouView } from '@/components/VideoThankYouView';
import { ThankYouView } from '@/components/ThankYouView';
import { AlertCircle, RefreshCw } from 'lucide-react';

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

const getFrameImage = (club: ClubType): string => {
  if (club === 'starclub') return '/sc-frame.png';
  // Both 'mp' and 'dmart' use '/mp-dm-frame.png'
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

  const frameImageSrc = getFrameImage(activeClub);
  const logoImageSrc = getLogoImage(activeClub);

  const [step, setStep] = useState<FlowStep>('language');
  const [language, setLanguage] = useState<Language>('en');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);

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

        let rawPhone = (doc["MOBILE NUMBER"] || '').toString().trim().replace(/\D/g, '');
        if (rawPhone.length === 9 && rawPhone.startsWith('7')) {
          rawPhone = `0${rawPhone}`;
        }

        setUser({
          name: doc["OWNER'S NAME"] || doc["BP Name"] || 'Valued Guest',
          outletName: doc["OUTLET NAME"] || 'Exclusive Outlet',
          code: doc["BP Code"] || doc["GOLDEN PASS"] || passNumber,
          photo: (doc["image url"] && doc["image url"].trim().length > 0) ? doc["image url"].trim() : '/avatar.png',
          phoneNumber: rawPhone,
          whatsappNumber: '',
          goldenPass: doc["GOLDEN PASS"] || passNumber,
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
    <div className="min-h-svh max-h-svh h-svh bg-navy-800 text-gold-400 font-sans px-4 sm:px-6 py-3 relative overflow-hidden flex flex-col items-center justify-between select-none">
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

      {/* Top Header Bar */}
      <div className="w-full max-w-md mx-auto relative flex items-center justify-end pt-1 px-1 z-10 shrink-0">
        {/* Absolutely Positioned Dynamic Top Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 top-7 sm:top-9 pointer-events-none z-10 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoImageSrc}
            alt="Muthupalasa Logo"
            className="h-28 sm:h-36 md:h-44 w-auto max-w-[80vw] object-contain drop-shadow-[0_6px_25px_rgba(212,175,55,0.45)] transition-all duration-300"
          />
        </div>

        {/* 3-Dot Step Bar */}
        <div className="flex items-center gap-1.5 z-20">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 'language' ? 'w-5 bg-gradient-to-r from-gold-500 to-gold-400' : 'w-2 bg-navy-900 border border-gold-600/40'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 'details' ? 'w-5 bg-gradient-to-r from-gold-500 to-gold-400' : 'w-2 bg-navy-900 border border-gold-600/40'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 'video' || step === 'thankyou' ? 'w-5 bg-gradient-to-r from-gold-500 to-gold-400' : 'w-2 bg-navy-900 border border-gold-600/40'
            }`}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-md mx-auto flex-1 flex items-center justify-center overflow-y-auto relative z-10 my-auto py-2">
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
              <div className="w-full max-w-sm mx-auto p-6 rounded-2xl bg-navy-950/90 border border-rose-500/50 text-center space-y-4 shadow-xl">
                <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Invitation Not Found</h3>
                  <p className="text-xs text-gold-400/80">{fetchError}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('language')}
                  className="golden-btn text-xs h-10 w-full flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
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
          />
        )}

        {step === 'thankyou' && (
          <ThankYouView language={language} />
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
      <footer className="w-full text-center py-1.5 text-[10px] text-gold-500/70 shrink-0 relative z-10 tracking-widest uppercase font-semibold">
        Muthupalasa 2026
      </footer>
    </div>
  );
};
