'use client';

import React from 'react';

export const VideoThankYouView: React.FC = () => {
  const videoUrl =
    'https://res.cloudinary.com/vccpsacloud/video/upload/v1774428895/9329508-uhd_2160_4096_25fps_nitgxj.mp4';

  return (
    <div className="fixed inset-0 z-50 w-full h-[100svh] max-h-[100svh] overflow-hidden bg-black select-none">
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};
