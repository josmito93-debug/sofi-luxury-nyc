import React from 'react';
import { SpotifyLogo } from './SpotifyLogo';

export const SocialLinks: React.FC = () => {
  const socials = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sofiasarlat/',
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
      href: 'https://open.spotify.com/user/sofia.gabrielle?si=06b7a07e8865442e',
      icon: <SpotifyLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" color="currentColor" />
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@sofiasarlat',
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'Website',
      href: 'https://www.sofiasarlat.com',
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sofia-sarlat-40a759101/',
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/SofiaSarlat/?locale=es_LA',
      icon: (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    }
  ];

  return (
    <div
      aria-label="Social connections"
      className="fixed left-3 sm:left-6 top-20 sm:top-1/2 sm:-translate-y-1/2 z-40 flex flex-col items-center gap-3.5 sm:gap-4 select-none pointer-events-auto"
    >
      {/* Top Hairline Axis */}
      <div className="w-[1px] h-6 sm:h-10 bg-gradient-to-b from-transparent via-gold-400/30 to-gold-400/60" />

      {/* Social Links (No Container, Floating Luxury Micro Icons) */}
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
          className="text-white/40 hover:text-gold-300 transition-all duration-300 hover:scale-125 focus:outline-none"
        >
          {s.icon}
        </a>
      ))}

      {/* Bottom Hairline Axis */}
      <div className="w-[1px] h-6 sm:h-10 bg-gradient-to-t from-transparent via-gold-400/30 to-gold-400/60" />
    </div>
  );
};
