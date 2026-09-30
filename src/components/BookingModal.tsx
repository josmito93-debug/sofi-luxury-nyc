import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar as CalendarIcon, Users, KeyRound, Sparkles, Building2, Shield, Mail, ChevronLeft, ChevronRight, Clock, Check, ChevronDown } from 'lucide-react';
import { NYC_VENUES } from '../data/venues';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVenueId?: string;
  onBookingConfirmed: (bookingData: {
    passholderName: string;
    venueName: string;
    tier: string;
    date: string;
    guests: number;
    serial: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedVenueId,
  onBookingConfirmed,
}) => {
  // Venue Input (Editable with Suggestions & Custom Input)
  const [venueInput, setVenueInput] = useState<string>('Aman New York');
  const [showVenueSuggestions, setShowVenueSuggestions] = useState(false);
  const [tier, setTier] = useState<'Sovereign' | 'Black Tier' | 'Reserve'>('Sovereign');
  
  // Real Interactive Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate());
  const [selectedTime, setSelectedTime] = useState('21:30');
  const [dateFormatted, setDateFormatted] = useState('Tonight, 21:30 EDT');
  
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('Alexander Vane');
  const [contact, setContact] = useState('vane.private@sofi.ny');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const venueWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedVenueId) {
      const match = NYC_VENUES.find((v) => v.id === selectedVenueId || v.name === selectedVenueId);
      if (match) setVenueInput(match.name);
    }
  }, [selectedVenueId]);

  // Click outside listener for suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (venueWrapperRef.current && !venueWrapperRef.current.contains(e.target as Node)) {
        setShowVenueSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  // Calendar Helpers
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    const chosen = new Date(year, month, day);
    const isToday = new Date().toDateString() === chosen.toDateString();
    const formatted = `${isToday ? 'Tonight' : monthNames[month].slice(0, 3) + ' ' + day}, ${selectedTime} EDT`;
    setDateFormatted(formatted);
  };

  const handleSelectTime = (t: string) => {
    setSelectedTime(t);
    const chosen = new Date(year, month, selectedDay);
    const isToday = new Date().toDateString() === chosen.toDateString();
    const formatted = `${isToday ? 'Tonight' : monthNames[month].slice(0, 3) + ' ' + selectedDay}, ${t} EDT`;
    setDateFormatted(formatted);
  };

  const handlePreset = (presetName: string, time: string, dayOffset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    setCurrentMonthDate(d);
    setSelectedDay(d.getDate());
    setSelectedTime(time);
    setDateFormatted(`${presetName}, ${time} EDT`);
    setShowCalendar(false);
  };

  const handleSelectSuggestedVenue = (venueName: string) => {
    setVenueInput(venueName);
    setShowVenueSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#FFF0C1', '#B8922C', '#FFFFFF']
      });
    } catch {
      // Fallback
    }

    setTimeout(() => {
      const serial = `SOFI-NYC-${Math.floor(10000 + Math.random() * 90000)}-${tier.charAt(0)}`;
      onBookingConfirmed({
        passholderName: name || 'Sovereign Guest',
        venueName: venueInput.trim() || 'Sovereign Placement',
        tier: tier,
        date: dateFormatted,
        guests: guests,
        serial: serial
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian-950/85 backdrop-blur-2xl transition-all duration-500 animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Doppelrand Hardware Bezel Outer Shell */}
      <div className="relative w-full max-w-xl z-10 doppel-shell shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[95vh] flex flex-col">
        <div className="doppel-core p-6 sm:p-8 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-velora text-xl sm:text-2xl tracking-[0.16em] text-white uppercase">
                  VIP Reservation
                </h3>
                <p className="text-white/40 text-[11px] tracking-[0.12em] font-light">
                  Sovereign Concierge & Instant Pass Minting
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            {/* Preferred Venue (Editable input with Suggestions Dropdown & Custom Typing) */}
            <div ref={venueWrapperRef} className="relative">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gold-300 font-medium">
                  NYC Venue / Destination
                </label>
                <span className="text-[9px] text-white/40 tracking-wider">
                  Select option or type custom venue
                </span>
              </div>

              <div className="relative">
                <Building2 className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  list="venues-list"
                  value={venueInput}
                  onChange={(e) => setVenueInput(e.target.value)}
                  onFocus={() => setShowVenueSuggestions(true)}
                  placeholder="e.g. Aman New York, Casa Cipriani, or type custom venue..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-gold-400/60 text-white text-xs tracking-wider outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowVenueSuggestions(!showVenueSuggestions)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
                  aria-label="Toggle Venue Suggestions"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Native Datalist Fallback */}
              <datalist id="venues-list">
                {NYC_VENUES.map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.neighborhood} • {v.accessTier}
                  </option>
                ))}
              </datalist>

              {/* Floating Suggestions Dropdown */}
              {showVenueSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-40 p-2 rounded-xl bg-[#0c0d14]/98 border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.9)] max-h-48 overflow-y-auto backdrop-blur-2xl">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-gold-300/70 px-2 py-1 font-mono">
                    Curated Options (Click to fill)
                  </div>
                  <div className="space-y-1 mt-1">
                    {NYC_VENUES.map((v) => (
                      <button
                        type="button"
                        key={v.id}
                        onClick={() => handleSelectSuggestedVenue(v.name)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          venueInput === v.name
                            ? 'bg-gold-400/15 text-gold-300 font-semibold'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{v.name}</span>
                        <span className="text-[10px] text-white/40 font-mono tracking-wider shrink-0 pl-2">
                          {v.neighborhood}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Access Tier Selector */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1.5">
                Access Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Sovereign', 'Black Tier', 'Reserve'] as const).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTier(t)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all duration-300 ${
                      tier === t
                        ? 'bg-gold-400/20 border-gold-400 text-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <div className="font-velora text-xs uppercase tracking-[0.14em] font-semibold">
                      {t}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Guests in One Compact Row with Interactive Calendar Trigger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Interactive Calendar Field */}
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gold-300 font-medium mb-1.5 flex items-center justify-between">
                  <span>Arrival Calendar & Time</span>
                  <span className="text-[9px] text-white/40 font-mono">EDT</span>
                </label>

                {/* Calendar Button Trigger */}
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-gold-400/30 hover:border-gold-400 text-white text-xs tracking-wider outline-none transition-all flex items-center justify-between group shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                >
                  <CalendarIcon className="w-4 h-4 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />
                  <span className="font-medium truncate">{dateFormatted}</span>
                  <span className="text-[10px] text-gold-300 font-mono uppercase bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/20">
                    {showCalendar ? 'Close' : 'Select'}
                  </span>
                </button>

                {/* Interactive Luxury Calendar Popover */}
                {showCalendar && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50 p-4 rounded-2xl bg-[#0b0c12]/98 border border-gold-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-3xl animate-fadeIn w-[300px] sm:w-[340px]">
                    {/* Month Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="font-velora text-xs uppercase tracking-[0.16em] text-gold-300 font-bold">
                        {monthNames[month]} {year}
                      </div>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day of week abbreviations */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[9px] uppercase tracking-wider text-white/40 mb-1 font-mono">
                      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-7 w-7" />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const isSelected = dayNum === selectedDay;
                        return (
                          <button
                            type="button"
                            key={dayNum}
                            onClick={() => handleSelectDay(dayNum)}
                            className={`h-7 w-7 rounded-lg text-xs font-mono transition-all flex items-center justify-center ${
                              isSelected
                                ? 'bg-gold-400 text-obsidian-950 font-bold shadow-[0_0_12px_#D4AF37]'
                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time Slots */}
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-white/50 mb-2 font-mono">
                        <Clock className="w-3 h-3 text-gold-400" />
                        <span>Seating Window</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {['20:00', '21:30', '22:45', '23:30', '00:15', '01:00'].map((timeStr) => (
                          <button
                            type="button"
                            key={timeStr}
                            onClick={() => handleSelectTime(timeStr)}
                            className={`py-1 px-1.5 rounded-md text-[10px] font-mono tracking-wider transition-all ${
                              selectedTime === timeStr
                                ? 'bg-gold-400/25 border border-gold-400 text-gold-300 font-bold'
                                : 'bg-white/[0.04] border border-white/5 text-white/60 hover:text-white'
                            }`}
                          >
                            {timeStr}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-1 text-[9px] font-mono">
                      <button
                        type="button"
                        onClick={() => handlePreset('Tonight', '21:30', 0)}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-gold-400/20 text-white/70 hover:text-gold-300 transition-colors"
                      >
                        Tonight
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePreset('Tomorrow', '22:00', 1)}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-gold-400/20 text-white/70 hover:text-gold-300 transition-colors"
                      >
                        Tomorrow
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePreset('This Weekend', '23:00', 3)}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-gold-400/20 text-white/70 hover:text-gold-300 transition-colors"
                      >
                        Weekend
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCalendar(false)}
                        className="px-2.5 py-1 rounded bg-gold-400 text-black font-bold flex items-center gap-1"
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        <span>Done</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1.5">
                  Party Size
                </label>
                <div className="relative">
                  <Users className="w-3.5 h-3.5 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-gold-400/60 text-white text-xs tracking-wider outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Identity & Dispatch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1.5">
                  Passholder Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Legal / Sovereign Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-gold-400/60 text-white text-xs tracking-wider outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium mb-1.5">
                  Private Dispatch
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Email or Signal handle"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-gold-400/60 text-white text-xs tracking-wider outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Privileges Badge */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-white/50">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct private table hold, priority entrance & cryptographic pass.</span>
            </div>

            {/* Submit Action */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-obsidian-950 font-bold uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Minting Pass...' : 'Confirm & Issue Sovereign Pass'}</span>
                <span className="text-sm font-black">↗</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
