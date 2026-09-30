import React, { useState } from 'react';
import { Venue, NYC_VENUES } from '../data/venues';
import { Sparkles, MapPin } from 'lucide-react';

interface VenueDirectoryProps {
  onReserveVenue: (venueName: string) => void;
  onOpenBooking: () => void;
}

export const VenueDirectory: React.FC<VenueDirectoryProps> = ({
  onReserveVenue,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'hotels' | 'clubs' | 'lounges' | 'sanctuaries'>('all');

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
    <section id="directory" className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-7xl mx-auto">
      {/* Section Header: Minimal, Clean, Modern */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-gold-300 text-[10px] tracking-[0.24em] uppercase mb-3">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Curated Manhattan Sanctuaries</span>
          </div>
          <h2 className="font-velora text-3xl sm:text-4xl text-white tracking-[0.14em] uppercase">
            Directory of Enclaves
          </h2>
          <p className="mt-1.5 text-white/50 text-xs sm:text-sm tracking-wide max-w-md">
            Click any enclave to request sovereign placement in the VIP Reservation protocol.
          </p>
        </div>

        {/* Filter Pills with Subtle Architectural Radius (not overly rounded) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as typeof activeFilter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-[0.14em] font-medium transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'bg-gold-400 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Venues Grid with Doppelrand Hardware Cards (Clean, NO repetitive reserve buttons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            onClick={() => onReserveVenue(venue.name)}
            className="group cursor-pointer doppel-shell flex flex-col h-full transform-gpu transition-all duration-500 hover:-translate-y-1.5"
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
                    (e.target as HTMLImageElement).src = '/preview.jpg';
                  }}
                />
                
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-obsidian-950/80 backdrop-blur-md border border-white/15 text-[10px] uppercase font-mono tracking-widest text-gold-300 font-semibold">
                    {venue.accessTier}
                  </span>

                  <span className="px-2.5 py-1 rounded-md bg-obsidian-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-white/80">
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
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-luxury text-2xl text-white tracking-wide group-hover:text-gold-200 transition-colors">
                      {venue.name}
                    </h3>
                    <span className="text-white/30 text-xs group-hover:text-gold-300 group-hover:translate-x-0.5 transition-all">
                      ↗
                    </span>
                  </div>
                  <p className="mt-1.5 text-white/60 text-xs leading-relaxed font-light line-clamp-2">
                    {venue.tagline}
                  </p>
                </div>

                {/* Discreet Privileges Pills */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {venue.privileges.slice(0, 2).map((priv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-white/50 text-[10px] tracking-wide"
                    >
                      ✦ {priv}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
