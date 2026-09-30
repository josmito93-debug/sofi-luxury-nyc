import React, { useRef, useState } from 'react';
import { X, Sparkles, Download, Check, Shield, Copy, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

interface VipPassData {
  passholderName: string;
  venueName: string;
  tier: string;
  date: string;
  guests: number;
  serial: string;
}

interface VipPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  passData: VipPassData | null;
}

export const VipPassModal: React.FC<VipPassModalProps> = ({
  isOpen,
  onClose,
  passData
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Default fallback data if opened directly
  const data = passData || {
    passholderName: 'Alexander Vane',
    venueName: 'Aman New York',
    tier: 'Sovereign',
    date: 'Tonight, 22:00 EDT',
    guests: 2,
    serial: 'SOFI-NYC-88219-S'
  };

  if (!isOpen) return null;

  // 3D Holographic Card Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const handleCopySerial = () => {
    navigator.clipboard.writeText(data.serial);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloaded(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#FFF0C1', '#B8922C', '#FFFFFF']
    });
    setTimeout(() => setDownloaded(false), 3000);
  };

  const qrPayload = JSON.stringify({
    issuer: 'SOFI-NYC',
    passholder: data.passholderName,
    venue: data.venueName,
    tier: data.tier,
    serial: data.serial,
    issued: new Date().toISOString()
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian-950/85 backdrop-blur-2xl transition-all duration-500 animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-lg z-10 flex flex-col items-center">
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3D Holographic Card Outer Shell */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full transition-transform duration-200 ease-out select-none cursor-pointer doppel-shell shadow-[0_30px_100px_rgba(212,175,55,0.25)]"
        >
          <div className="doppel-core p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#0c0d12]/95 via-[#08090d]/95 to-[#12141c]/95 min-h-[460px]">
            {/* Holographic Shimmer Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-color-dodge"
              style={{
                background: 'linear-gradient(115deg, transparent 20%, rgba(212, 175, 55, 0.4) 40%, rgba(255, 255, 255, 0.6) 50%, rgba(184, 146, 44, 0.4) 60%, transparent 80%)'
              }}
            />

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_10px_#D4AF37]" />
                <span className="font-velora text-xl sm:text-2xl tracking-[0.22em] text-white uppercase">
                  SOFI
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 pl-1 border-l border-white/10">
                  NYC PASS
                </span>
              </div>

              <div className="px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/40 text-gold-300 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
                {data.tier}
              </div>
            </div>

            {/* Central Pass Content */}
            <div className="my-6 space-y-4 relative z-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono block">
                  Designated Sovereign Enclave
                </span>
                <h4 className="font-luxury text-2xl sm:text-3xl text-white tracking-wide mt-0.5">
                  {data.venueName}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono block">
                    Passholder
                  </span>
                  <div className="font-velora text-sm tracking-[0.14em] text-gold-200 uppercase mt-0.5 truncate">
                    {data.passholderName}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono block">
                    Party Size
                  </span>
                  <div className="text-sm font-semibold text-white tracking-wider mt-0.5">
                    {data.guests} {data.guests === 1 ? 'Guest' : 'Guests'} • VIP Escort
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono block">
                    Access Window
                  </span>
                  <div className="text-xs text-white/80 font-mono tracking-wider mt-0.5">
                    {data.date}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono block">
                    Protocol Status
                  </span>
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <Shield className="w-3 h-3" />
                    <span className="font-mono text-[11px] tracking-widest uppercase">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom QR Code & Serial Section */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono block">
                  Serial Identifier
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs text-gold-300 font-bold tracking-widest truncate">
                    {data.serial}
                  </span>
                  <button
                    onClick={handleCopySerial}
                    className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                    title="Copy Serial"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* High-Contrast Luxury QR Code */}
              <div className="p-2 rounded-xl bg-white/95 shadow-[0_0_20px_rgba(255,255,255,0.2)] shrink-0">
                <QRCodeSVG
                  value={qrPayload}
                  size={68}
                  level="M"
                  fgColor="#040406"
                  bgColor="#FFFFFF"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls below Card */}
        <div className="mt-6 flex items-center gap-3 w-full justify-center">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-[0.18em] shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-[0.98]"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Pass Issued to Device</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download Pass Credentials</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopySerial}
            className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/70 hover:text-white transition-colors"
            title="Share or Copy Access Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
