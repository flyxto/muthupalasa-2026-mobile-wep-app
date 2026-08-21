'use client';

import React from 'react';
import { Language, ClubType } from '@/types/flow';

interface VideoThankYouViewProps {
  language: Language;
  onVideoEnded: () => void;
  rawDate?: string;
  clubType?: ClubType;
  loyaltyClub?: string;
}

const getDayNumber = (rawDate: string): number | null => {
  if (!rawDate) return null;
  // Remove any 4-digit year (e.g. 2025, 2026) to prevent false substring matches like "2026" containing "02"
  const cleaned = rawDate.toLowerCase().replace(/\b20\d\d\b/g, '').trim();
  const match = cleaned.match(/\b(0?[1-9]|[12]\d|3[01])(?:st|nd|rd|th)?\b/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
};

export const VideoThankYouView: React.FC<VideoThankYouViewProps> = ({
  language,
  onVideoEnded,
  rawDate = '',
  clubType = 'mp',
  loyaltyClub = '',
}) => {
  const defaultVideoUrls: Record<Language, string> = {
    en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1786355173/english_kzs0i5.mp4',
    si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1786355170/sinhala_rtvijk.mp4',
  };

  let videoUrls = defaultVideoUrls;
  const lClub = (loyaltyClub || '').toLowerCase().trim();

  const isStarClub = clubType === 'starclub' || lClub.includes('star') || lClub.includes('sc');
  const isDmart = clubType === 'dmart' || lClub.includes('dmart') || lClub.includes('d-mart') || lClub.includes('dm');

  const day = getDayNumber(rawDate);

  if (day === 31) {
    // August 31st
    videoUrls = {
      en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787233852/31_MPenglish_zeghb5.mp4',
      si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787231118/31_MP_Sinhala_01_wovzwv.mp4',
    };
  } else if (day === 19) {
    if (isDmart) {
      videoUrls = {
        en: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786423345/19_D_mart_English_hjebva.mp4',
        si: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786422999/19_D_mart_Sinhala_01_l6bnle.mp4',
      };
    } else if (isStarClub) {
      videoUrls = {
        en: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786423349/19_SC_English_ctvleq.mp4',
        si: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786423001/19_SC_Sinhala_01_vn0y9u.mp4',
      };
    }
  } else if (day === 18) {
    videoUrls = {
      en: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786423343/18_English_01_fyvhc5.mp4',
      si: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786422981/18_Sinhala_01_i8wb5t.mp4',
    };
  } else if (day === 17) {
    videoUrls = {
      en: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786422781/17_English_03_with_SUB_kfaxgh.mp4',
      si: 'https://res.cloudinary.com/dacskh1vb/video/upload/v1786422779/17_Sinhala_06_lnm0gp.mp4',
    };
  } else if (day === 16) {
    // September 16th
    videoUrls = {
      en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787297904/S_16_MP_English_x7bdci.mp4',
      si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787230170/S_16_MP_vcnym5.mp4',
    };
  } else if (day === 15) {
    // September 15th
    videoUrls = {
      en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787297908/S_15_MP_English_pdfu2y.mp4',
      si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787230313/S_15_MP_wcdg2p.mp4',
    };
  } else if (day === 14) {
    // September 14th
    if (isStarClub) {
      videoUrls = {
        en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787297884/S_14_SC_english_hmy0eo.mp4',
        si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787230390/S_14_SC_btcfqo.mp4',
      };
    } else {
      // dmart or default
      videoUrls = {
        en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787297896/S_14_Dmart_English_lafg8o.mp4',
        si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787230626/S_14_Dmart_dl0j4q.mp4',
      };
    }
  } else if (day === 8) {
    // September 08th
    if (isStarClub) {
      videoUrls = {
        en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787297534/S_08_SC_English_grsuyq.mp4',
        si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787230714/S_08_SC_akah2j.mp4',
      };
    } else {
      // dmart or default
      videoUrls = {
        en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787297539/S_08_Dmart_english_o0omga.mp4',
        si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787230783/S_08_Dmart_ocktar.mp4',
      };
    }
  } else if (day === 7) {
    // September 07th
    videoUrls = {
      en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787297539/S_07_MP_english_xzc5my.mp4',
      si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787230812/S_07_MP_e6d0wz.mp4',
    };
  } else if (day === 3) {
    // September 03rd
    if (isStarClub) {
      videoUrls = {
        en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787233845/S_03_SC_english_w7gqoh.mp4',
        si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787230926/S_03_SC_yvfsbb.mp4',
      };
    } else {
      // dmart or default
      videoUrls = {
        en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787233851/S_03_Dmart_English_d09nxg.mp4',
        si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787230958/S_03_Dmart_p1yoyw.mp4',
      };
    }
  } else if (day === 2) {
    // September 02nd
    videoUrls = {
      en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787233841/S_02_MP_English_ehm6it.mp4',
      si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787231005/S_02_MP_Sinhala_py4otr.mp4',
    };
  } else if (day === 1) {
    // September 01st
    videoUrls = {
      en: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787233805/S_01_english_Clip_kzled0.mp4',
      si: 'https://res.cloudinary.com/vccpsacloud/video/upload/v1787231083/S_01_Sinhala_Clip_o9abky.mp4',
    };
  }

  const videoUrl = videoUrls[language] || videoUrls.en;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center animate-in fade-in duration-300">
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        onEnded={onVideoEnded}
      />
    </div>
  );
};
