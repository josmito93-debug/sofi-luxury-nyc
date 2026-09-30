import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { KeyRound, ChevronDown, MapPin, Radio } from 'lucide-react';
import { SpotifyLogo } from './SpotifyLogo';

interface HeroProps {
  onOpenSpotify: () => void;
  onOpenBooking: () => void;
  onExploreDirectory: () => void;
}

// Isolated Live Clock so 1s interval does NOT re-render Hero
const LiveClock: React.FC = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now) + ' EDT'
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-white/80 font-mono tracking-wider">{time}</span>;
};

export const Hero: React.FC<HeroProps> = ({
  onOpenSpotify,
  onOpenBooking,
  onExploreDirectory
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Single, master GSAP entrance timeline - runs ONCE on mount
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // 1. The Large Centered SVG Logo Enters First
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.88, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: 'power3.out'
        }
      )
      // 2. "Luego lo demás": Eyebrow Badge
      .fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.6'
      )
      // 3. SEO H1 Heading
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.5'
      )
      // 4. Subtext Tagline
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      // 5. The Two Hero Buttons
      .fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 15, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8 },
        '-=0.5'
      )
      // 6. Meta Bar
      .fromTo(
        metaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-between items-center px-4 sm:px-6 pt-24 sm:pt-28 pb-10 z-10 text-center"
    >
      {/* Central Hero Block */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center my-auto">
        {/* 1. THE LARGE CENTERED SVG LOGO IN THE MIDDLE */}
        <div
          ref={logoRef}
          className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl px-4 flex justify-center items-center my-2 sm:my-4 select-none"
        >
          {/* Ambient Volumetric Gold Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] md:w-[700px] h-[140px] sm:h-[220px] bg-gold-400/20 blur-[100px] rounded-full pointer-events-none" />

          <img
            src="/logo.svg"
            alt="SOFI NYC — Sovereign Hospitality Protocol"
            className="relative z-10 w-full h-auto object-contain max-h-[140px] sm:max-h-[190px] md:max-h-[230px] lg:max-h-[270px] drop-shadow-[0_0_35px_rgba(212,175,55,0.55)]"
            loading="eager"
          />
        </div>

        {/* 2. Eyebrow Pill */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(212,175,55,0.15)] mt-3 mb-4 sm:mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-medium text-gold-200">
            Manhattan Sovereign Hospitality Protocol
          </span>
        </div>

        {/* 3. SEO-Optimized H1 for Google Ranking */}
        <h1
          ref={headingRef}
          className="font-velora text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.08em] text-white uppercase leading-[1.05] select-none max-w-4xl mx-auto"
        >
          <span className="block font-sans text-[11px] sm:text-xs md:text-sm tracking-[0.32em] text-gold-300 font-semibold mb-2 uppercase">
            New York Private Access & Luxury Concierge
          </span>
          <span>Exclusive Luxury Hotels</span>
          <span className="block font-luxury text-2xl sm:text-4xl md:text-5xl tracking-[0.16em] font-light text-gold-300/90 mt-1.5 lowercase italic">
            & private members clubs
          </span>
        </h1>

        {/* 4. Refined Editorial Subtext */}
        <p
          ref={subtextRef}
          className="mt-5 max-w-xl text-white/70 text-xs sm:text-sm md:text-base font-light tracking-[0.04em] leading-relaxed mx-auto"
        >
          Discreet access to Manhattan's most sovereign sanctuaries, Michelin private salons, and after-hours enclaves. Confidential bookings and cryptographic VIP passes.
        </p>

        {/* 5. The Two Hero Buttons with Original Spotify Logo */}
        <div
          ref={buttonsRef}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none mx-auto"
        >
          {/* Hero Button 1: Spotify Luxury Player */}
          <button
            onClick={onOpenSpotify}
            className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-obsidian-900/70 hover:bg-obsidian-900/95 backdrop-blur-2xl border border-white/15 hover:border-[#1DB954]/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(29,185,84,0.3)] transition-all duration-500 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <SpotifyLogo className="w-5 h-5" color="#1DB954" />
              </div>
              <div>
                <div className="text-[12px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-white group-hover:text-[#1DB954] transition-colors">
                  Spotify Luxury Player
                </div>
                <div className="text-[10px] tracking-[0.12em] text-white/45 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
                  <span>NYC Deep Lounge & Synth</span>
                </div>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-[#1DB954]/20 group-hover:border-[#1DB954]/50 transition-all duration-300">
              <Radio className="w-3.5 h-3.5 text-white/70 group-hover:text-[#1DB954]" />
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

      {/* 6. Modern Low-Profile Meta Bar */}
      <div
        ref={metaRef}
        className="w-full max-w-4xl pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-white/50"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-gold-400" />
          <span>New York City</span>
          <span className="text-white/20">•</span>
          <LiveClock />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
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
