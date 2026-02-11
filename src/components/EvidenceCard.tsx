import { useState } from 'react';
import type { EvidenceItem } from '../data/evidence';
import { useAudio } from '../hooks/useAudio';

interface EvidenceCardProps {
    item: EvidenceItem;
    isCollected: boolean;
    onCollect: () => void;
}

export const EvidenceCard = ({ item, isCollected, onCollect }: EvidenceCardProps) => {
    const { playSFX } = useAudio();
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        if (!isCollected) {
            playSFX('pop');
            onCollect();
            setIsFlipped(true); // Auto flip on collect
        } else {
            playSFX('paperSlide');
            setIsFlipped(!isFlipped);
        }
    };

    return (
        <div
            onClick={handleClick}
            style={{
                position: 'absolute',
                top: item.top,
                left: item.left,
                transform: `rotate(${item.rotation}deg) scale(${isCollected ? 1.1 : 1})`,
                width: '160px',
                height: '160px',
                cursor: 'pointer',
                perspective: '1000px',
                transition: 'all 0.3s ease',
                zIndex: isFlipped ? 100 : 1,
                opacity: isCollected ? 1 : 0.9
            }}
        >
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                transition: 'transform 0.6s',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}>

                {/* Front (Icon) */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'var(--cream)',
                    border: `2px solid ${isCollected ? 'var(--purple-mid)' : 'var(--cream-dark)'}`,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    padding: '10px'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{item.icon}</div>
                    <div style={{
                        fontFamily: 'var(--font-typewriter)',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}>
                        {item.title}
                    </div>
                    {!isCollected && (
                        <div style={{
                            marginTop: '5px',
                            fontSize: '0.7rem',
                            color: '#666',
                            animation: 'pulse 2s infinite'
                        }}>
                            Click to inspect
                        </div>
                    )}
                    {isCollected && (
                        <div style={{
                            position: 'absolute',
                            top: -10,
                            right: -10,
                            background: 'var(--green-500)', // define or use hardcode
                            color: 'white',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}>✓</div>
                    )}
                </div>

                {/* Back (Evidence Log) */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'var(--white)',
                    border: '2px solid var(--purple-mid)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    borderRadius: '8px',
                    padding: '10px',
                    transform: 'rotateY(180deg)',
                    fontFamily: 'var(--font-typewriter)',
                    fontSize: '0.65rem',
                    lineHeight: '1.4',
                    color: 'var(--black)',
                    overflow: 'auto',
                    textAlign: 'left',
                    whiteSpace: 'pre-line'
                }}>
                    <p style={{ margin: 0 }}>{item.log}</p>
                </div>

            </div>
        </div>
    );
};
