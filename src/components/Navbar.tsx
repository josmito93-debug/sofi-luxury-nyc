import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X } from 'lucide-react';
import { soundEngine } from '../services/audioEngine';
import { Logo } from './Logo';
import { SpotifyLogo } from './SpotifyLogo';

interface NavbarProps {
  onOpenSpotify: () => void;
  onOpenBooking: () => void;
  onOpenPass: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSpotify, onOpenBooking, onOpenPass }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = soundEngine.subscribe(() => {
      setIsPlaying(soundEngine.isAmbientPlaying || soundEngine.isSynthPlaying);
    });
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleAudioToggle = async () => {
    await soundEngine.toggleAmbient();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-obsidian-950/90 backdrop-blur-2xl border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
            : 'bg-obsidian-950/40 backdrop-blur-md border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
          {/* Brand Logo with Official SVG */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer select-none">
            <Logo className="h-7 sm:h-8 w-auto" glow />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium pl-2 border-l border-white/10 hidden sm:inline-block">
              NYC
            </span>
          </a>

          {/* Center Links (Flush & Modern) */}
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.22em] text-white/60 font-medium">
            <a href="#showcase" className="hover:text-white transition-colors duration-300">
              Enclaves
            </a>
            <a href="#directory" className="hover:text-white transition-colors duration-300">
              Directory
            </a>
            <button
              onClick={onOpenSpotify}
              className="hover:text-gold-300 transition-colors duration-300 flex items-center gap-1.5"
            >
              <span>Soundscape</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </button>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Quick Soundscape Button */}
            <button
              onClick={handleAudioToggle}
              aria-label="Toggle Soundscape"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-gold-400/40 text-white/80 hover:text-gold-300 transition-all duration-300 flex items-center gap-2 group"
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                  <span className="text-[10px] tracking-[0.18em] uppercase hidden lg:inline-block text-gold-300">
                    Live
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  <span className="text-[10px] tracking-[0.18em] uppercase hidden lg:inline-block text-white/50">
                    Audio
                  </span>
                </>
              )}
            </button>

            {/* Spotify Luxury Button with Original Spotify Logo */}
            <button
              onClick={onOpenSpotify}
              aria-label="Spotify Luxury Player"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#1DB954]/50 text-white/80 hover:text-[#1DB954] transition-all duration-300 flex items-center gap-1.5 group"
              title="Open Spotify Luxury Player"
            >
              <SpotifyLogo className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" color="#1DB954" />
              <span className="text-[10px] tracking-[0.18em] uppercase hidden lg:inline-block text-white/70">
                Player
              </span>
            </button>

            {/* Digital VIP Pass button */}
            <button
              onClick={onOpenPass}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-gold-400/30 text-white/80 hover:text-white transition-all duration-300 text-[11px] tracking-[0.15em] uppercase font-medium"
            >
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Pass</span>
            </button>

            {/* Primary Action Button-in-Button */}
            <button
              onClick={onOpenBooking}
              className="group relative inline-flex items-center gap-2 pl-3.5 sm:pl-4 pr-1.5 sm:pr-2 py-1.5 rounded-full bg-gradient-to-r from-gold-400/90 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-obsidian-950 font-semibold text-[11px] sm:text-[12px] tracking-[0.18em] uppercase shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 active:scale-[0.98]"
            >
              <span>VIP Access</span>
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-obsidian-950/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <span className="text-[10px] text-obsidian-950 font-bold leading-none">↗</span>
              </div>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full bg-white/[0.05] border border-white/10 text-white/80"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL SOLID BLACK OVERLAY MENU ("TODO FONDO NEGRO") */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 w-full h-[100dvh] bg-[#000000] z-50 flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn select-none">
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-auto" glow />
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 pl-2 border-l border-white/10 font-mono">
                NYC ENCLAVES
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Central Navigation Links */}
          <div className="my-auto py-8 space-y-7 text-center">
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-velora text-3xl tracking-[0.2em] text-white hover:text-gold-300 transition-colors uppercase"
            >
              Enclaves
            </a>
            <a
              href="#directory"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-velora text-3xl tracking-[0.2em] text-white hover:text-gold-300 transition-colors uppercase"
            >
              Directory
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSpotify();
              }}
              className="inline-flex items-center gap-2.5 font-velora text-3xl tracking-[0.2em] text-emerald-400 hover:text-emerald-300 transition-colors uppercase"
            >
              <SpotifyLogo className="w-6 h-6" color="#1DB954" />
              <span>Spotify Player</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPass();
              }}
              className="inline-flex items-center gap-2.5 font-velora text-3xl tracking-[0.2em] text-gold-300 hover:text-gold-200 transition-colors uppercase"
            >
              <Sparkles className="w-5 h-5 text-gold-400" />
              <span>Digital VIP Pass</span>
            </button>
          </div>

          {/* Bottom Area: Social Icons & Action */}
          <div className="pt-6 border-t border-white/10 space-y-5">
            {/* Direct Social Links */}
            <div className="flex items-center justify-center gap-6 text-white/50">
              <a
                href="https://www.instagram.com/sofiasarlat/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-300 transition-colors p-1"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://open.spotify.com/user/sofia.gabrielle?si=06b7a07e8865442e"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors p-1"
                aria-label="Spotify"
              >
                <SpotifyLogo className="w-5 h-5" color="currentColor" />
              </a>
              <a
                href="https://www.youtube.com/@sofiasarlat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-300 transition-colors p-1"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.sofiasarlat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-300 transition-colors p-1"
                aria-label="Website"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/sofia-sarlat-40a759101/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-300 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

            {/* VIP Booking CTA */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-obsidian-950 font-bold uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-transform active:scale-[0.98]"
            >
              Request Sovereign Access ↗
            </button>
          </div>
        </div>
      )}
    </>
  );
};
