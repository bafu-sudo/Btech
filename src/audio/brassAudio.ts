/**
 * Web Audio API Brass Synthesizer
 * Models the warm, harmonic-rich timbre of British brass band instruments
 * (Cornet, Tenor Horn, Euphonium, Eb/Bb Bass) with formant filtering & lip-buzz envelope.
 */

class BrassAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays an authentic brass tone
   * @param freq Target fundamental frequency in Hz
   * @param duration Optional duration in seconds (if omitted, sustained until returned stop() is called)
   * @param instrumentType Instrument coloration (cornet = bright, horn = mellow, bass = deep)
   */
  public playBrassTone(
    freq: number,
    duration?: number,
    instrumentType: 'cornet' | 'horn' | 'euphonium' | 'bass' = 'cornet'
  ): () => void {
    if (this.isMuted || freq <= 0) return () => {};
    this.initContext();
    if (!this.ctx) return () => {};

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const formantFilter = this.ctx.createBiquadFilter();
    const mainGain = this.ctx.createGain();

    // Subtle vibrato LFO for warmth
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(5.4, now); // ~5.4 Hz natural brass vibrato
    lfoGain.gain.setValueAtTime(instrumentType === 'bass' ? 0.8 : 1.4, now);
    lfo.connect(osc.frequency);
    lfo.connect(subOsc.frequency);
    lfo.start(now);

    // Waveform choice: Sawtooth with rich brass harmonics
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq * 0.985, now);
    // Slight initial lip attack transient (centering the pitch in first 35ms)
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.035);

    // Sub-oscillator for body / warmth (octave lower or square warm fundamental)
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq, now);

    // Filter tuning according to instrument character
    filter.type = 'lowpass';
    const cutoff = instrumentType === 'bass' ? Math.min(1800, freq * 7) : Math.min(3800, freq * 8);
    filter.frequency.setValueAtTime(cutoff * 0.4, now);
    // Brass attack envelope on filter: opening up brightly then settling
    filter.frequency.exponentialRampToValueAtTime(cutoff, now + 0.05);
    filter.frequency.exponentialRampToValueAtTime(cutoff * 0.75, now + 0.25);
    filter.Q.setValueAtTime(instrumentType === 'horn' ? 2.0 : 3.5, now);

    // Formant bell filter for brass bell resonance (~1200Hz - 2200Hz)
    formantFilter.type = 'peaking';
    formantFilter.frequency.setValueAtTime(instrumentType === 'bass' ? 700 : 1600, now);
    formantFilter.Q.setValueAtTime(2.2, now);
    formantFilter.gain.setValueAtTime(4.0, now);

    // Gain envelope
    mainGain.gain.setValueAtTime(0.0001, now);
    const peakVolume = instrumentType === 'bass' ? 0.35 : 0.25;
    mainGain.gain.exponentialRampToValueAtTime(peakVolume, now + 0.04); // brass chiff attack
    mainGain.gain.exponentialRampToValueAtTime(peakVolume * 0.75, now + 0.15); // sustain level

    // Connect node graph
    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(formantFilter);
    formantFilter.connect(mainGain);
    mainGain.connect(this.ctx.destination);

    osc.start(now);
    subOsc.start(now);

    let stopped = false;
    const stopSound = () => {
      if (stopped || !this.ctx) return;
      stopped = true;
      const stopNow = this.ctx.currentTime;
      try {
        mainGain.gain.cancelScheduledValues(stopNow);
        mainGain.gain.setValueAtTime(Math.max(0.0001, mainGain.gain.value), stopNow);
        mainGain.gain.exponentialRampToValueAtTime(0.0001, stopNow + 0.18);
        osc.stop(stopNow + 0.2);
        subOsc.stop(stopNow + 0.2);
        lfo.stop(stopNow + 0.2);
      } catch {
        // ignore if already stopped
      }
    };

    if (duration && duration > 0) {
      setTimeout(() => {
        stopSound();
      }, duration * 1000);
    }

    return stopSound;
  }

  /**
   * Plays a sequence of notes (e.g. scale) with synchronized callbacks
   */
  public playScaleSequence(
    frequencies: number[],
    noteDurationMs: number = 420,
    onNoteChange?: (index: number) => void,
    onComplete?: () => void,
    instrumentType: 'cornet' | 'horn' | 'euphonium' | 'bass' = 'cornet'
  ): () => void {
    if (frequencies.length === 0) return () => {};

    let currentIndex = 0;
    let isCancelled = false;
    let timeoutId: number | null = null;
    let currentStop: (() => void) | null = null;

    const playNext = () => {
      if (isCancelled) return;
      if (currentIndex >= frequencies.length) {
        onComplete?.();
        return;
      }

      onNoteChange?.(currentIndex);
      const freq = frequencies[currentIndex];
      currentStop = this.playBrassTone(freq, noteDurationMs / 1000 * 0.9, instrumentType);

      currentIndex++;
      timeoutId = window.setTimeout(playNext, noteDurationMs);
    };

    playNext();

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (currentStop) currentStop();
      onComplete?.();
    };
  }

  /**
   * Plays synthesized British Brass Band percussion sounds
   */
  public playPercussion(type: 'snare' | 'bassdrum' | 'cymbal' | 'timpani' | 'glockenspiel') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (type === 'bassdrum') {
      // Powerful punchy brass band concert bass drum
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.35);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'snare') {
      // Crisp side drum / snare with snap & snare wire rattle
      const bufferSize = this.ctx.sampleRate * 0.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1200, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      // Add fundamental drumhead body tone
      const bodyOsc = this.ctx.createOscillator();
      const bodyGain = this.ctx.createGain();
      bodyOsc.frequency.setValueAtTime(180, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(90, now + 0.1);
      bodyGain.gain.setValueAtTime(0.3, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(this.ctx.destination);

      noise.start(now);
      bodyOsc.start(now);
      noise.stop(now + 0.2);
      bodyOsc.stop(now + 0.15);
    } else if (type === 'cymbal') {
      // Orchestral clash cymbals / crash
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(6500, now);
      bandpass.Q.setValueAtTime(1.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.8);
    } else if (type === 'timpani') {
      // Resonant kettle drum tuned in F (87.3Hz) or C (130.8Hz)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(105, now);
      osc.frequency.exponentialRampToValueAtTime(87.3, now + 0.08); // pitch settle
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    } else if (type === 'glockenspiel') {
      // Crystal clear bright bell chime (C6 = 1046.5Hz)
      const osc = this.ctx.createOscillator();
      const overtone = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      overtone.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now);
      overtone.frequency.setValueAtTime(2790, now); // metallic inharmonic overtone

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      overtone.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 0.7);
      overtone.stop(now + 0.7);
    }
  }

  /**
   * Short feedback sound for quiz
   */
  public playFeedback(correct: boolean) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    gain.connect(this.ctx.destination);
    osc.connect(gain);

    if (correct) {
      // Pleasant British brass triad fanfare
      osc.frequency.setValueAtTime(466.16, now); // Bb4
      osc.frequency.setValueAtTime(587.33, now + 0.08); // D5
      osc.frequency.setValueAtTime(698.46, now + 0.16); // F5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else {
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(196, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  }
}

export const brassAudio = new BrassAudioEngine();
