import React, { useRef, useEffect, useState } from 'react';

interface BackgroundVideoProps {
  opacity?: number;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ opacity = 0.55 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented; video will wait for interaction
        });
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* Absolute Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/preview.jpg"
        onLoadedData={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          filter: 'brightness(0.72) contrast(1.1) saturate(1.05)',
        }}
      >
        <source src="/luxy-bg.mp4" type="video/mp4" />
      </video>

      {/* Fallback image when video loading */}
      {!isVideoLoaded && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: 'url(/preview.jpg)', filter: 'brightness(0.6)' }}
        />
      )}

      {/* Luxury Vignette & Deep Radial Gradients */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at 50% 35%, rgba(4, 4, 6, 0.35) 0%, rgba(4, 4, 6, 0.75) 60%, rgba(4, 4, 6, 0.96) 100%)'
        }}
      />

      {/* Atmospheric Top & Bottom Shadow Gradients for perfect legibility */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#040406] via-[#040406]/60 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#040406] via-[#040406]/80 to-transparent" />

      {/* Subtle Gold Dust Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold-400/[0.04] blur-[140px] rounded-full" />
    </div>
  );
};
