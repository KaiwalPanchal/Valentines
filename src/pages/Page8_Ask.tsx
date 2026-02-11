import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import confetti from 'canvas-confetti';

export const Page8_Ask = () => {
    const { goToPage } = useGame();
    const { playSFX } = useAudio();
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const [phase, setPhase] = useState(0);
    const [noChaseCount, setNoChaseCount] = useState(0);
    const [showStitch, setShowStitch] = useState(false);
    const [noVisible, setNoVisible] = useState(true);

    // Text reveal phases
    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 500),     // "Disha,"
            setTimeout(() => setPhase(2), 2500),    // "The case is closed..."
            setTimeout(() => setPhase(3), 5500),    // "But there's one thing left:"
            setTimeout(() => setPhase(4), 7500),    // "Will you be my Valentine?"
            setTimeout(() => setPhase(5), 10500),   // "Dinner at a cute place..."
            setTimeout(() => setPhase(6), 14000),   // Buttons appear
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    // Stitch appears after 5 chases of NO
    useEffect(() => {
        if (noChaseCount >= 5 && !showStitch) {
            setShowStitch(true);
            playSFX('playful');
            setTimeout(() => {
                setNoVisible(false);
            }, 2000);
        }
    }, [noChaseCount, showStitch, playSFX]);

    const handleNoHover = () => {
        playSFX('whoosh');
        const x = (Math.random() - 0.5) * 400;
        const y = (Math.random() - 0.5) * 400;
        setNoBtnPos({ x, y });
        setNoChaseCount(prev => prev + 1);
    };

    const handleYes = () => {
        playSFX('celebration');
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#9b72cf', '#ff69b4', '#fff', '#ffdd00']
        });
        setTimeout(() => goToPage(9), 1500);
    };

    return (
        <PageTransition>
            <div style={{
                width: '100%',
                height: '100%',
                background: `url('/assets/textures/purple_nightsky.jpg') center/cover`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                overflow: 'hidden',
                position: 'relative'
            }}>

                {/* Star field background */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 40% 70%, white, transparent), radial-gradient(1px 1px at 60% 20%, white, transparent), radial-gradient(1px 1px at 80% 60%, white, transparent), radial-gradient(1px 1px at 10% 80%, white, transparent), radial-gradient(2px 2px at 70% 40%, white, transparent), radial-gradient(1px 1px at 30% 50%, white, transparent), radial-gradient(1px 1px at 90% 10%, white, transparent), radial-gradient(1px 1px at 50% 90%, white, transparent), radial-gradient(1px 1px at 15% 55%, white, transparent)',
                    animation: 'twinkle 4s ease-in-out infinite alternate',
                    pointerEvents: 'none'
                }} />

                {/* Shooting star */}
                <div style={{
                    position: 'absolute',
                    top: '10%', left: '80%',
                    width: '100px', height: '2px',
                    background: 'linear-gradient(to left, transparent, white)',
                    transform: 'rotate(-45deg)',
                    animation: 'shootingStar 4s ease-in infinite',
                    animationDelay: '2s',
                    pointerEvents: 'none',
                    opacity: 0
                }} />

                {/* Bokeh particles */}
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${20 + i * 10}px`,
                        height: `${20 + i * 10}px`,
                        borderRadius: '50%',
                        background: `rgba(155, 114, 207, ${0.05 + i * 0.02})`,
                        filter: `blur(${5 + i * 3}px)`,
                        top: `${10 + i * 15}%`,
                        left: `${5 + i * 16}%`,
                        animation: `floatBokeh ${3 + i}s ease-in-out infinite alternate`,
                        pointerEvents: 'none'
                    }} />
                ))}

                <div style={{ maxWidth: '600px', width: '100%', zIndex: 5 }}>

                    {/* Phase 1: "Disha," */}
                    {phase >= 1 && (
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '2.5rem',
                            color: 'var(--white)',
                            marginBottom: '2rem',
                            opacity: 0,
                            animation: 'fadeIn 1.5s forwards'
                        }}>
                            Disha,
                        </div>
                    )}

                    {/* Phase 2: "The case is closed..." */}
                    {phase >= 2 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '1rem',
                            color: 'var(--cream)',
                            lineHeight: '2',
                            marginBottom: '1.5rem',
                            opacity: 0,
                            animation: 'fadeIn 1.5s forwards',
                            whiteSpace: 'pre-line'
                        }}>
                            {"The case is closed.\nThe evidence is clear.\nThe verdict is in."}
                        </div>
                    )}

                    {/* Phase 3: "But there's one thing left:" */}
                    {phase >= 3 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '1.1rem',
                            color: 'var(--purple-light)',
                            marginBottom: '2rem',
                            opacity: 0,
                            animation: 'fadeIn 1.5s forwards'
                        }}>
                            But there's one thing left:
                        </div>
                    )}

                    {/* Phase 4: THE QUESTION */}
                    {phase >= 4 && (
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '3rem',
                            color: 'var(--white)',
                            marginBottom: '2rem',
                            textShadow: '0 5px 30px rgba(107, 63, 160, 0.8)',
                            opacity: 0,
                            animation: 'fadeIn 2s forwards'
                        }}>
                            Will you be my Valentine?
                        </div>
                    )}

                    {/* Phase 5: Details */}
                    {phase >= 5 && (
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '0.95rem',
                            color: 'var(--cream)',
                            lineHeight: '1.8',
                            marginBottom: '2.5rem',
                            opacity: 0,
                            animation: 'fadeIn 1.5s forwards',
                            whiteSpace: 'pre-line'
                        }}>
                            {"Dinner at a cute place.\nQuality time.\nShared activities.\nJust us.\n\nWhat do you say, counselor?"}
                        </div>
                    )}
                </div>

                {/* Phase 6: Buttons */}
                {phase >= 6 && (
                    <div style={{
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center',
                        zIndex: 10,
                        opacity: 0,
                        animation: 'fadeIn 1s forwards'
                    }}>
                        <button
                            onClick={handleYes}
                            style={{
                                padding: '1.5rem 4rem',
                                fontSize: '1.8rem',
                                fontFamily: 'var(--font-display)',
                                background: 'linear-gradient(135deg, var(--purple-mid), #9b72cf)',
                                color: 'white',
                                borderRadius: '50px',
                                border: 'none',
                                boxShadow: '0 10px 30px rgba(107, 63, 160, 0.5)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                zIndex: 10
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(107, 63, 160, 0.7)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(107, 63, 160, 0.5)';
                            }}
                        >
                            💜 YES (obviously)
                        </button>

                        {noVisible && (
                            <button
                                onMouseEnter={handleNoHover}
                                onClick={handleNoHover}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    fontSize: '1rem',
                                    fontFamily: 'var(--font-body)',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.6)',
                                    borderRadius: '50px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    cursor: 'pointer',
                                    transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)`,
                                    transition: 'all 0.3s ease-out'
                                }}
                            >
                                No thanks
                            </button>
                        )}
                    </div>
                )}

                {/* Stitch Character */}
                {showStitch && (
                    <div style={{
                        position: 'absolute',
                        bottom: '15%',
                        right: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: 0,
                        animation: 'slideUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                        zIndex: 20
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.95)',
                            color: '#333',
                            padding: '0.8rem 1.2rem',
                            borderRadius: '12px',
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '0.85rem',
                            maxWidth: '200px',
                            position: 'relative',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                        }}>
                            Wrong answer! Ohana means saying yes! 🛸
                            {/* Speech bubble triangle */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-8px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 0, height: 0,
                                borderLeft: '8px solid transparent',
                                borderRight: '8px solid transparent',
                                borderTop: '8px solid rgba(255,255,255,0.95)'
                            }} />
                        </div>
                        <div style={{ fontSize: '4rem' }}>
                            <img src="/assets/characters/stitch_speech.png" alt="Stitch" style={{ width: '120px', height: 'auto' }} />
                        </div>
                    </div>
                )}

                <style>{`
                    @keyframes twinkle {
                        0% { opacity: 0.6; }
                        100% { opacity: 1; }
                    }
                    @keyframes shootingStar {
                        0% { opacity: 0; transform: rotate(-45deg) translateX(0); }
                        10% { opacity: 1; }
                        30% { opacity: 0; transform: rotate(-45deg) translateX(-300px); }
                        100% { opacity: 0; }
                    }
                    @keyframes floatBokeh {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-20px); }
                    }
                `}</style>

            </div>
        </PageTransition>
    );
};
