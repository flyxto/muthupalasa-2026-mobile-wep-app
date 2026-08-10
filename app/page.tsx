'use client';

import React, { useState } from 'react';
import { FlowStep, Language, UserProfile } from '@/types/flow';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserDetailsView } from '@/components/UserDetailsView';
import { EditDetailsModal } from '@/components/EditDetailsModal';
import { VideoThankYouView } from '@/components/VideoThankYouView';
import { ThankYouView } from '@/components/ThankYouView';

const PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${(i * 2.2 + (i % 7) * 3.9) % 96 + 2}%`,
  size: `${(i % 4) * 0.5 + 1.5}px`,
  duration: `${14 + (i % 8) * 3}s`,
  delay: `${(i % 10) * 1.2}s`,
  opacity: 0.12 + (i % 4) * 0.05,
}));

export default function Home() {
  const [step, setStep] = useState<FlowStep>('language');
  const [language, setLanguage] = useState<Language>('en');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Initial user state (loaded from scan)
  const [user, setUser] = useState<UserProfile>({
    name: 'Saman Kumara',
    outletName: 'Saman Super Outlet',
    code: 'OUT-94821', // Read-only shop code / ID
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phoneNumber: '',
  });

  const handleUpdatePhoneNumber = (phone: string) => {
    setUser((prev) => ({ ...prev, phoneNumber: phone }));
  };

  const handleSaveProfileEdits = (updatedFields: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields,
      code: prev.code,
    }));
    setIsEditModalOpen(false);
    setStep('video');
  };

  return (
    <div className="min-h-svh max-h-svh h-svh bg-navy-800 text-gold-400 font-sans px-4 sm:px-6 py-3 relative overflow-hidden flex flex-col items-center justify-between select-none">
      {/* Responsive Background Frame Overlay */}
      <img
        src="/frame.png"
        alt="Background Frame"
        className="fixed inset-0 w-full h-full object-fill pointer-events-none z-0 opacity-90"
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
        {/* Absolutely Positioned Top Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 top-7 sm:top-9 pointer-events-none z-10 flex justify-center">
          <img
            src="/mp-logo.png"
            alt="Muthupalasa Logo"
            className="h-28 sm:h-36 md:h-44 w-auto max-w-[80vw] object-contain drop-shadow-[0_6px_25px_rgba(212,175,55,0.45)]"
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
          <UserDetailsView
            user={user}
            language={language}
            onUpdatePhoneNumber={handleUpdatePhoneNumber}
            onEditDetailsClick={() => setIsEditModalOpen(true)}
            onConfirm={() => setStep('video')}
            onChangeLanguageClick={() => setStep('language')}
          />
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

      {/* Knight-2 Image at Bottom of Screen */}
      <div 
        className="fixed pointer-events-none z-[5] flex justify-center"
        style={{
          left: 'calc(50% - 15px)',
          bottom: '74px',
          transform: 'translateX(-50%) scale(2.05)',
        }}
      >
        <img 
          src="/knight-2.png" 
          alt="Knight Emblem" 
          className="w-44 sm:w-56 md:w-64 max-h-48 sm:max-h-56 object-contain drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)] origin-bottom opacity-85"
        />
      </div>

      {/* Edit Details Modal */}
      {isEditModalOpen && (
        <EditDetailsModal
          user={user}
          language={language}
          onSave={handleSaveProfileEdits}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* Minimal Footer */}
      <footer className="w-full text-center py-1.5 text-[10px] text-gold-500/70 shrink-0 relative z-10 tracking-widest uppercase font-semibold">
        Muthupalasa 2026
      </footer>
    </div>
  );
}
