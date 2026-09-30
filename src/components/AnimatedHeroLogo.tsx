import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedHeroLogoProps {
  onIntroComplete?: () => void;
}

export const AnimatedHeroLogo: React.FC<AnimatedHeroLogoProps> = ({ onIntroComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          if (onIntroComplete) onIntroComplete();
        }
      });

      // Step 1: Luminous Ambient Bloom
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 0.85, scale: 1.15, duration: 1.5, ease: 'power2.out' },
        0
      )
      // Step 2: SVG Logo scales & illuminates in center
      .fromTo(
        logoWrapperRef.current,
        {
          opacity: 0,
          scale: 0.82,
          y: 20,
          filter: 'blur(16px) drop-shadow(0 0 0px rgba(212,175,55,0))'
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px) drop-shadow(0 0 45px rgba(212,175,55,0.65))',
          duration: 1.6,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)'
        },
        0.1
      )
      // Step 3: Laser Shimmer sweep across the SVG
      .fromTo(
        shimmerRef.current,
        { x: '-100%', opacity: 0 },
        { x: '100%', opacity: 0.9, duration: 1.3, ease: 'power2.inOut' },
        0.5
      )
      // Step 4: Golden Signature Line beneath
      .fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.9, duration: 1.1, ease: 'power3.inOut' },
        0.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onIntroComplete]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center my-4 sm:my-6 select-none"
    >
      {/* Background Volumetric Gold Aura */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] md:w-[800px] h-[150px] sm:h-[300px] bg-gold-400/25 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Main Large Centered SVG Logo */}
      <div
        ref={logoWrapperRef}
        className="relative z-10 w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-4 flex justify-center overflow-hidden"
      >
        {/* Shimmer light sweep bar */}
        <div
          ref={shimmerRef}
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
          style={{ mixBlendMode: 'overlay' }}
        />

        <img
          src="/logo.svg"
          alt="SOFI NYC — Sovereign Hospitality Protocol"
          className="w-full h-auto object-contain max-h-[140px] sm:max-h-[190px] md:max-h-[240px] lg:max-h-[280px]"
          loading="eager"
        />
      </div>

      {/* Golden Expanding Signature Line */}
      <div
        ref={lineRef}
        className="w-36 sm:w-64 md:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mt-4 sm:mt-6 origin-center"
      />
    </div>
  );
};
