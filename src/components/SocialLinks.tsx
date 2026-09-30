import React from 'react';
import { SpotifyLogo } from './SpotifyLogo';

export const SocialLinks: React.FC = () => {
  const socials = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/sofi.nyc',
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      name: 'Spotify',
      href: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
      icon: <SpotifyLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" color="currentColor" />
    },
    {
      name: 'X',
      href: 'https://x.com/sofi_nyc',
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Concierge WhatsApp',
      href: 'https://wa.me/12125550199?text=SOFI%20NYC%20VIP%20Access%20Request',
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      )
    },
    {
      name: 'Telegram Dispatch',
      href: 'https://t.me/sofi_nyc',
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
      )
    }
  ];

  return (
    <div
      aria-label="Social connections"
      className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-4 sm:gap-5 select-none pointer-events-auto"
    >
      {/* Top Hairline Axis */}
      <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-transparent via-gold-400/30 to-gold-400/50" />

      {/* Social Links (No Container, Floating Luxury Micro Icons) */}
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
          className="text-white/35 hover:text-gold-300 transition-all duration-300 hover:scale-125 focus:outline-none"
        >
          {s.icon}
        </a>
      ))}

      {/* Bottom Hairline Axis */}
      <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-t from-transparent via-gold-400/30 to-gold-400/50" />
    </div>
  );
};
