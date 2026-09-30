import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, Radio, Sparkles, Sliders, Music } from 'lucide-react';
import { soundEngine } from '../services/audioEngine';
import { AudioVisualizer } from './AudioVisualizer';
import { SpotifyLogo } from './SpotifyLogo';

interface SpotifyPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const SpotifyPlayerModal: React.FC<SpotifyPlayerModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [activeTab, setActiveTab] = useState<'spotify' | 'synth' | 'ambient'>('spotify');

  useEffect(() => {
    const unsub = soundEngine.subscribe(() => {
      setIsAmbientPlaying(soundEngine.isAmbientPlaying);
      setIsSynthPlaying(soundEngine.isSynthPlaying);
      setVolume(soundEngine.volume);
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  const handleToggleAmbient = async () => {
    await soundEngine.toggleAmbient();
  };

  const handleToggleSynth = () => {
    soundEngine.toggleSynth();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian-950/80 backdrop-blur-2xl transition-all duration-500 animate-fadeIn">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Doppelrand Hardware Bezel Outer Shell */}
      <div className="relative w-full max-w-2xl z-10 doppel-shell shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
        <div className="doppel-core p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/30 flex items-center justify-center">
                <SpotifyLogo className="w-5 h-5" color="#1DB954" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-velora text-lg sm:text-xl tracking-[0.2em] text-white uppercase">
                    SOFI Spotify Lounge
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#1DB954]/10 text-[#1DB954] text-[10px] font-mono tracking-wider border border-[#1DB954]/20">
                    SPOTIFY HI-RES
                  </span>
                </div>
                <p className="text-white/40 text-[11px] tracking-[0.1em] font-light">
                  Curated NYC Nocturne, Live Ambient & Spotify Stream
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all duration-300"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Visualizer & Status Section */}
          <div className="my-6 p-4 rounded-2xl bg-obsidian-950/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse-subtle shadow-[0_0_8px_#D4AF37]" />
              <div className="text-left">
                <div className="text-xs uppercase tracking-[0.16em] text-white font-medium">
                  {isAmbientPlaying || isSynthPlaying ? 'Acoustic Chamber Active' : 'Soundscape Ready'}
                </div>
                <div className="text-[10px] text-white/40 tracking-wider">
                  432Hz Harmonic Frequency • Manhattan Midnight
                </div>
              </div>
            </div>

            <AudioVisualizer
              width={180}
              height={36}
              active={isAmbientPlaying || isSynthPlaying}
            />
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
            <button
              onClick={() => setActiveTab('spotify')}
              className={`py-2 px-3 rounded-lg text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'spotify'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Spotify</span>
            </button>

            <button
              onClick={() => setActiveTab('ambient')}
              className={`py-2 px-3 rounded-lg text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'ambient'
                  ? 'bg-gold-400/20 text-gold-300 border border-gold-400/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Ambient</span>
            </button>

            <button
              onClick={() => setActiveTab('synth')}
              className={`py-2 px-3 rounded-lg text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'synth'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Synth 432Hz</span>
            </button>
          </div>

          {/* Tab Content: Spotify Embed */}
          {activeTab === 'spotify' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-obsidian-950">
                <iframe
                  style={{ borderRadius: '14px' }}
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6?utm_source=generator&theme=0"
                  width="100%"
                  height="280"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Luxury Deep Lounge"
                  className="w-full"
                />
              </div>
              <p className="text-[11px] text-white/40 text-center tracking-wide">
                Direct integration with Spotify Deep Lounge & Manhattan Late Night Selekt.
              </p>
            </div>
          )}

          {/* Tab Content: Local Ambient Master Track */}
          {activeTab === 'ambient' && (
            <div className="p-6 rounded-2xl bg-obsidian-950/70 border border-gold-400/25 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-velora text-base tracking-[0.18em] text-white uppercase">
                    Fifth Avenue Midnight
                  </div>
                  <div className="text-xs text-white/50">
                    Original Master Audio (Local High-Fidelity 32kHz Stereo)
                  </div>
                </div>

                <button
                  onClick={handleToggleAmbient}
                  className={`p-4 rounded-full transition-all duration-300 ${
                    isAmbientPlaying
                      ? 'bg-gold-400 text-obsidian-950 shadow-[0_0_25px_rgba(212,175,55,0.6)] scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  aria-label="Play/Pause Ambient Track"
                >
                  {isAmbientPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-4 pt-2">
                <Volume2 className="w-4 h-4 text-gold-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-gold-400 cursor-pointer h-1.5 bg-white/10 rounded-full"
                />
                <span className="font-mono text-xs text-white/50 w-10 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          )}

          {/* Tab Content: 432Hz Live Synth Drone */}
          {activeTab === 'synth' && (
            <div className="p-6 rounded-2xl bg-obsidian-950/70 border border-purple-500/25 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-velora text-base tracking-[0.18em] text-white uppercase">
                    Subterranean 432Hz Drone
                  </div>
                  <div className="text-xs text-purple-300/60">
                    Real-time Web Audio API dual oscillator harmonic binaural generator
                  </div>
                </div>

                <button
                  onClick={handleToggleSynth}
                  className={`p-4 rounded-full transition-all duration-300 ${
                    isSynthPlaying
                      ? 'bg-purple-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  aria-label="Toggle Synth"
                >
                  {isSynthPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
                </button>
              </div>

              <div className="text-[11px] text-white/50 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                Generates a continuous resonant acoustic field calibrated for deep focus, champagne tastings, and after-hours conversations.
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <Sliders className="w-3.5 h-3.5" />
              <span>Continuous background playback supported</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-gold-300 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300"
            >
              <span>Book Venue With This Soundscape</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
