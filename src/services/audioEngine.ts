class AudioEngine {
  private ctx: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private audioSourceNode: MediaElementAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private synthGain: GainNode | null = null;
  private masterGain: GainNode | null = null;

  public isAmbientPlaying: boolean = false;
  public isSynthPlaying: boolean = false;
  public volume: number = 0.65;
  private listeners: Set<() => void> = new Set();

  constructor() {
    // Lazy initialize on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.85;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Setup audio element for local ambient-track.mp3
      this.audioElement = new Audio('/ambient-track.mp3');
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';

      try {
        this.audioSourceNode = this.ctx.createMediaElementSource(this.audioElement);
        this.audioSourceNode.connect(this.masterGain);
      } catch {
        // Fallback if media element source fails
      }
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public async toggleAmbient(): Promise<boolean> {
    this.initContext();
    if (!this.audioElement) return false;

    if (this.isAmbientPlaying) {
      this.audioElement.pause();
      this.isAmbientPlaying = false;
    } else {
      try {
        await this.audioElement.play();
        this.isAmbientPlaying = true;
      } catch {
        this.isAmbientPlaying = false;
      }
    }
    this.notify();
    return this.isAmbientPlaying;
  }

  public toggleSynth(): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    if (this.isSynthPlaying) {
      this.stopSynth();
      this.isSynthPlaying = false;
    } else {
      this.startSynth();
      this.isSynthPlaying = true;
    }
    this.notify();
    return this.isSynthPlaying;
  }

  private startSynth() {
    if (!this.ctx || !this.masterGain) return;

    // Dual warm sine/triangle drone at 55Hz (A1) and 110Hz harmonic with soft lowpass
    this.synthGain = this.ctx.createGain();
    this.synthGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.synthGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 2.5);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // Low deep drone

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(110.5, this.ctx.currentTime); // Warm harmonic beating

    this.osc1.connect(filter);
    this.osc2.connect(filter);
    filter.connect(this.synthGain);
    this.synthGain.connect(this.masterGain);

    this.osc1.start();
    this.osc2.start();
  }

  private stopSynth() {
    if (!this.ctx || !this.synthGain) return;
    this.synthGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.2);
    setTimeout(() => {
      this.osc1?.stop();
      this.osc2?.stop();
      this.osc1?.disconnect();
      this.osc2?.disconnect();
      this.osc1 = null;
      this.osc2 = null;
    }, 1300);
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  public getFrequencyData(dataArray: Uint8Array): void {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(dataArray as unknown as Uint8Array<ArrayBuffer>);
    } else {
      dataArray.fill(0);
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }
}

export const soundEngine = new AudioEngine();
