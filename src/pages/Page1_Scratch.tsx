import { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';
import { TypewriterText } from '../components/TypewriterText';

export const Page1_Scratch = () => {
    const { goToPage } = useGame();
    const { playMusic, playSFX } = useAudio();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const isDrawing = useRef(false);

    // Initialize Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match container
        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            // Fill with silver scratch texture
            ctx.fillStyle = '#c0c0c0'; // Silver fallback
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add some noise/texture to look like foil
            for (let i = 0; i < 5000; i++) {
                ctx.fillStyle = Math.random() > 0.5 ? '#b0b0b0' : '#d0d0d0';
                ctx.fillRect(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    2, 2
                );
            }

            // Add "SCRATCH HERE" text
            ctx.font = 'bold 24px Courier New';
            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.fillText('SCRATCH TO REVEAL', canvas.width / 2, canvas.height / 2);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    // Check progress
    const checkProgress = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Sample pixels to save performance (every 10th pixel)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
        let transparentPixels = 0;
        const totalPixels = pixelData.length / 4;
        const sampleRate = 10;

        for (let i = 0; i < totalPixels; i += sampleRate) {
            if (pixelData[i * 4 + 3] < 128) { // Alpha < 128 considered transparent
                transparentPixels++;
            }
        }

        const progress = (transparentPixels * sampleRate) / totalPixels;

        if (progress > 0.5 && !isRevealed) {
            finishScratch();
        }
    };

    const finishScratch = () => {
        setIsRevealed(true);
        playMusic(); // Start bgm
        playSFX('chime');

        // Fade out canvas completely
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.transition = 'opacity 1s ease-out';
            canvas.style.opacity = '0';
            setTimeout(() => {
                canvas.style.display = 'none';
            }, 1000);
        }
    };

    // Drawing handlers
    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        isDrawing.current = true;
        draw(e);
    };

    const stopDrawing = () => {
        isDrawing.current = false;
        if (!isRevealed) checkProgress();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing.current || isRevealed) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = (e as React.MouseEvent).clientX - rect.left;
            y = (e as React.MouseEvent).clientY - rect.top;
        }

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2); // Brush size
        ctx.fill();

        // Play scratch sound periodically (throttled)
        if (Math.random() > 0.8) {
            playSFX('scratch');
        }
    };

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
                overflow: 'hidden'
            }}>

                {/* Content Underneath */}
                <div style={{
                    position: 'absolute',
                    textAlign: 'center',
                    maxWidth: '80%',
                    opacity: isRevealed ? 1 : 0.2, // Subtle hint before reveal
                    transition: 'opacity 0.5s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-typewriter)',
                        fontSize: '1.5rem',
                        color: 'var(--purple-soft)',
                        borderBottom: '2px solid var(--purple-mid)',
                        paddingBottom: '0.5rem'
                    }}>
                        CASE FILE #0214 / OPENED
                    </h2>

                    {isRevealed && (
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            <TypewriterText
                                text="DETECTIVE: Disha"
                                speed={30}
                            />
                            <div style={{ height: '1rem' }} />
                            <TypewriterText
                                text="STATUS: Active Investigation"
                                speed={30}
                                delay={1000}
                            />
                            <div style={{ height: '1rem' }} />
                            <TypewriterText
                                text="MISSION: Locate the missing Valentine."
                                speed={30}
                                delay={2500}
                            />
                        </div>
                    )}

                    {isRevealed && (
                        <button
                            onClick={() => goToPage(2)}
                            style={{
                                marginTop: '1rem',
                                padding: '1rem 2rem',
                                fontSize: '1.2rem',
                                fontFamily: 'var(--font-display)',
                                background: 'var(--purple-mid)',
                                color: 'var(--white)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 15px rgba(107, 63, 160, 0.4)',
                                animation: 'slideUp 0.6s ease-out backwards',
                                animationDelay: '4s' // Wait for drawing to finish
                            }}
                        >
                            🔎 START INVESTIGATION
                        </button>
                    )}
                </div>

                {/* Scratch Overlay */}
                <div
                    ref={containerRef}
                    style={{
                        position: 'absolute',
                        width: '350px',
                        height: '250px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        cursor: 'url("coin.png"), auto', // Optional: if we had a coin cursor
                        zIndex: 10
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        style={{ width: '100%', height: '100%', touchAction: 'none' }}
                    />
                </div>

                {!isRevealed && (
                    <p style={{
                        position: 'absolute',
                        bottom: '20%',
                        opacity: 0.6,
                        fontSize: '0.9rem',
                        animation: 'pulse 2s infinite'
                    }}>
                        Use your mouse/finger to scratch the card
                    </p>
                )}

            </div>
        </PageTransition>
    );
};
