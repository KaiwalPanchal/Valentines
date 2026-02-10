import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import { TypewriterText } from '../components/TypewriterText';

export const Page7_Verdict = () => {
    const { goToPage } = useGame();
    const { playSFX } = useAudio();

    useEffect(() => {
        // Play Gavel sound after a beat
        setTimeout(() => {
            playSFX('gavel');
        }, 1000);
    }, [playSFX]);

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

                <div style={{
                    fontSize: '4rem',
                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
                    marginBottom: '2rem',
                    animation: 'bounce 2s infinite'
                }}>
                    ⚖️
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    color: 'var(--white)',
                    marginBottom: '2rem',
                    textShadow: '0 5px 15px rgba(0,0,0,0.5)'
                }}>
                    THE VERDICT
                </h1>

                <div style={{
                    fontFamily: 'var(--font-typewriter)',
                    fontSize: '1.5rem',
                    color: 'var(--cream)',
                    maxWidth: '600px',
                    background: 'rgba(0,0,0,0.3)',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '1px solid var(--purple-mid)',
                    boxShadow: '0 0 30px rgba(0,0,0,0.2)'
                }}>
                    <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                        <TypewriterText text="WE FIND THE DEFENDANT..." speed={50} />
                    </p>

                    <div style={{
                        fontSize: '3rem',
                        color: 'var(--red-stamp)',
                        fontWeight: 'bold',
                        transform: 'rotate(-5deg)',
                        margin: '2rem 0',
                        opacity: 0,
                        animation: 'fadeIn 0.5s forwards 2.5s' // Show after text
                    }}>
                        GUILTY!
                    </div>

                    <p style={{ opacity: 0, animation: 'fadeIn 1s forwards 3.5s' }}>
                        OF STEALING MY HEART IN THE FIRST DEGREE.
                    </p>

                    <p style={{ marginTop: '20px', opacity: 0, animation: 'fadeIn 1s forwards 5s' }}>
                        SENTENCE: ETERNAL IMPRISONMENT... IN MY ARMS.
                    </p>
                </div>

                <button
                    onClick={() => {
                        playSFX('click');
                        goToPage(8);
                    }}
                    style={{
                        marginTop: '3rem',
                        padding: '1rem 3rem',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-display)',
                        background: 'var(--purple-mid)',
                        color: 'var(--white)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(107, 63, 160, 0.4)',
                        opacity: 0,
                        animation: 'slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 6s',
                        cursor: 'pointer'
                    }}
                >
                    🚨 ACCEPT SENTENCE
                </button>

            </div>
        </PageTransition>
    );
};
