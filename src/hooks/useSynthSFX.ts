import { useCallback, useRef } from 'react';

type SFXType =
    | 'click' | 'pop' | 'chime' | 'buzz' | 'whoosh'
    | 'snap' | 'paperSlide' | 'paperShuffle'
    | 'dramatic' | 'celebration' | 'confettiPop'
    | 'playful' | 'select';

export const useSynthSFX = () => {
    const audioCtxRef = useRef<AudioContext | null>(null);

    const initAudio = useCallback(() => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }, []);

    const play = useCallback((type: SFXType, volume = 0.5) => {
        initAudio();
        const ctx = audioCtxRef.current!;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'click':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
                gainNode.gain.setValueAtTime(volume * 0.3, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'select':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                gainNode.gain.setValueAtTime(volume * 0.2, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;

            case 'pop':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
                gainNode.gain.setValueAtTime(volume * 0.4, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'snap':
                osc.type = 'square';
                osc.frequency.setValueAtTime(1500, now);
                gainNode.gain.setValueAtTime(volume * 0.2, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;

            case 'chime':
                // Ascending arpeggio
                [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.type = 'sine';
                    o.frequency.value = freq;
                    o.connect(g);
                    g.connect(ctx.destination);
                    g.gain.setValueAtTime(0, now + i * 0.05);
                    g.gain.linearRampToValueAtTime(volume * 0.2, now + i * 0.05 + 0.02);
                    g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.8);
                    o.start(now + i * 0.05);
                    o.stop(now + i * 0.05 + 0.8);
                });
                return; // Special case, returns early

            case 'buzz':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.3);
                gainNode.gain.setValueAtTime(volume * 0.3, now);
                gainNode.gain.linearRampToValueAtTime(0.01, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'whoosh':
                // Noise buffer for whoosh
                const bufferSize = ctx.sampleRate * 0.5;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = Math.random() * 2 - 1;
                }
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                const filter = ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(200, now);
                filter.frequency.exponentialRampToValueAtTime(2000, now + 0.2);
                filter.frequency.exponentialRampToValueAtTime(200, now + 0.5);
                noise.connect(filter);
                filter.connect(gainNode);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(volume * 0.4, now + 0.2);
                gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
                noise.start(now);
                noise.stop(now + 0.5);
                return;

            case 'celebration':
                // Major chord flurry
                [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98].forEach((_freq, i) => {
                    setTimeout(() => play('chime', volume), i * 100);
                });
                return;

            // ... assume others map to click/chime/whoosh for now
            default:
                play('click', volume);
                return;
        }

    }, [initAudio]);

    return { play };
};
