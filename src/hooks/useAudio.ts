import { useEffect, useRef, useState, useCallback } from 'react';
import { Howl } from 'howler';
import { useSynthSFX } from './useSynthSFX';

// We'll declare types for our file-based assets
export type AudioFile = 'scratch' | 'heartbeat' | 'gavel' | 'bgm';

export const useAudio = () => {
    const [isMuted, setIsMuted] = useState(() => {
        return localStorage.getItem('valentine_mute') === 'true';
    });

    const bgmRef = useRef<Howl | null>(null);
    const sfxRefs = useRef<Record<string, Howl>>({});
    const { play: playSynth } = useSynthSFX();

    // Initialize signals
    useEffect(() => {
        Howler.mute(isMuted);
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        const newState = !isMuted;
        setIsMuted(newState);
        Howler.mute(newState);
        localStorage.setItem('valentine_mute', String(newState));
    }, [isMuted]);

    const playMusic = useCallback((filename: string = 'pyaar-ke-liye.mp3') => {
        if (!bgmRef.current) {
            bgmRef.current = new Howl({
                src: [`/assets/audio/${filename}`],
                loop: true,
                volume: 0.3,
                html5: true, // Stream large files
            });
        }
        if (!bgmRef.current.playing()) {
            bgmRef.current.play();
            bgmRef.current.fade(0, 0.3, 2000);
        }
    }, []);

    const stopMusic = useCallback(() => {
        if (bgmRef.current) {
            bgmRef.current.fade(0.3, 0, 1000);
            setTimeout(() => bgmRef.current?.stop(), 1000);
        }
    }, []);

    // For the 3 manual files
    const playFileSFX = useCallback((key: AudioFile) => {
        if (!sfxRefs.current[key]) {
            sfxRefs.current[key] = new Howl({
                src: [`/assets/audio/${key}.mp3`],
                volume: 0.6,
            });
        }
        sfxRefs.current[key].play();
    }, []);

    // Unified play function
    const playSFX = useCallback((type: string) => {
        if (['scratch', 'heartbeat', 'gavel'].includes(type)) {
            playFileSFX(type as AudioFile);
        } else {
            // @ts-ignore
            playSynth(type);
        }
    }, [playFileSFX, playSynth]);

    return { isMuted, toggleMute, playMusic, stopMusic, playSFX };
};
