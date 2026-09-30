import React from 'react';

interface LogoProps {
  className?: string;
  glow?: boolean;
  alt?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = 'h-10 w-auto',
  glow = false,
  alt = 'SOFI New York — Private Members Clubs & Luxury Hotels'
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${glow ? 'group' : ''}`}>
      {glow && (
        <div className="absolute inset-0 bg-gold-400/25 blur-xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      )}
      <img
        src="/logo.svg"
        alt={alt}
        className={`relative z-10 object-contain select-none ${className}`}
        loading="eager"
      />
    </div>
  );
};
