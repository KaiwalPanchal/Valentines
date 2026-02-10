import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import { TypewriterText } from '../components/TypewriterText';

export const Page2_Suspect = () => {
    const { goToPage } = useGame();
    const { playSFX } = useAudio();

    useEffect(() => {
        // Play paper shuffle on mount
        playSFX('paperShuffle');

        // Play stamp sound after text types a bit
        const timer = setTimeout(() => {
            playSFX('whoosh'); // Stamp impact sound replacement
        }, 1500);

        return () => clearTimeout(timer);
    }, [playSFX]);

    return (
        <PageTransition>
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--purple-deep)',
                position: 'relative',
                padding: '2rem'
            }}>

                {/* Background Stamps/Texture */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    right: '5%',
                    transform: 'rotate(-15deg)',
                    fontFamily: 'var(--font-typewriter)',
                    fontSize: '4rem',
                    color: 'rgba(255, 255, 255, 0.05)',
                    pointerEvents: 'none'
                }}>
                    CONFIDENTIAL
                </div>

                {/* Profile Card */}
                <div style={{
                    background: 'var(--cream)',
                    color: 'var(--black)',
                    padding: '2rem',
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    transform: 'rotate(-2deg)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    border: '1px solid var(--cream-dark)'
                }}>

                    {/* Paper Texture Overlay (simulated) */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+")',
                        pointerEvents: 'none'
                    }} />

                    {/* Header */}
                    <div style={{
                        borderBottom: '2px solid var(--black)',
                        paddingBottom: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}>
                        <h2 style={{ fontFamily: 'var(--font-typewriter)', fontSize: '1.5rem', margin: 0 }}>
                            SUSPECT PROFILE
                        </h2>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>#0214</span>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {/* Photo Area */}
                        <div style={{
                            flex: '0 0 150px',
                            height: '180px',
                            background: '#ddd',
                            border: '4px solid white',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            position: 'relative',
                            transform: 'rotate(2deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            {/* Placeholder Content if no image */}
                            <span style={{ fontSize: '3rem', opacity: 0.3 }}>?</span>

                            {/* Real Image (commented out for user to enable) */}
                            {/* <img src="/assets/photos/suspect.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}

                            {/* TARGET Stamp */}
                            <div style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '-10px',
                                border: '3px solid var(--red-stamp)',
                                color: 'var(--red-stamp)',
                                padding: '2px 8px',
                                fontFamily: 'var(--font-typewriter)',
                                fontWeight: 'bold',
                                transform: 'rotate(-15deg)',
                                background: 'rgba(255,255,255,0.8)',
                                fontSize: '0.9rem'
                            }}>
                                TARGET
                            </div>
                        </div>

                        {/* Details */}
                        <div style={{ flex: 1, fontFamily: 'var(--font-typewriter)', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <div>
                                <strong>NAME:</strong> Disha
                            </div>
                            <div>
                                <strong>ALIAS:</strong> "The Cutie"
                            </div>
                            <div>
                                <strong>CRIME:</strong> Grand Theft Heart
                            </div>
                            <div>
                                <strong>LAST SEEN:</strong> Being adorable
                            </div>
                            <div style={{ marginTop: '0.5rem' }}>
                                <strong>NOTES:</strong>
                                <TypewriterText
                                    text="Subject is extremely dangerous. One look may cause permanent heart loss."
                                    speed={20}
                                    className="text-sm mt-1 opacity-80"
                                    delay={500}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Big Stamp Animation */}
                    <div style={{
                        position: 'absolute',
                        top: '40%',
                        left: '30%',
                        transform: 'translate(-50%, -50%) rotate(-15deg) scale(3)',
                        opacity: 0,
                        border: '5px solid var(--red-stamp)',
                        color: 'var(--red-stamp)',
                        padding: '1rem',
                        fontFamily: 'var(--font-typewriter)',
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        textTransform: 'uppercase',
                        animation: 'stampSlam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                        animationDelay: '1.5s',
                        pointerEvents: 'none'
                    }}>
                        WANTED
                    </div>

                    <style>{`
            @keyframes stampSlam {
              0% { transform: translate(-50%, -50%) rotate(-15deg) scale(3); opacity: 0; }
              50% { opacity: 0.5; }
              100% { transform: translate(-50%, -50%) rotate(-15deg) scale(1); opacity: 0.8; }
            }
          `}</style>

                </div>

                {/* Action Button */}
                <button
                    onClick={() => goToPage(3)}
                    style={{
                        marginTop: '3rem',
                        padding: '1rem 3rem',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-display)',
                        background: 'var(--purple-mid)',
                        color: 'var(--white)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(107, 63, 160, 0.4)',
                        transition: 'transform 0.2s',
                        animation: 'fadeIn 0.5s ease-out 3s backwards'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    📂 REVIEW EVIDENCE
                </button>

            </div>
        </PageTransition>
    );
};
