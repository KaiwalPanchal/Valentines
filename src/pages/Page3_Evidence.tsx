import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import { EvidenceCard } from '../components/EvidenceCard';
import { evidenceData } from '../data/evidence';


export const Page3_Evidence = () => {
    const { goToPage, evidenceCollected, collectEvidence } = useGame();
    const { playSFX } = useAudio();
    const [showButton, setShowButton] = useState(false);

    const collectedCount = evidenceCollected.size;
    const totalEvidence = evidenceData.length;
    const isComplete = collectedCount === totalEvidence;

    useEffect(() => {
        if (isComplete) {
            if (!showButton) {
                setTimeout(() => {
                    playSFX('chime');
                    playSFX('completion'); // If mapped, else use chime again
                }, 500);
                setShowButton(true);
            }
        }
    }, [isComplete, showButton, playSFX]);

    const handleCollect = (id: string) => {
        collectEvidence(id);
    };

    return (
        <PageTransition>
            <div style={{
                width: '100%',
                height: '100%',
                background: `url('/assets/textures/corkboard_texture.jpg') center/cover`,
                position: 'relative',
                overflow: 'hidden'
            }}>

                {/* Header / Stats */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--white)',
                    zIndex: 10
                }}>
                    <h2 style={{ fontFamily: 'var(--font-typewriter)', margin: 0 }}>EVIDENCE BOARD</h2>
                    <div style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>
                        COLLECTED: <span style={{ color: isComplete ? '#22cc22' : 'var(--white)' }}>{collectedCount}/{totalEvidence}</span>
                    </div>
                </div>

                {/* Board Area */}
                <div style={{
                    position: 'absolute',
                    top: '60px',
                    bottom: '80px',
                    left: '20px',
                    right: '20px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    border: '2px dashed rgba(255,255,255,0.1)',
                    boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)',
                    overflow: 'hidden' // Or 'auto' if scrolling needed on mobile, but try to fit
                }}>
                    {evidenceData.map(item => (
                        <EvidenceCard
                            key={item.id}
                            item={item}
                            isCollected={evidenceCollected.has(item.id)}
                            onCollect={() => handleCollect(item.id)}
                        />
                    ))}
                </div>

                {/* Action Button */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none' // Let clicks pass through if button hidden
                }}>
                    {isComplete && (
                        <button
                            onClick={() => goToPage(4)}
                            style={{
                                pointerEvents: 'auto',
                                padding: '1rem 3rem',
                                fontSize: '1.2rem',
                                fontFamily: 'var(--font-display)',
                                background: 'var(--purple-mid)',
                                color: 'var(--white)',
                                borderRadius: '8px',
                                boxShadow: '0 0 20px rgba(107, 63, 160, 0.6)',
                                animation: 'slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                        >
                            🕵️‍♀️ INTERROGATE SUSPECT
                        </button>
                    )}
                    {!isComplete && collectedCount > 0 && (
                        <div style={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-typewriter)'
                        }}>
                            Find all clues to proceed...
                        </div>
                    )}
                </div>

            </div>
        </PageTransition>
    );
};
