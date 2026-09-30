export interface Venue {
  id: string;
  name: string;
  category: 'hotels' | 'clubs' | 'lounges' | 'sanctuaries';
  neighborhood: string;
  location: string;
  tagline: string;
  accessTier: 'Sovereign' | 'Reserve' | 'Private Member' | 'Black Tier';
  image: string;
  curatorNote: string;
  privileges: string[];
  dressCode: string;
  rating: string;
  priceIndicator: string;
  coordinates: { lat: number; lng: number };
}

export const NYC_VENUES: Venue[] = [
  {
    id: 'aman-ny',
    name: 'Aman New York',
    category: 'hotels',
    neighborhood: 'Fifth Avenue',
    location: 'Crown Building, 730 5th Ave',
    tagline: 'Crown Building tranquility with 3-story subterranean spa.',
    accessTier: 'Sovereign',
    image: '/preview.jpg',
    curatorNote: 'Architect Jean-Michel Gathy’s masterwork. Year-round garden terrace with fire pits.',
    privileges: ['Private Subterranean Spa Suite', 'Jazz Club Priority Seating', 'Chauffeured Maybach Fleet'],
    dressCode: 'Effortless Modern Elegance',
    rating: '5.0 ★ Sovereign',
    priceIndicator: '$$$$$',
    coordinates: { lat: 40.7629, lng: -73.9744 }
  },
  {
    id: 'casa-cipriani',
    name: 'Casa Cipriani',
    category: 'clubs',
    neighborhood: 'Battery Maritime',
    location: '10 South St, Historic Ferry Terminal',
    tagline: 'Beaux-Arts maritime private club overlooking New York Harbor.',
    accessTier: 'Private Member',
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d27f8842?q=80&w=1200&auto=format&fit=crop',
    curatorNote: 'Grand salon with lacquered wood and nautical brass details. Intimate Bellini veranda.',
    privileges: ['Private Dock Access', 'Presidential Waterfront Suite', 'VIP Bellini Lounge Concierge'],
    dressCode: 'Sophisticated Formal',
    rating: '4.9 ★ Member Club',
    priceIndicator: '$$$$$',
    coordinates: { lat: 40.7013, lng: -74.0091 }
  },
  {
    id: 'the-carlyle',
    name: 'The Carlyle',
    category: 'hotels',
    neighborhood: 'Upper East Side',
    location: '35 E 76th St at Madison Ave',
    tagline: 'Legendary Rosewood landmark and home of Bemelmans Bar.',
    accessTier: 'Black Tier',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    curatorNote: 'Ludwig Bemelmans whimsical murals, live jazz piano, white-gloved Upper East Side timelessness.',
    privileges: ['Reserved Bemelmans Corner Banquette', 'Valmont Spa Priority', 'Bespoke Monogrammed Robes'],
    dressCode: 'Tailored Chic',
    rating: '4.9 ★ Heritage',
    priceIndicator: '$$$$$',
    coordinates: { lat: 40.7744, lng: -73.9632 }
  },
  {
    id: 'zero-bond',
    name: 'Zero Bond',
    category: 'clubs',
    neighborhood: 'NoHo',
    location: '0 Bond St, Historic Industrial Loft',
    tagline: 'Curated creative sanctuary housing multimillion-dollar contemporary art.',
    accessTier: 'Private Member',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    curatorNote: 'Warhol and Basquiat originals line the brick archways. Baccarat crystal barware.',
    privileges: ['Private Omakase Room', 'Founders Salon Access', 'Direct Art Advisory Preview'],
    dressCode: 'Avant-Garde Discretion',
    rating: '4.9 ★ Exclusive',
    priceIndicator: '$$$$$',
    coordinates: { lat: 40.7258, lng: -73.9934 }
  },
  {
    id: 'baccarat-hotel',
    name: 'Baccarat Hotel',
    category: 'hotels',
    neighborhood: 'Midtown West',
    location: '28 W 53rd St, Off 5th Ave',
    tagline: 'Prismatic crystal luminescence with Parisian Grand Salon refinement.',
    accessTier: 'Sovereign',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
    curatorNote: 'Over 15,000 crystal pieces, vintage Dom Pérignon cellar, and Spa de La Mer treatments.',
    privileges: ['Spa de La Mer Diamond Cabana', 'Grand Salon Tea Service', 'House Vintage Champagne Courier'],
    dressCode: 'Contemporary Black Tie / Chic',
    rating: '5.0 ★ Prismatic',
    priceIndicator: '$$$$$',
    coordinates: { lat: 40.7612, lng: -73.9772 }
  },
  {
    id: 'silencio-nyc',
    name: 'Silencio NYC',
    category: 'lounges',
    neighborhood: 'Midtown Nocturne',
    location: 'Discreet Sub-Level Vault, Manhattan',
    tagline: 'Cinematic darkness and sensory soundscapes inspired by David Lynch.',
    accessTier: 'Reserve',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop',
    curatorNote: 'Golden leaf walls, deep velvet banquettes, state-of-the-art acoustic chamber.',
    privileges: ['Hidden Booth Reservation', 'Direct Mixologist Table Service', 'Keycard Passcode Entry'],
    dressCode: 'Dark Minimalist',
    rating: '4.8 ★ Nocturne',
    priceIndicator: '$$$$',
    coordinates: { lat: 40.7580, lng: -73.9855 }
  },
  {
    id: 'greenwich-hotel',
    name: 'The Greenwich Hotel',
    category: 'sanctuaries',
    neighborhood: 'TriBeCa',
    location: '377 Greenwich St, TriBeCa',
    tagline: 'Artisanal sanctuary with authentic 250-year-old Japanese bamboo Shibui Spa.',
    accessTier: 'Sovereign',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
    curatorNote: 'No two rooms alike. Private courtyard garden for residents only. Handcrafted terracotta.',
    privileges: ['Private Shibui Lantern Bathing', 'Locanda Verde In-Suite Dining', 'TriBeCa Courtyard Sanctum'],
    dressCode: 'Quiet Luxury',
    rating: '4.9 ★ Artisanal',
    priceIndicator: '$$$$$',
    coordinates: { lat: 40.7196, lng: -74.0097 }
  },
  {
    id: 'the-ned-nomad',
    name: 'The Ned NoMad',
    category: 'clubs',
    neighborhood: 'NoMad',
    location: '1170 Broadway at 28th St',
    tagline: '1903 Johnston Building glamour with panoramic rooftop members terrace.',
    accessTier: 'Private Member',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
    curatorNote: 'Beaux-Arts ceilings, Cecconi’s Venetian feast, Magic Room live performances.',
    privileges: ['Ned Upstairs Terrace Daybed', 'Magic Room Priority Access', 'Private Sommelier Cellar Tour'],
    dressCode: 'Dapper / Cosmopolitan',
    rating: '4.8 ★ Elite Club',
    priceIndicator: '$$$$',
    coordinates: { lat: 40.7447, lng: -73.9882 }
  },
  {
    id: 'the-mark',
    name: 'The Mark Hotel',
    category: 'hotels',
    neighborhood: 'Upper East Side',
    location: '25 E 77th St at Madison Ave',
    tagline: 'Upper East Side haute couture hotel with North America’s largest penthouse.',
    accessTier: 'Black Tier',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop',
    curatorNote: 'Iconic striped marble foyer, Frederic Fekkai salon, Jean-Georges culinary craft.',
    privileges: ['Mark Sailboat Charter Access', 'Jean-Georges Chef Table', 'Bergdorf Goodman Private Hour'],
    dressCode: 'Manhattan Haute',
    rating: '5.0 ★ Premier',
    priceIndicator: '$$$$$',
    coordinates: { lat: 40.7751, lng: -73.9638 }
  },
  {
    id: 'peak-lounge',
    name: 'Peak & Sky Lounge',
    category: 'lounges',
    neighborhood: 'Hudson Yards',
    location: '30 Hudson Yards, Level 101',
    tagline: '1,100 feet above Manhattan with unobstructed 360° horizons.',
    accessTier: 'Reserve',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop',
    curatorNote: 'Suspended above the Hudson. Rare cognacs, champagne trolley, and twilight city views.',
    privileges: ['Glass-Edge Table Reservation', 'Fast-Track Private Elevator', 'Edge Skydeck VIP Entry'],
    dressCode: 'High Glamour / No Athletic Wear',
    rating: '4.8 ★ Stratosphere',
    priceIndicator: '$$$$',
    coordinates: { lat: 40.7538, lng: -74.0016 }
  }
];
