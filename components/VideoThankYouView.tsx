'use client';

import React from 'react';
import { Language } from '@/types/flow';

interface VideoThankYouViewProps {
  language: Language;
  onVideoEnded: () => void;
}

export const VideoThankYouView: React.FC<VideoThankYouViewProps> = ({
  language,
  onVideoEnded,
}) => {
  const videoUrls: Record<Language, string> = {
    en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1786355173/english_kzs0i5.mp4',
    si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1786355170/sinhala_rtvijk.mp4',
  };

  const videoUrl = videoUrls[language] || videoUrls.en;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-2 select-none animate-in fade-in duration-300">
      {/* Scaled Strict 9:16 Aspect Ratio Responsive Video Frame with Smooth Entrance */}
      <div 
        className="relative rounded-3xl overflow-hidden border-4 border-gold-500/80 bg-black shadow-[0_0_45px_rgba(212,175,55,0.45)] flex items-center justify-center shrink-0 animate-video-entrance"
        style={{
          aspectRatio: '9 / 16',
          height: 'min(74vh, 560px)',
          width: 'auto',
          maxWidth: 'calc(100vw - 24px)',
        }}
      >
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          onEnded={onVideoEnded}
        />
      </div>
    </div>
  );
};
