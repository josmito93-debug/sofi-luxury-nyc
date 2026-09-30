import React, { useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VenueDirectory } from './components/VenueDirectory';
import { SpotifyPlayerModal } from './components/SpotifyPlayerModal';
import { BookingModal } from './components/BookingModal';
import { VipPassModal } from './components/VipPassModal';
import { SoundscapeBar } from './components/SoundscapeBar';
import { Sparkles, Shield, KeyRound, Radio } from 'lucide-react';

export function App() {
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState<string | undefined>(undefined);
  const [passData, setPassData] = useState<{
    passholderName: string;
    venueName: string;
    tier: string;
    date: string;
    guests: number;
    serial: string;
  } | null>(null);

  const handleOpenBooking = (venueId?: string) => {
    if (venueId) {
      setSelectedVenueId(venueId);
    }
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (data: {
    passholderName: string;
    venueName: string;
    tier: string;
    date: string;
    guests: number;
    serial: string;
  }) => {
    setPassData(data);
    setIsPassOpen(true);
  };

  const handleExploreDirectory = () => {
    const el = document.getElementById('directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-white bg-obsidian-950 font-sans selection:bg-gold-400 selection:text-black">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Absolute Video Background: luxy-bg.mp4 */}
      <BackgroundVideo />

      {/* Floating Island Header Navigation */}
      <Navbar
        onOpenSpotify={() => setIsSpotifyOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPass={() => setIsPassOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section with The Two Hero Buttons */}
        <Hero
          onOpenSpotify={() => setIsSpotifyOpen(true)}
          onOpenBooking={() => handleOpenBooking()}
          onExploreDirectory={handleExploreDirectory}
        />

        {/* Minimal Luxury Triad Feature Strip */}
        <section id="showcase" className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto w-full py-16 sm:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="doppel-shell">
              <div className="doppel-core p-6 flex flex-col justify-between">
                <div className="w-9 h-9 rounded-full bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-400 mb-4">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="font-velora text-lg uppercase tracking-[0.16em] text-white">
                  Sovereign Discretion
                </h3>
                <p className="mt-2 text-white/50 text-xs leading-relaxed font-light">
                  Direct table placement and vault access without public reservations or queuing.
                </p>
              </div>
            </div>

            <div className="doppel-shell">
              <div className="doppel-core p-6 flex flex-col justify-between">
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4">
                  <Radio className="w-4 h-4" />
                </div>
                <h3 className="font-velora text-lg uppercase tracking-[0.16em] text-white">
                  Acoustic Soundscapes
                </h3>
                <p className="mt-2 text-white/50 text-xs leading-relaxed font-light">
                  Binaural 432Hz harmonic tones synchronized with Manhattan after-hours playlists.
                </p>
              </div>
            </div>

            <div className="doppel-shell">
              <div className="doppel-core p-6 flex flex-col justify-between">
                <div className="w-9 h-9 rounded-full bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-gold-400 mb-4">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="font-velora text-lg uppercase tracking-[0.16em] text-white">
                  Cryptographic Pass
                </h3>
                <p className="mt-2 text-white/50 text-xs leading-relaxed font-light">
                  Dynamically minted digital credentials with verified security verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive NYC Luxury Directory */}
        <VenueDirectory
          onReserveVenue={(id) => handleOpenBooking(id)}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Minimal Editorial Closing Banner */}
        <section className="relative z-10 px-4 sm:px-6 py-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] uppercase tracking-[0.25em] text-gold-300 mb-6">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Manhattan Society</span>
          </div>

          <h2 className="font-velora text-3xl sm:text-5xl tracking-[0.16em] text-white uppercase leading-tight">
            Reserve Your Place in the City
          </h2>
          <p className="mt-4 text-white/60 text-xs sm:text-sm tracking-wide max-w-md mx-auto font-light">
            Concierge dispatch available 24/7 across all verified Manhattan sanctuaries.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => handleOpenBooking()}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.2em] text-xs shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-[0.98]"
            >
              <span>Request Sovereign Invitation</span>
              <span className="text-sm font-black">↗</span>
            </button>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 px-4 sm:px-8 text-center sm:text-left">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-[11px] uppercase tracking-[0.18em]">
          <div className="flex items-center gap-2">
            <span className="font-velora text-white text-sm tracking-[0.2em]">SOFI NYC</span>
            <span>•</span>
            <span>40.7128° N, 74.0060° W</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} SOFI Sovereign Access Protocol. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Floating Soundscape Controller */}
      <SoundscapeBar onOpenPlayer={() => setIsSpotifyOpen(true)} />

      {/* Modals */}
      <SpotifyPlayerModal
        isOpen={isSpotifyOpen}
        onClose={() => setIsSpotifyOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedVenueId={selectedVenueId}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <VipPassModal
        isOpen={isPassOpen}
        onClose={() => setIsPassOpen(false)}
        passData={passData}
      />
    </div>
  );
}

export default App;
