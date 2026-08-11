'use client';

import React from 'react';
import { Language, ClubType } from '@/types/flow';

interface VideoThankYouViewProps {
  language: Language;
  onVideoEnded: () => void;
  rawDate?: string;
  clubType?: ClubType;
}

export const VideoThankYouView: React.FC<VideoThankYouViewProps> = ({
  language,
  onVideoEnded,
  rawDate = '',
  clubType = 'mp',
}) => {
  const defaultVideoUrls: Record<Language, string> = {
    en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1786355173/english_kzs0i5.mp4',
    si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1786355170/sinhala_rtvijk.mp4',
  };

  let videoUrls = defaultVideoUrls;

  if (rawDate.includes('17')) {
    videoUrls = {
      en: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786422781/17_English_03_with_SUB_kfaxgh.mp4',
      si: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786422779/17_Sinhala_06_lnm0gp.mp4',
    };
  } else if (rawDate.includes('18')) {
    videoUrls = {
      en: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786423343/18_English_01_fyvhc5.mp4',
      si: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786422981/18_Sinhala_01_i8wb5t.mp4',
    };
  } else if (rawDate.includes('19')) {
    if (clubType === 'dmart') {
      videoUrls = {
        en: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786423345/19_D_mart_English_hjebva.mp4',
        si: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786422999/19_D_mart_Sinhala_01_l6bnle.mp4',
      };
    } else if (clubType === 'starclub') {
      videoUrls = {
        en: defaultVideoUrls.en, // User didn't specify 19th SC English, fallback to default English
        si: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786423001/19_SC_Sinhala_01_vn0y9u.mp4',
      };
    }
  }

  const videoUrl = videoUrls[language] || videoUrls.en;

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-2 select-none animate-in fade-in duration-300">
      {/* Scaled Strict 9:16 Aspect Ratio Responsive Video Frame with Smooth Entrance */}
      <div 
        className="relative rounded-3xl overflow-hidden border-4 border-gold-500/80 bg-black shadow-[0_0_45px_rgba(212,175,55,0.45)] flex items-center justify-center shrink-0 animate-video-entrance"
        style={{
          aspectRatio: '9 / 16',
          height: 'min(62svh, 500px)',
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
