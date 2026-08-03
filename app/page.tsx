'use client';

import React, { useState } from 'react';
import { FlowStep, Language, UserProfile } from '@/types/flow';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserDetailsView } from '@/components/UserDetailsView';
import { EditDetailsModal } from '@/components/EditDetailsModal';
import { VideoThankYouView } from '@/components/VideoThankYouView';

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
  };

  // Pure full-screen video step
  if (step === 'video') {
    return <VideoThankYouView />;
  }

  return (
    <main className="h-[100svh] max-h-[100svh] overflow-hidden flex flex-col items-center justify-between p-3 sm:p-4 w-full max-w-md mx-auto select-none">
      {/* Minimal Top Brand Bar */}
      <div className="w-full flex items-center justify-between pt-2 px-1">
        <span className="text-xs font-bold tracking-widest text-sky-400 uppercase font-mono">
          Muthupalasa
        </span>

        {/* Minimal 2-Dot Step Bar */}
        <div className="flex items-center gap-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 'language' ? 'w-6 bg-sky-400' : 'w-2 bg-slate-800'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 'details' ? 'w-6 bg-sky-400' : 'w-2 bg-slate-800'
            }`}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
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
      <footer className="w-full text-center py-2 text-[10px] text-slate-600 shrink-0">
        Muthupalasa 2026
      </footer>
    </main>
  );
}
