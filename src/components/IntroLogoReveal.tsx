import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroLogoRevealProps {
  onComplete: () => void;
}

export const IntroLogoReveal: React.FC<IntroLogoRevealProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if session already played intro to keep browsing fluid
    const hasSeenIntro = sessionStorage.getItem('sofi_intro_seen');
    if (hasSeenIntro) {
      setVisible(false);
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        sessionStorage.setItem('sofi_intro_seen', 'true');
        // Smoothly fade out container
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: () => {
            setVisible(false);
            onComplete();
          }
        });
      }
    });

    // Animate glow and logo
    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 0.7, scale: 1.2, duration: 1.4, ease: 'power2.out' },
      0
    )
    .fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.85, filter: 'blur(12px) drop-shadow(0 0 0px #D4AF37)' },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px) drop-shadow(0 0 35px rgba(212,175,55,0.7))',
        duration: 1.5,
        ease: 'power3.out'
      },
      0.1
    )
    .fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.0, ease: 'power2.inOut' },
      0.6
    )
    .fromTo(
      textRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.9
    )
    // Hold momentarily for cinematic luxury impression
    .to({}, { duration: 0.6 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040406] px-6 select-none overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[300px] rounded-full bg-gold-400/20 blur-[130px] pointer-events-none"
      />

      {/* Main Animated Logo */}
      <div ref={logoRef} className="relative z-10 max-w-lg sm:max-w-xl md:max-w-2xl w-full flex justify-center px-4">
        <img
          src="/logo.svg"
          alt="SOFI NYC"
          className="w-full h-auto object-contain max-h-[160px] sm:max-h-[220px]"
        />
      </div>

      {/* Golden Expanding Horizon Line */}
      <div
        ref={lineRef}
        className="w-48 sm:w-72 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mt-8 origin-center"
      />

      {/* Subtext */}
      <div
        ref={textRef}
        className="mt-4 text-center"
      >
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-white/60 font-medium font-mono">
          New York Sovereign Enclaves
        </span>
      </div>
    </div>
  );
};
