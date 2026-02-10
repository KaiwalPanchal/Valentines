import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import confetti from 'canvas-confetti';

export const Page8_Ask = () => {
    const { goToPage } = useGame();
    const { playSFX } = useAudio();
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

    const handleNoHover = () => {
        playSFX('whoosh');
        const x = (Math.random() - 0.5) * 300; // Move up to 150px away
        const y = (Math.random() - 0.5) * 300;
        setNoBtnPos({ x, y });
    };

    const handleYes = () => {
        playSFX('cheer');
        playSFX('music'); // Ensure music is playing or restarts
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        setTimeout(() => goToPage(9), 1000);
    };

    return (
        <PageTransition>
            <div style={{
                width: '100%',
                height: '100%',
                background: 'var(--purple-deep)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                overflow: 'hidden' // Keep running button inside? Or let it clip is fine
            }}>

                <div style={{
                    fontSize: '5rem',
                    marginBottom: '2rem',
                    animation: 'pulse 1s infinite'
                }}>
                    💖
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '4rem',
                    color: 'var(--white)',
                    marginBottom: '3rem',
                    textShadow: '0 5px 20px rgba(107, 63, 160, 0.8)'
                }}>
                    Will you be my Valentine?
                </h1>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <button
                        onClick={handleYes}
                        style={{
                            padding: '1.5rem 4rem',
                            fontSize: '2rem',
                            fontFamily: 'var(--font-display)',
                            background: '#22cc22', // Green for YES
                            color: 'white',
                            borderRadius: '50px',
                            border: 'none',
                            boxShadow: '0 10px 30px rgba(34, 204, 34, 0.5)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            zIndex: 10
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        YES! 🥰
                    </button>

                    <button
                        onMouseEnter={handleNoHover}
                        onClick={handleNoHover} // Handle click on mobile just in case
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1.2rem',
                            fontFamily: 'var(--font-body)',
                            background: '#ff4d4d',
                            color: 'white',
                            borderRadius: '50px',
                            border: 'none',
                            cursor: 'pointer',
                            transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)`,
                            transition: 'all 0.2s ease-out'
                        }}
                    >
                        No thanks
                    </button>
                </div>

            </div>
        </PageTransition>
    );
};
