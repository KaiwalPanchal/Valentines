import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import { TypewriterText } from '../components/TypewriterText';

const CLUES = [
    { id: 'ticket', label: 'Flight Ticket', top: '30%', left: '20%', icon: '🛫' },
    { id: 'ring', label: 'Jewelry Receipt', top: '70%', left: '80%', icon: '💍' },
    { id: 'letter', label: 'Old Love Letter', top: '50%', left: '50%', icon: '💌' },
];

export const Page5_Hidden = () => {
    const { goToPage, findClue, cluesFound } = useGame();
    const { playSFX } = useAudio();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Track Found Count
    const foundCount = cluesFound.size;
    const totalClues = CLUES.length;
    const isComplete = foundCount === totalClues;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleClueClick = (id: string) => {
        if (!cluesFound.has(id)) {
            findClue(id);
            playSFX('chime');

            if (foundCount + 1 === totalClues) {
                setTimeout(() => {
                    playSFX('completion'); // Or longer chime
                    setTimeout(() => goToPage(6), 2000);
                }, 1000);
            }
        }
    };

    return (
        <PageTransition>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#000', // Pitch black base
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'none' // Hide default cursor, flashlight is cursor
                }}
            >
                {/* The Scene (visible only via mask) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'url("https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop") center/cover', // Dark moody room placeholder
                        maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 90%)`,
                        WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 90%)`,
                        pointerEvents: 'none' // Let clicks pass through to underlying clues? No, mask needs to be on top? 
                        // Actually, best way: Two layers.
                        // Bottom: Pitch black.
                        // Top: The image, masked. 
                        // Clues: Should be on TOP of image, but only visible if masked? 
                        // Easier: The WHOLE CONTAINER is the image, but with a rapid radial gradient black overlay.
                    }}
                />

                {/* Alternative Flashlight Approach: Large div with radial gradient hole */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.95) 100%)`,
                    pointerEvents: 'none', // Allow clicking clues underneath
                    zIndex: 10
                }} />

                {/* Clues (Positioned in the dark) */}
                {CLUES.map(clue => {
                    const isFound = cluesFound.has(clue.id);
                    // Calculate distance to flashlight for visibility logic if we want to hide them completely when far
                    // For now, rely on dark overlay
                    return (
                        <div
                            key={clue.id}
                            onClick={() => handleClueClick(clue.id)}
                            style={{
                                position: 'absolute',
                                top: clue.top,
                                left: clue.left,
                                fontSize: '3rem',
                                cursor: isFound ? 'default' : 'pointer',
                                opacity: isFound ? 0.3 : 0.9, // Dim when found
                                transform: isFound ? 'scale(0.8)' : 'scale(1)',
                                transition: 'all 0.3s',
                                zIndex: 5,
                                // Add a glow so they "catch the light"
                                filter: isFound ? 'grayscale(100%)' : 'drop-shadow(0 0 10px white)',
                                pointerEvents: 'auto'
                            }}
                        >
                            {clue.icon}
                            {isFound && (
                                <div style={{
                                    position: 'absolute',
                                    top: -20,
                                    left: 0,
                                    fontSize: '0.8rem',
                                    background: '#22cc22',
                                    color: 'white',
                                    padding: '2px 5px',
                                    borderRadius: '4px',
                                    whiteSpace: 'nowrap'
                                }}>
                                    FOUND
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Status Text */}
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    width: '100%',
                    textAlign: 'center',
                    color: 'var(--white)',
                    zIndex: 20,
                    pointerEvents: 'none'
                }}>
                    <h2 style={{ fontFamily: 'var(--font-typewriter)', textShadow: '0 0 5px black' }}>
                        HIDDEN CLUES FOUND: {foundCount}/{totalClues}
                    </h2>
                    {isComplete && (
                        <div style={{ color: '#22cc22', fontWeight: 'bold' }}>
                            <TypewriterText text="MATCH CONFIRMED. PREPARING FINAL CHALLENGE..." speed={30} />
                        </div>
                    )}
                </div>

            </div>
        </PageTransition>
    );
};
