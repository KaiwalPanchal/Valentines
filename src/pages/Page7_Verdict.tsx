import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import { TypewriterText } from '../components/TypewriterText';

export const Page7_Verdict = () => {
    const { goToPage } = useGame();
    const { playSFX } = useAudio();
    const [phase, setPhase] = useState(0);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Phase progression with dramatic pauses
        const timers = [
            setTimeout(() => setPhase(1), 500),       // "OFFICIAL VERDICT"
            setTimeout(() => setPhase(2), 3000),       // "After thorough investigation..."
            setTimeout(() => {
                playSFX('gavel');
                setPhase(3);                            // "GUILTY."
            }, 7000),
            setTimeout(() => setPhase(4), 9000),       // "Guilty of..." list
            setTimeout(() => setPhase(5), 14000),      // "From the riverfront..." personal section
            setTimeout(() => setPhase(6), 20000),      // "What matters if your heart doesn't?"
            setTimeout(() => setShowButton(true), 24000) // Button appears
        ];

        return () => timers.forEach(clearTimeout);
    }, [playSFX]);

    return (
        <PageTransition>
            <div style={{
                width: '100%',
                height: '100%',
                // background: phase >= 6
                //     ? `url('/assets/textures/purple_nightsky.jpg') center/cover`
                //     : 'linear-gradient(135deg, #2a1a0a 0%, #1a0a2e 50%, #0a0015 100%)', // Removed for global theme
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                transition: 'background 3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}>

                {/* Starry overlay (appears in later phases) */}
                {phase >= 5 && (
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 40% 70%, white, transparent), radial-gradient(1px 1px at 60% 20%, white, transparent), radial-gradient(1px 1px at 80% 60%, white, transparent), radial-gradient(1px 1px at 10% 80%, white, transparent), radial-gradient(2px 2px at 70% 40%, white, transparent), radial-gradient(1px 1px at 30% 50%, white, transparent), radial-gradient(1px 1px at 90% 10%, white, transparent)',
                        opacity: 0,
                        animation: 'fadeIn 3s forwards',
                        pointerEvents: 'none'
                    }} />
                )}

                <div style={{ maxWidth: '600px', width: '100%' }}>

                    {/* Phase 1: Header */}
                    {phase >= 1 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '0.9rem',
                            color: 'var(--purple-mid)',
                            letterSpacing: '3px',
                            marginBottom: '1rem',
                            opacity: 0,
                            animation: 'fadeIn 1s forwards'
                        }}>
                            OFFICIAL VERDICT
                        </div>
                    )}

                    {phase >= 1 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            opacity: 0.6,
                            marginBottom: '2rem'
                        }}>
                            Case #0214: The Boy vs His Feelings
                        </div>
                    )}

                    {/* Phase 2: Build-up */}
                    {phase >= 2 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '1rem',
                            color: 'var(--text-main)',
                            lineHeight: '2',
                            marginBottom: '2rem',
                            opacity: 0,
                            animation: 'fadeIn 1s forwards'
                        }}>
                            <TypewriterText text="After thorough investigation..." speed={40} />
                            <br />
                            <TypewriterText text="After examining all evidence..." speed={40} delay={1500} />
                            <br />
                            <TypewriterText text="After interrogation and confession..." speed={40} delay={3000} />
                        </div>
                    )}

                    {/* Phase 3: GUILTY */}
                    {phase >= 3 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '1rem',
                            color: 'var(--text-main)',
                            marginBottom: '0.5rem'
                        }}>
                            The court finds:
                        </div>
                    )}

                    {phase >= 3 && (
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '4rem',
                            color: 'var(--red-stamp)',
                            fontWeight: 'bold',
                            textShadow: '0 0 30px rgba(255,0,0,0.5)',
                            margin: '1rem 0 2rem',
                            opacity: 0,
                            animation: 'stampSlam 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                        }}>
                            GUILTY.
                        </div>
                    )}

                    {/* Phase 4: Guilty of... */}
                    {phase >= 4 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '0.9rem',
                            color: 'var(--white)', // Keep white as it's on dark bg
                            lineHeight: '1.8',
                            textAlign: 'left',
                            marginBottom: '2rem',
                            padding: '1rem',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '8px',
                            borderLeft: '3px solid var(--purple-mid)',
                            opacity: 0,
                            animation: 'fadeIn 1.5s forwards',
                            whiteSpace: 'pre-line'
                        }}>
                            {"Guilty of:\n— Falling completely for Investigator Disha Joshi\n— Cherishing every stewwwpid moment together\n— Believing things fall into place (because she taught him to)\n— Wanting to create more evidence, more memories, more moments"}
                        </div>
                    )}

                    {/* Phase 5: Personal memories */}
                    {phase >= 5 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '0.9rem',
                            color: 'var(--text-main)',
                            lineHeight: '1.9',
                            marginBottom: '2rem',
                            fontStyle: 'italic',
                            opacity: 0,
                            animation: 'fadeIn 2s forwards',
                            whiteSpace: 'pre-line'
                        }}>
                            {"From the riverfront where he first said \"I like you\"\nTo the temple where your parents' story became part of yours\nFrom the Takshashila deck where you made him feel seen\nTo countless drives with his arm around you...\n\nEvery moment has been building to this."}
                        </div>
                    )}

                    {/* Phase 6: The emotional peak */}
                    {phase >= 6 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '1rem',
                            color: 'var(--text-main)',
                            lineHeight: '2',
                            marginBottom: '2rem',
                            opacity: 0,
                            animation: 'fadeIn 2s forwards',
                            whiteSpace: 'pre-line'
                        }}>
                            {"And here's what the court knows:\n\nWhat matters if your heart doesn't?\n\nAnd his heart?\nIt matters.\n\nBecause of you."}
                        </div>
                    )}
                </div>

                {/* Button */}
                {showButton && (
                    <button
                        onClick={() => {
                            playSFX('click');
                            goToPage(8);
                        }}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem 3rem',
                            fontSize: '1.2rem',
                            fontFamily: 'var(--font-display)',
                            background: 'var(--purple-mid)',
                            color: 'var(--white)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(107, 63, 160, 0.6)',
                            cursor: 'pointer',
                            border: 'none',
                            opacity: 0,
                            animation: 'slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                        }}
                    >
                        💜 VIEW RECOMMENDED ACTION →
                    </button>
                )}

                <style>{`
                    @keyframes stampSlam {
                        0% { transform: scale(3); opacity: 0; }
                        50% { opacity: 0.5; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}</style>

            </div>
        </PageTransition>
    );
};
