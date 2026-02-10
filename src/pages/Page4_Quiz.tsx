import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import { TypewriterText } from '../components/TypewriterText';
import { quizData } from '../data/quiz';

export const Page4_Quiz = () => {
    const { goToPage } = useGame();
    const { playSFX } = useAudio();

    const [currentQ, setCurrentQ] = useState(0);
    const [isShaking, setIsShaking] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [showConfession, setShowConfession] = useState(false);

    const question = quizData[currentQ];

    const handleAnswer = (index: number) => {
        if (feedback) return; // Prevent spam

        if (index === question.correctAnswer) {
            // Correct
            playSFX('chime');
            setFeedback(question.successMessage);

            setTimeout(() => {
                if (currentQ < quizData.length - 1) {
                    setFeedback(null);
                    setCurrentQ(curr => curr + 1);
                } else {
                    // Finished
                    finishQuiz();
                }
            }, 2000);
        } else {
            // Wrong
            playSFX('buzz');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
    };

    const finishQuiz = () => {
        playSFX('dramatic');
        setShowConfession(true);
        setTimeout(() => {
            goToPage(5);
        }, 4000);
    };

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
                position: 'relative'
            }}>

                {/* Header */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    width: '100%',
                    textAlign: 'center',
                    color: 'var(--red-stamp)',
                    fontFamily: 'var(--font-typewriter)',
                    fontSize: '1.5rem',
                    letterSpacing: '2px',
                    animation: 'pulse 2s infinite'
                }}>
                    ⚠️ INTERROGATION IN PROGRESS ⚠️
                </div>

                {/* Progress Bar */}
                <div style={{
                    position: 'absolute',
                    top: '70px',
                    width: '60%',
                    height: '4px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px'
                }}>
                    <div style={{
                        width: `${((currentQ) / quizData.length) * 100}%`,
                        height: '100%',
                        background: 'var(--purple-mid)',
                        transition: 'width 0.5s ease'
                    }} />
                </div>

                {/* Question Card */}
                {!showConfession && (
                    <div style={{
                        width: '90%',
                        maxWidth: '600px',
                        background: 'rgba(20, 20, 30, 0.9)',
                        border: '1px solid var(--purple-mid)',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 0 30px rgba(107, 63, 160, 0.2)',
                        animation: isShaking ? 'shake 0.5s' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem'
                    }}>
                        <h3 style={{
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '1.4rem',
                            color: 'var(--white)',
                            minHeight: '3em'
                        }}>
                            <TypewriterText text={question.question} speed={30} key={question.id} />
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {question.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    style={{
                                        padding: '1rem',
                                        textAlign: 'left',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'var(--white)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '1.1rem',
                                        borderRadius: '8px',
                                        transition: 'all 0.2s',
                                        cursor: feedback ? 'default' : 'pointer',
                                        opacity: feedback && i !== question.correctAnswer ? 0.3 : 1
                                    }}
                                    onMouseEnter={e => !feedback && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                                    onMouseLeave={e => !feedback && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                                >
                                    <span style={{ color: 'var(--purple-mid)', marginRight: '10px' }}>
                                        {String.fromCharCode(65 + i)}.
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {feedback && (
                            <div style={{
                                textAlign: 'center',

                                fontFamily: 'var(--font-typewriter)',
                                fontWeight: 'bold',
                                color: '#22cc22',
                                animation: 'fadeIn 0.3s'
                            }}>
                                {feedback}
                            </div>
                        )}
                    </div>
                )}

                {/* Confession Overlay */}
                {showConfession && (
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        zIndex: 20
                    }}>
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '4rem',
                            color: 'var(--red-stamp)',
                            textShadow: '0 0 20px var(--red-stamp)',
                            animation: 'stampSlam 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            CONFESSION OBTAINED
                        </h1>
                        <p style={{
                            marginTop: '1rem',
                            fontFamily: 'var(--font-typewriter)',
                            fontSize: '1.2rem',
                            color: 'var(--white)',
                            opacity: 0.8
                        }}>
                            Proceeding to crime scene analysis...
                        </p>
                    </div>
                )}

            </div>
        </PageTransition>
    );
};
