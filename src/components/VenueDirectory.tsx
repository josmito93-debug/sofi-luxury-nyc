import React, { useState } from 'react';
import { Venue, NYC_VENUES } from '../data/venues';
import { KeyRound, Shield, Sparkles, MapPin, ChevronRight, Info } from 'lucide-react';

interface VenueDirectoryProps {
  onReserveVenue: (venueId: string) => void;
  onOpenBooking: () => void;
}

export const VenueDirectory: React.FC<VenueDirectoryProps> = ({
  onReserveVenue,
  onOpenBooking
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'hotels' | 'clubs' | 'lounges' | 'sanctuaries'>('all');
  const [activeDetailVenue, setActiveDetailVenue] = useState<Venue | null>(null);

  const filteredVenues = activeFilter === 'all'
    ? NYC_VENUES
    : NYC_VENUES.filter(v => v.category === activeFilter);

  const categories = [
    { id: 'all', label: 'All Enclaves' },
    { id: 'hotels', label: 'Luxury Hotels' },
    { id: 'clubs', label: 'Members Clubs' },
    { id: 'lounges', label: 'Nocturne Lounges' },
    { id: 'sanctuaries', label: 'Sanctuaries' },
  ];

  return (
    <section id="directory" className="relative z-10 px-4 sm:px-6 lg:px-8 py-24 sm:py-32 max-w-7xl mx-auto">
      {/* Section Header: Minimal, Clean, Modern */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-gold-300 text-[10px] tracking-[0.24em] uppercase mb-4">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Curated Manhattan Sanctuaries</span>
          </div>
          <h2 className="font-velora text-3xl sm:text-4xl md:text-5xl text-white tracking-[0.14em] uppercase">
            Directory of Enclaves
          </h2>
          <p className="mt-2 text-white/50 text-xs sm:text-sm tracking-wide max-w-md">
            Hand-vetted hotels, private societies, and subterranean vaults with direct concierge dispatch.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/[0.03] border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as typeof activeFilter)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-gold-400 text-obsidian-950 font-bold shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Venues Grid with Doppelrand Hardware Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-12">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            className="group doppel-shell flex flex-col h-full transform-gpu transition-all duration-500 hover:-translate-y-1.5"
          >
            <div className="doppel-core p-5 sm:p-6 flex flex-col justify-between h-full overflow-hidden">
              {/* Card Image Enclosure */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-obsidian-950 mb-5 border border-white/10">
                <img
                  src={venue.image}
                  alt={venue.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to preview image if external URL fails
                    (e.target as HTMLImageElement).src = '/preview.jpg';
                  }}
                />
                
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-white/15 text-[10px] uppercase font-mono tracking-widest text-gold-300 font-semibold">
                    {venue.accessTier}
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-white/80">
                    {venue.rating}
                  </span>
                </div>

                {/* Bottom Overlay Location */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80 text-[11px] font-medium tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span className="truncate">{venue.neighborhood}</span>
                </div>
              </div>

              {/* Card Typography & Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-luxury text-2xl text-white tracking-wide group-hover:text-gold-200 transition-colors">
                    {venue.name}
                  </h3>
                  <p className="mt-1.5 text-white/60 text-xs leading-relaxed font-light line-clamp-2">
                    {venue.tagline}
                  </p>
                </div>

                {/* Discreet Privileges Pills */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {venue.privileges.slice(0, 2).map((priv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-white/50 text-[10px] tracking-wide"
                    >
                      ✦ {priv}
                    </span>
                  ))}
                </div>

                {/* Interactive Card Buttons */}
                <div className="mt-6 pt-2 flex items-center gap-2">
                  {/* Reserve Action Button-in-Button */}
                  <button
                    onClick={() => onReserveVenue(venue.id)}
                    className="flex-1 inline-flex items-center justify-between px-4 py-2.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-obsidian-950 font-bold text-[11px] tracking-[0.16em] uppercase shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all duration-300 active:scale-[0.98]"
                  >
                    <span>Reserve Access</span>
                    <div className="w-5 h-5 rounded-full bg-obsidian-950/20 flex items-center justify-center">
                      <span className="text-[10px] font-black">↗</span>
                    </div>
                  </button>

                  {/* Detail Info Quick Button */}
                  <button
                    onClick={() => setActiveDetailVenue(venue)}
                    className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/60 hover:text-white transition-colors"
                    title="View Curator Dossier"
                    aria-label="View Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Venue Detail Dossier Modal */}
      {activeDetailVenue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian-950/85 backdrop-blur-2xl transition-all duration-500 animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setActiveDetailVenue(null)} />
          
          <div className="relative w-full max-w-2xl z-10 doppel-shell shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
            <div className="doppel-core p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold-300 font-mono">
                    Enclave Dossier • {activeDetailVenue.accessTier}
                  </span>
                  <h3 className="font-luxury text-2xl sm:text-3xl text-white mt-1">
                    {activeDetailVenue.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveDetailVenue(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="my-6 space-y-4">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={activeDetailVenue.image}
                    alt={activeDetailVenue.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">
                    Curator’s Confidential Note
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light">
                    {activeDetailVenue.curatorNote}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 block">Address</span>
                    <span className="text-xs text-white/90 mt-1 block">{activeDetailVenue.location}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 block">Dress Protocol</span>
                    <span className="text-xs text-gold-200 mt-1 block">{activeDetailVenue.dressCode}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 block mb-2">
                    Sovereign Privileges
                  </span>
                  <div className="space-y-2">
                    {activeDetailVenue.privileges.map((priv, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                        <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
                        <span>{priv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    const id = activeDetailVenue.id;
                    setActiveDetailVenue(null);
                    onReserveVenue(id);
                  }}
                  className="px-6 py-3 rounded-full bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-[0.18em] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  Book Private Access ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
