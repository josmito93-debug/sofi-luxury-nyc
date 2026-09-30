import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Disc3, KeyRound, ChevronDown, MapPin, Radio } from 'lucide-react';
import { soundEngine } from '../services/audioEngine';
import { Logo } from './Logo';

interface HeroProps {
  onOpenSpotify: () => void;
  onOpenBooking: () => void;
  onExploreDirectory: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSpotify,
  onOpenBooking,
  onExploreDirectory
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const [nyTime, setNyTime] = useState('');
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    // NYC Live Clock
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setNyTime(formatted + ' EDT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const unsub = soundEngine.subscribe(() => {
      setIsAudioActive(soundEngine.isAmbientPlaying || soundEngine.isSynthPlaying);
    });

    // GSAP Master Reveal
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.1 }
      });

      tl.fromTo(
        logoBoxRef.current,
        { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.3, delay: 0.2 }
      )
      .fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.8'
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 },
        '-=0.7'
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.8'
      )
      .fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.9 },
        '-=0.6'
      )
      .fromTo(
        metaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );
    }, containerRef);

    return () => {
      clearInterval(interval);
      unsub();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-between items-center px-4 sm:px-6 pt-32 sm:pt-36 pb-10 z-10 text-center"
    >
      {/* Central Hero Block */}
      <div className="max-w-4xl mx-auto flex flex-col items-center my-auto">
        {/* Master Animated Official SVG Logo */}
        <div ref={logoBoxRef} className="mb-4 sm:mb-6 flex justify-center">
          <Logo
            className="h-16 sm:h-20 md:h-24 w-auto max-w-[260px] sm:max-w-[340px]"
            glow
            alt="SOFI NYC Official Logo"
          />
        </div>

        {/* Eyebrow Pill */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(212,175,55,0.15)] mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-medium text-gold-200">
            Manhattan Sovereign Hospitality Protocol
          </span>
        </div>

        {/* High-Impact SEO H1 Optimized for Google Ranking */}
        <h1
          ref={headingRef}
          className="font-velora text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.1em] text-white uppercase leading-[1.05] select-none max-w-4xl"
        >
          <span className="block font-sans text-[11px] sm:text-xs md:text-sm tracking-[0.32em] text-gold-300 font-semibold mb-2 uppercase">
            New York Private Access & Concierge
          </span>
          <span>Exclusive Luxury Hotels</span>
          <span className="block font-luxury text-2xl sm:text-4xl md:text-5xl tracking-[0.16em] font-light text-gold-300/90 mt-1.5 lowercase italic">
            & private members clubs
          </span>
        </h1>

        {/* Clean, Modern, Restrained Tagline */}
        <p
          ref={subtextRef}
          className="mt-6 max-w-xl text-white/70 text-xs sm:text-sm md:text-base font-light tracking-[0.04em] leading-relaxed"
        >
          Discreet access to Manhattan's most sovereign sanctuaries, Michelin private salons, and after-hours enclaves. Confidential bookings and cryptographic VIP passes.
        </p>

        {/* THE TWO HERO BUTTONS */}
        <div
          ref={buttonsRef}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none"
        >
          {/* Hero Button 1: Spotify Luxury Player */}
          <button
            onClick={onOpenSpotify}
            className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-obsidian-900/60 hover:bg-obsidian-900/90 backdrop-blur-2xl border border-white/15 hover:border-emerald-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] transition-all duration-500 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                <Disc3 className="w-5 h-5 group-hover:rotate-180 transition-transform duration-1000" />
              </div>
              <div>
                <div className="text-[12px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-white group-hover:text-emerald-300 transition-colors">
                  Spotify Luxury Player
                </div>
                <div className="text-[10px] tracking-[0.12em] text-white/45 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>NYC Deep Lounge & Synth</span>
                </div>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-300">
              <Radio className="w-3.5 h-3.5 text-white/70 group-hover:text-emerald-300" />
            </div>
          </button>

          {/* Hero Button 2: VIP Booking Modal with NYC venues */}
          <button
            onClick={onOpenBooking}
            className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-obsidian-950 font-bold shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-500 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-obsidian-950/15 flex items-center justify-center text-obsidian-950 group-hover:scale-110 transition-transform duration-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[12px] sm:text-[13px] tracking-[0.16em] uppercase text-obsidian-950 font-extrabold">
                  VIP Booking Modal
                </div>
                <div className="text-[10px] tracking-[0.12em] text-obsidian-950/75 font-medium">
                  Direct NYC Venues Access
                </div>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-obsidian-950/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
              <span className="text-xs text-obsidian-950 font-black">↗</span>
            </div>
          </button>
        </div>
      </div>

      {/* Modern Low-Profile Meta Bar */}
      <div
        ref={metaRef}
        className="w-full max-w-4xl pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-white/50"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-gold-400" />
          <span>New York City</span>
          <span className="text-white/20">•</span>
          <span className="text-white/80 font-mono tracking-wider">{nyTime}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="text-white/70">10 Curated Enclaves</span>
          </div>

          <button
            onClick={onExploreDirectory}
            className="flex items-center gap-1 text-gold-300 hover:text-white transition-colors duration-300 font-medium"
          >
            <span>Explore Enclaves</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
