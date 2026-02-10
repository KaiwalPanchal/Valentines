import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { TypewriterText } from '../components/TypewriterText';
import { PageTransition } from '../components/PageTransition';

export const Page0_Loading = () => {
    const { goToPage } = useGame();
    const { playSFX } = useAudio();

    useEffect(() => {
        // Play a subtle shuffle sound on mount
        playSFX('paperShuffle');

        const timer = setTimeout(() => {
            goToPage(1);
        }, 4000); // 4 seconds total for text to type + pause

        return () => clearTimeout(timer);
    }, [goToPage, playSFX]);

    return (
        <PageTransition>
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--purple-deep), var(--purple-dark))',
                color: 'var(--purple-light)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Floating background particles */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    fontSize: '2rem',
                    opacity: 0.2,
                    animation: 'float 3s ease-in-out infinite'
                }}>💜</div>
                <div style={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '20%',
                    fontSize: '1.5rem',
                    opacity: 0.15,
                    animation: 'float 4s ease-in-out infinite reverse'
                }}>✨</div>

                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    marginBottom: '2rem',
                    textShadow: '0 0 10px rgba(155, 114, 207, 0.3)'
                }}>
                    Case #0214
                </h1>

                <div style={{ fontFamily: 'var(--font-typewriter)', fontSize: '1.2rem', minHeight: '1.5em' }}>
                    <TypewriterText
                        text="Loading something special..."
                        speed={50}
                        delay={500}
                    />
                </div>
            </div>
        </PageTransition>
    );
};
