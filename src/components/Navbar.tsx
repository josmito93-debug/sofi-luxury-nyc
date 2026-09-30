import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X, Disc3 } from 'lucide-react';
import { soundEngine } from '../services/audioEngine';

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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAudioToggle = async () => {
    await soundEngine.toggleAmbient();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 sm:pt-6 pointer-events-none flex justify-center">
      {/* Floating Island Glass Pill */}
      <nav
        className={`pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/10 ${
          scrolled
            ? 'bg-obsidian-950/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
            : 'bg-obsidian-900/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
        } max-w-4xl w-full`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group cursor-pointer select-none">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse-subtle shadow-[0_0_10px_#D4AF37]" />
          <span className="font-velora text-xl sm:text-2xl tracking-[0.25em] text-white group-hover:text-gold-300 transition-colors uppercase">
            SOFI
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-medium pl-1 border-l border-white/10 hidden sm:inline-block">
            NYC
          </span>
        </a>

        {/* Center Links (Minimal, clean, discreet) */}
        <div className="hidden md:flex items-center gap-6 text-[12px] uppercase tracking-[0.2em] text-white/60 font-medium">
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

          {/* Spotify Luxury Button */}
          <button
            onClick={onOpenSpotify}
            aria-label="Spotify Luxury Player"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 text-white/80 hover:text-emerald-300 transition-all duration-300 flex items-center gap-1.5 group"
            title="Open Spotify Luxury Player"
          >
            <Disc3 className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-180 transition-transform duration-700" />
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

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/[0.05] border border-white/10 text-white/80"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[76px] bg-obsidian-950/95 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between border-t border-white/10 pointer-events-auto">
          <div className="space-y-6 pt-6 text-center">
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-velora text-2xl tracking-[0.2em] text-white hover:text-gold-300 py-2"
            >
              Enclaves
            </a>
            <a
              href="#directory"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-velora text-2xl tracking-[0.2em] text-white hover:text-gold-300 py-2"
            >
              Directory
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSpotify();
              }}
              className="block w-full font-velora text-2xl tracking-[0.2em] text-emerald-300 py-2"
            >
              Spotify Player
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPass();
              }}
              className="block w-full font-velora text-2xl tracking-[0.2em] text-gold-300 py-2"
            >
              Digital VIP Pass
            </button>
          </div>

          <div className="pb-12 text-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 rounded-full bg-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Request VIP Access
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
