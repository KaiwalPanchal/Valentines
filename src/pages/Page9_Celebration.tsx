import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import confetti from 'canvas-confetti';

export const Page9_Celebration = () => {
    const { resetGame, replayCount, setAnswered } = useGame();
    const { playSFX } = useAudio();
    const [heartClicks, setHeartClicks] = useState(0);
    const [showBarbie, setShowBarbie] = useState(false);

    // Mark as answered on mount (was not done before)
    useEffect(() => {
        setAnswered(true);
    }, [setAnswered]);

    // Confetti burst on mount
    useEffect(() => {
        const end = Date.now() + 4000;
        const colors = ['#9b72cf', '#ff69b4', '#ffffff', '#ffdd00'];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
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
        setHeartClicks(prev => prev + 1);

        if (heartClicks + 1 === 5) {
            playSFX('celebration');
            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.6 }
            });
        }
    };

    const handleBarbie = () => {
        setShowBarbie(!showBarbie);
        playSFX('pop');
    };

    const handleReplay = () => {
        playSFX('click');
        resetGame();
    };

    return (
        <PageTransition>
            <div style={{
                width: '100%',
                height: '100%',
                // background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1050 50%, #1a0a2e 100%)', // Removed for global theme
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>

                {/* Floating hearts animation */}
                {[...Array(8)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: `${10 + i * 12}%`,
                        fontSize: `${1.5 + Math.random()}rem`,
                        animation: `floatUp ${4 + i * 0.5}s ease-in infinite`,
                        animationDelay: `${i * 0.6}s`,
                        pointerEvents: 'none',
                        opacity: 0.6
                    }}>
                        {i % 2 === 0 ? '💜' : '💖'}
                    </div>
                ))}

                {/* Heart (clickable easter egg) */}
                <div
                    onClick={handleHeartClick}
                    style={{
                        fontSize: '5rem',
                        marginBottom: '1.5rem',
                        animation: 'bounce 2s infinite',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                >
                    💖
                </div>

                {/* Main heading */}
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3.5rem',
                    color: 'var(--text-main)',
                    marginBottom: '1rem',
                    textShadow: '0 5px 20px rgba(107, 63, 160, 0.8)'
                }}>
                    🎉 SHE SAID YES! 🎉
                </h1>

                {/* Stitch Speech */}
                <div style={{
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: '12px',
                    padding: '0.8rem 1.5rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <img src="/assets/characters/stitch_celebrating.png" alt="Stitch" style={{ width: '60px', height: 'auto' }} />
                    <span style={{
                        fontFamily: 'var(--font-typewriter)',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)'
                    }}>
                        "Experiment 626 approves this date!"
                    </span>
                </div>

                {/* Case Status Block */}
                <div style={{
                    fontFamily: 'var(--font-typewriter)',
                    fontSize: '1rem',
                    color: 'var(--white)', // Keep light in dark box
                    lineHeight: '2',
                    marginBottom: '1.5rem',
                    background: 'rgba(0,0,0,0.6)', // Darken background slightly more for contrast
                    padding: '1.5rem 2rem',
                    borderRadius: '12px',
                    border: '1px solid var(--purple-mid)'
                }}>
                    <div>Disha & Kaiwal</div>
                    <div>Valentine's Day 2025</div>
                    <div style={{ marginTop: '0.5rem' }}>
                        Case Status: <strong style={{ color: '#22cc22' }}>SOLVED</strong>
                    </div>
                    <div>
                        Relationship Status: <strong style={{ color: 'var(--purple-light)' }}>Updating...</strong>
                    </div>
                    <div>
                        Heart Status: <strong style={{ color: '#ff69b4' }}>Very Full 💜</strong>
                    </div>
                </div>

                {/* Additional text */}
                <p style={{
                    fontFamily: 'var(--font-typewriter)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    opacity: 0.7,
                    marginBottom: '2rem'
                }}>
                    Date details coming soon 🥰<br />
                    (But first, how stewwwpid was this whole thing?)
                </p>

                {/* Easter egg: click heart 5 times */}
                {heartClicks >= 5 && (
                    <div style={{
                        marginBottom: '1.5rem',
                        color: '#ffdd00',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        animation: 'pulse 0.5s infinite'
                    }}>
                        I LOVE YOU! 💜🚀
                    </div>
                )}

                {/* Replay counter easter egg */}
                {replayCount >= 3 && (
                    <div style={{
                        marginBottom: '1rem',
                        color: 'var(--purple-mid)',
                        fontFamily: 'var(--font-typewriter)',
                        fontSize: '0.85rem',
                        opacity: 0.7
                    }}>
                        Third time's the charm? 😄
                    </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button
                        onClick={handleReplay}
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
                        🔄 REPLAY THE CASE
                    </button>
                </div>

                {/* Barbie easter egg */}
                <div
                    onClick={handleBarbie}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        opacity: 0.3,
                        transition: 'opacity 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.3'}
                >
                    💅
                </div>
                {showBarbie && (
                    <div style={{
                        position: 'absolute',
                        bottom: '55px',
                        left: '20px',
                        background: 'rgba(255,255,255,0.95)',
                        color: '#333',
                        padding: '0.6rem 1rem',
                        borderRadius: '12px',
                        fontFamily: 'var(--font-typewriter)',
                        fontSize: '0.8rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        animation: 'fadeIn 0.3s'
                    }}>
                        Barbie says: This is Kenough! 💅
                    </div>
                )}

                {/* Footer */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    fontSize: '0.7rem',
                    color: 'rgba(0,0,0,0.3)',
                    fontFamily: 'monospace'
                }}>
                    Built with 💜 for Disha
                </div>

                <style>{`
                    @keyframes floatUp {
                        0% { transform: translateY(0); opacity: 0.6; }
                        50% { opacity: 1; }
                        100% { transform: translateY(-100vh); opacity: 0; }
                    }
                `}</style>

            </div>
        </PageTransition >
    );
};
