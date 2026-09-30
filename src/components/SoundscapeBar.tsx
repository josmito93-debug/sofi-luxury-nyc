import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { soundEngine } from '../services/audioEngine';
import { AudioVisualizer } from './AudioVisualizer';
import { SpotifyLogo } from './SpotifyLogo';

interface SoundscapeBarProps {
  onOpenPlayer: () => void;
}

export const SoundscapeBar: React.FC<SoundscapeBarProps> = ({ onOpenPlayer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLabel, setActiveLabel] = useState('NYC Nocturne');

  useEffect(() => {
    const unsub = soundEngine.subscribe(() => {
      const active = soundEngine.isAmbientPlaying || soundEngine.isSynthPlaying;
      setIsPlaying(active);
      if (soundEngine.isSynthPlaying && soundEngine.isAmbientPlaying) {
        setActiveLabel('Fifth Ave + 432Hz Synth');
      } else if (soundEngine.isSynthPlaying) {
        setActiveLabel('432Hz Binaural Drone');
      } else if (soundEngine.isAmbientPlaying) {
        setActiveLabel('Fifth Ave Midnight');
      } else {
        setActiveLabel('NYC Nocturne Soundscape');
      }
    });
    return unsub;
  }, []);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await soundEngine.toggleAmbient();
  };

  return (
    <aside 
      aria-label="Audio player controls"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 pointer-events-none"
    >
      <div
        onClick={onOpenPlayer}
        className="pointer-events-auto group cursor-pointer flex items-center gap-3.5 px-3.5 py-2.5 rounded-full bg-obsidian-950/70 hover:bg-obsidian-950/90 backdrop-blur-2xl border border-white/10 hover:border-gold-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-[1.02]"
      >
        {/* Animated Spotify / Audio Indicator */}
        <div className="relative">
          <div className={`w-8 h-8 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 flex items-center justify-center ${
            isPlaying ? 'scale-105' : ''
          }`}>
            <SpotifyLogo className="w-4 h-4" color="#1DB954" />
          </div>
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
          )}
        </div>

        {/* Text Info */}
        <div className="hidden sm:block text-left pr-1">
          <div className="text-[11px] uppercase tracking-[0.16em] text-white font-medium group-hover:text-gold-300 transition-colors">
            {activeLabel}
          </div>
          <div className="text-[9px] text-white/40 tracking-wider">
            {isPlaying ? 'Spatial Audio Active' : 'Click to Immerse'}
          </div>
        </div>

        {/* Live Audio Visualizer */}
        <div className="hidden md:block">
          <AudioVisualizer width={70} height={20} active={isPlaying} />
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handleToggle}
          className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
        >
          {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-gold-400" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Expand Indicator */}
        <button
          className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 group-hover:text-gold-300 transition-colors hidden sm:block"
          aria-label="Expand Soundscape Modal"
        >
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
