import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import { TypewriterText } from '../components/TypewriterText';

export const Page2_Suspect = () => {
    const { goToPage } = useGame();
    const { playSFX } = useAudio();

    useEffect(() => {
        playSFX('paperShuffle');
        const timer = setTimeout(() => {
            playSFX('whoosh');
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
                // background: `url('/assets/textures/aged_paper_texture.jpg') center/cover`, // Removed for global theme
                position: 'relative',
                padding: '2rem'
            }}>

                {/* Background Stamps - actual images */}
                <img
                    src="/assets/stamps/confidential_stamp.png"
                    alt=""
                    style={{
                        position: 'absolute',
                        top: '8%',
                        right: '3%',
                        width: '200px',
                        transform: 'rotate(-12deg)',
                        opacity: 0.15,
                        pointerEvents: 'none'
                    }}
                />
                <img
                    src="/assets/stamps/urgent_stamp.png"
                    alt=""
                    style={{
                        position: 'absolute',
                        bottom: '12%',
                        left: '3%',
                        width: '150px',
                        transform: 'rotate(8deg)',
                        opacity: 0.15,
                        pointerEvents: 'none'
                    }}
                />

                {/* Profile Card */}
                <div style={{
                    background: 'var(--cream)',
                    color: 'var(--black)',
                    padding: '2rem',
                    maxWidth: '550px',
                    width: '100%',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    transform: 'rotate(-1deg)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    border: '1px solid var(--cream-dark)'
                }}>

                    {/* Paper Texture Overlay */}
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
                            SUSPECT DOSSIER
                        </h2>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>#0214</span>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {/* Photo Area with Polaroid Frame */}
                        <div style={{
                            flex: '0 0 140px',
                            height: '170px',
                            position: 'relative',
                            transform: 'rotate(2deg)',
                        }}>
                            {/* Polaroid frame overlay */}
                            <img
                                src="/assets/ui/polaroid_frame.png"
                                alt=""
                                style={{
                                    position: 'absolute',
                                    top: '-10px', left: '-10px',
                                    width: '160px',
                                    height: '190px',
                                    objectFit: 'contain',
                                    zIndex: 2,
                                    pointerEvents: 'none'
                                }}
                            />
                            {/* Actual suspect photo */}
                            <img
                                src="/assets/photos/suspect.jpg"
                                alt="Suspect"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    border: '4px solid white',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                                }}
                            />

                            {/* Primary Suspect label */}
                            <div style={{
                                position: 'absolute',
                                bottom: '8px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontFamily: 'var(--font-typewriter)',
                                fontSize: '0.6rem',
                                color: '#666',
                                whiteSpace: 'nowrap'
                            }}>
                                PRIMARY SUSPECT
                            </div>

                            {/* TARGET Stamp */}
                            <div style={{
                                position: 'absolute',
                                top: '8px',
                                right: '-8px',
                                border: '3px solid var(--red-stamp)',
                                color: 'var(--red-stamp)',
                                padding: '2px 8px',
                                fontFamily: 'var(--font-typewriter)',
                                fontWeight: 'bold',
                                transform: 'rotate(-15deg)',
                                background: 'rgba(255,255,255,0.8)',
                                fontSize: '0.8rem',
                                zIndex: 3
                            }}>
                                TARGET
                            </div>
                        </div>

                        {/* Details */}
                        <div style={{ flex: 1, fontFamily: 'var(--font-typewriter)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div>
                                <strong>NAME:</strong> [Suspect Name]
                            </div>
                            <div>
                                <strong>ALIAS:</strong> "The One Who Fell First"
                            </div>
                            <div style={{ marginTop: '0.3rem' }}>
                                <strong>CHARGES:</strong>
                                <ul style={{ margin: '0.3rem 0 0 1.2rem', padding: 0, fontSize: '0.85rem', lineHeight: '1.6' }}>
                                    <li>Excessive smiling at phone notifications</li>
                                    <li>Chronic daydreaming during work</li>
                                    <li>Unauthorized butterflies in stomach</li>
                                    <li>Criminal levels of wanting to spend time together</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Last Known Locations */}
                    <div style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <strong>LAST KNOWN LOCATIONS:</strong>
                        <div style={{ marginTop: '0.3rem', paddingLeft: '1rem', opacity: 0.8 }}>
                            📍 The Riverfront (scene of first confession)<br />
                            📍 The Temple (proposal legacy site)<br />
                            📍 Takshashila Deck (comfort zone)<br />
                            📍 Long-drive routes (mobile therapy)
                        </div>
                    </div>

                    {/* Threat Level */}
                    <div style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.9rem' }}>
                        <strong>THREAT LEVEL:</strong>{' '}
                        <span style={{ fontSize: '1.1rem', letterSpacing: '2px' }}>💜💜💜💜💜</span>
                    </div>

                    {/* Notes */}
                    <div style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                        <strong>OFFICER'S NOTE:</strong>
                        <div style={{ marginTop: '0.3rem' }}>
                            <TypewriterText
                                text="Subject is extremely dangerous. One look may cause permanent heart loss. Approach with caution (and maybe flowers)."
                                speed={20}
                                delay={500}
                            />
                        </div>
                    </div>

                    {/* WANTED Stamp Animation */}
                    <div style={{
                        position: 'absolute',
                        top: '40%',
                        left: '35%',
                        transform: 'translate(-50%, -50%) rotate(-15deg) scale(3)',
                        opacity: 0,
                        border: '5px solid var(--red-stamp)',
                        color: 'var(--red-stamp)',
                        padding: '0.8rem',
                        fontFamily: 'var(--font-typewriter)',
                        fontSize: '3.5rem',
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
                        marginTop: '2.5rem',
                        padding: '1rem 3rem',
                        fontSize: '1.1rem',
                        fontFamily: 'var(--font-display)',
                        background: 'var(--purple-mid)',
                        color: 'var(--white)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(107, 63, 160, 0.4)',
                        transition: 'transform 0.2s',
                        animation: 'fadeIn 0.5s ease-out 3s backwards',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    📋 EXAMINE COLLECTED EVIDENCE →
                </button>

            </div>
        </PageTransition>
    );
};
