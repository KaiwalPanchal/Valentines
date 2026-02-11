import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import { TypewriterText } from '../components/TypewriterText';

interface Clue {
    id: string;
    trait: string;
    note: string;
    status: string;
    top: string;
    left: string;
    icon: string;
}

const CLUES: Clue[] = [
    {
        id: 'intelligence',
        trait: 'Intelligence',
        note: '"The way she argues a point, breaks down logic,\nmakes me want to just... listen forever."',
        status: 'Suspect is in awe.',
        top: '25%', left: '15%', icon: '🧠'
    },
    {
        id: 'poetry',
        trait: 'Her Poetry',
        note: '"She writes while listening to Shankar Mahadevan.\nThe world pauses. She creates beauty from feelings."',
        status: 'Suspect may be inspired by this.',
        top: '60%', left: '75%', icon: '📝'
    },
    {
        id: 'voice',
        trait: 'The Stewwwpid Voice',
        note: '"The way she says certain words.\nThat accent. That tone.\nIt\'s now his favorite sound."',
        status: 'Suspect smiles like an idiot when he hears it.',
        top: '40%', left: '45%', icon: '🗣️'
    },
    {
        id: 'comfort',
        trait: 'Her Comfort',
        note: '"Takshashila deck. He was down.\nShe just... knew what to say.\nWhat matters if your heart doesn\'t?"',
        status: 'Suspect felt seen.',
        top: '70%', left: '25%', icon: '🤗'
    },
    {
        id: 'presence',
        trait: 'Her Presence',
        note: '"Long drives. His arm around her.\nNo destination needed.\nJust... her."',
        status: "Suspect's favorite place = wherever she is.",
        top: '30%', left: '70%', icon: '🚗'
    },
    {
        id: 'belief',
        trait: 'The Way She Believes',
        note: '"She rewatches The Notebook and 12 Angry Men.\nBelieves in love AND logic.\nIn hope AND reason.\n\'What else will you do if not believe?\'"',
        status: 'Suspect believes because she does.',
        top: '55%', left: '50%', icon: '✨'
    }
];

export const Page5_Hidden = () => {
    const { goToPage, findClue, cluesFound } = useGame();
    const { playSFX } = useAudio();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeClue, setActiveClue] = useState<Clue | null>(null);

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

    const handleClueClick = (clue: Clue) => {
        if (!cluesFound.has(clue.id)) {
            findClue(clue.id);
            playSFX('chime');
            setActiveClue(clue);

            // Auto-hide popup after 4 seconds
            setTimeout(() => setActiveClue(null), 4000);

            if (foundCount + 1 === totalClues) {
                setTimeout(() => {
                    setActiveClue(null);
                    playSFX('completion');
                    setTimeout(() => goToPage(6), 2000);
                }, 4500);
            }
        } else {
            // Toggle re-view
            setActiveClue(activeClue?.id === clue.id ? null : clue);
        }
    };

    return (
        <PageTransition>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#000',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: `url('/assets/ui/magnifier.png') 16 16, none`
                }}
            >
                {/* Header */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    padding: '1rem',
                    zIndex: 30,
                    pointerEvents: 'none',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontFamily: 'var(--font-typewriter)',
                        fontSize: '0.85rem',
                        color: 'var(--cream)',
                        opacity: 0.9,
                        textShadow: '0 0 10px black',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        <TypewriterText
                            text="CASE EXPANSION NOTICE — New evidence suggests suspect has identified his next target: The Investigator herself."
                            speed={25}
                            delay={300}
                        />
                    </div>
                </div>

                {/* Desk background visible through flashlight */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: `
                            radial-gradient(circle at 50% 50%, #3a2a1a 0%, #2a1a0a 50%, #1a0a00 100%)
                        `,
                        maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 90%)`,
                        WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 90%)`,
                        pointerEvents: 'none'
                    }}
                />

                {/* Dark overlay with flashlight hole */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.95) 100%)`,
                    pointerEvents: 'none',
                    zIndex: 10
                }} />

                {/* Clue Hotspots */}
                {CLUES.map(clue => {
                    const isFound = cluesFound.has(clue.id);
                    return (
                        <div
                            key={clue.id}
                            onClick={() => handleClueClick(clue)}
                            style={{
                                position: 'absolute',
                                top: clue.top,
                                left: clue.left,
                                fontSize: '2.5rem',
                                cursor: 'pointer',
                                opacity: isFound ? 0.5 : 0.9,
                                transform: isFound ? 'scale(0.8)' : 'scale(1)',
                                transition: 'all 0.3s',
                                zIndex: 5,
                                filter: isFound ? 'grayscale(50%)' : 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
                                pointerEvents: 'auto'
                            }}
                        >
                            {clue.icon}
                            {isFound && (
                                <div style={{
                                    position: 'absolute',
                                    top: -20,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.65rem',
                                    background: '#22cc22',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    whiteSpace: 'nowrap',
                                    fontFamily: 'var(--font-typewriter)'
                                }}>
                                    FOUND
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Clue Detail Popup */}
                {activeClue && (
                    <div
                        onClick={() => setActiveClue(null)}
                        style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(10, 5, 20, 0.95)',
                            border: '1px solid var(--purple-mid)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            maxWidth: '400px',
                            width: '90%',
                            zIndex: 50,
                            animation: 'fadeIn 0.3s ease-out',
                            boxShadow: '0 0 30px rgba(107, 63, 160, 0.4)'
                        }}
                    >
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            color: 'var(--purple-light)',
                            fontSize: '0.8rem',
                            marginBottom: '0.5rem',
                            letterSpacing: '2px'
                        }}>
                            TRAIT IDENTIFIED:
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--white)',
                            fontSize: '1.3rem',
                            marginBottom: '1rem'
                        }}>
                            {activeClue.trait}
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            color: 'var(--cream)',
                            fontSize: '0.85rem',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-line',
                            marginBottom: '0.75rem'
                        }}>
                            Note: {activeClue.note}
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-typewriter)',
                            color: 'var(--purple-mid)',
                            fontSize: '0.75rem',
                            fontStyle: 'italic'
                        }}>
                            Status: {activeClue.status}
                        </div>
                    </div>
                )}

                {/* Status Counter */}
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    width: '100%',
                    textAlign: 'center',
                    color: 'var(--white)',
                    zIndex: 20,
                    pointerEvents: 'none'
                }}>
                    <h2 style={{ fontFamily: 'var(--font-typewriter)', textShadow: '0 0 5px black', fontSize: '1.1rem' }}>
                        Clues Found: {foundCount}/{totalClues}
                    </h2>
                    {isComplete && (
                        <div style={{ color: '#22cc22', fontWeight: 'bold' }}>
                            <TypewriterText text="ANALYSIS COMPLETE — Suspect's file shows deep admiration and careful attention. This isn't just attraction. This is... understanding." speed={30} />
                        </div>
                    )}
                </div>

            </div>
        </PageTransition>
    );
};
