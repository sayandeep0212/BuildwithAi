// Web Audio API generator for ambient soundscapes & chime notifications
class SanctuaryAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private oscNode: OscillatorNode | null = null;
  private isPlaying = false;
  private currentType: string | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft singing bowl chord
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, now); // 528 Hz Solfeggio frequency for healing & peace
      
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.3, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 2.6);
    } catch {
      // Audio fallback
    }
  }

  public startSoundscape(type: string, volume = 0.3) {
    this.stopSoundscape();
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentType = type;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    masterGain.connect(this.ctx.destination);
    this.gainNode = masterGain;

    if (type === 'rain' || type === 'whitenoise' || type === 'library') {
      // Create filtered noise buffer
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink/Brown noise filter
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to simulate soft rain / room ambiance
      const filter = this.ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(type === 'rain' ? 800 : 400, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();
      this.noiseNode = whiteNoise;
    } else if (type === 'waves' || type === 'binaural') {
      // Harmonic sine wave ambient drone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(136.1, this.ctx.currentTime); // Om frequency
      osc2.frequency.setValueAtTime(140.1, this.ctx.currentTime); // 4Hz Theta beat

      lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // Slow wave swell
      lfoGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain);

      osc1.connect(masterGain);
      osc2.connect(masterGain);

      osc1.start();
      osc2.start();
      lfo.start();
      this.oscNode = osc1;
    }
  }

  public stopSoundscape() {
    if (this.noiseNode) {
      try { (this.noiseNode as AudioBufferSourceNode).stop(); } catch {}
      this.noiseNode = null;
    }
    if (this.oscNode) {
      try { this.oscNode.stop(); } catch {}
      this.oscNode = null;
    }
    this.isPlaying = false;
    this.currentType = null;
  }

  public setVolume(volume: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }

  public getStatus() {
    return { isPlaying: this.isPlaying, currentType: this.currentType };
  }
}

export const audioEngine = new SanctuaryAudioEngine();
