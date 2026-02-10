import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import confetti from 'canvas-confetti';

export const Page9_Celebration = () => {
    const { resetGame } = useGame();
    const { playSFX } = useAudio();
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        // Continuous confetti for a few seconds
        const end = Date.now() + 3000;
        const colors = ['#bb0000', '#ffffff', '#9b72cf'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    const handleHeartClick = () => {
        playSFX('pop');
        setClickCount(prev => prev + 1);

        // Easter Egg
        if (clickCount + 1 === 5) {
            playSFX('cheer'); // or specific easter egg sound
            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.6 }
            });
        }
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
                padding: '2rem'
            }}>

                <div
                    onClick={handleHeartClick}
                    style={{
                        fontSize: '6rem',
                        marginBottom: '2rem',
                        animation: 'bounce 2s infinite',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                >
                    💖
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3.5rem',
                    color: 'var(--white)',
                    marginBottom: '2rem',
                    textShadow: '0 5px 20px rgba(107, 63, 160, 0.8)'
                }}>
                    HAPPY VALENTINE'S DAY!
                </h1>

                <p style={{
                    fontFamily: 'var(--font-typewriter)',
                    fontSize: '1.2rem',
                    color: 'var(--cream)',
                    maxWidth: '500px',
                    marginBottom: '3rem'
                }}>
                    You have officially stolen my heart. <br />
                    Sentence: To be loved forever.
                </p>

                {clickCount >= 5 && (
                    <div style={{
                        marginBottom: '2rem',
                        color: '#ffdd00',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        animation: 'pulse 0.5s infinite'
                    }}>
                        I LOVE YOU! 3000! 🚀
                    </div>
                )}

                <button
                    onClick={() => {
                        playSFX('click');
                        resetGame();
                    }}
                    style={{
                        padding: '1rem 2rem',
                        fontSize: '1.1rem',
                        fontFamily: 'var(--font-display)',
                        background: 'var(--purple-mid)',
                        color: 'var(--white)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(107, 63, 160, 0.4)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        border: 'none'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    🔄 REPLAY OUR STORY
                </button>

                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: 'monospace'
                }}>
                    Made with 💜 for Disha
                </div>

            </div>
        </PageTransition>
    );
};
