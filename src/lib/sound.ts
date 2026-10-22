let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/** Short mechanical key click for the hardware-style buttons. */
export function playClick(pitch = 1) {
  const ac = getContext();
  if (!ac) return;
  const t = ac.currentTime;

  // Noise burst for the mechanical transient
  const size = Math.floor(ac.sampleRate * 0.025);
  const buffer = ac.createBuffer(1, size, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  const noise = ac.createBufferSource();
  noise.buffer = buffer;
  const band = ac.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.setValueAtTime(3200 * pitch, t);
  band.Q.setValueAtTime(3, t);
  const noiseGain = ac.createGain();
  noiseGain.gain.setValueAtTime(0.35, t);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
  noise.connect(band).connect(noiseGain).connect(ac.destination);
  noise.start(t);

  // Resonant snap tone
  const osc = ac.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(480 * pitch, t);
  osc.frequency.exponentialRampToValueAtTime(80 * pitch, t + 0.04);
  const low = ac.createBiquadFilter();
  low.type = 'lowpass';
  low.frequency.setValueAtTime(2400, t);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.25, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  osc.connect(low).connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.045);
}
