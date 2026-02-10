import { useState } from 'react';
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from '@dnd-kit/core';
import { useGame } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import { PageTransition } from '../components/PageTransition';

// Puzzle Piece Component
const PuzzlePiece = ({ id, isPlaced }: { id: string, isPlaced: boolean }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        disabled: isPlaced
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: isPlaced ? 1 : 10,
        cursor: isPlaced ? 'default' : 'grab',
        touchAction: 'none' // Required for dnd-kit on mobile
    };

    // CSS Shape for Heart Piece based on ID
    const getPieceStyle = () => {
        const base = {
            width: '100px',
            height: '100px',
            background: 'var(--purple-mid)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            // We'll use clip-path to make them look like puzzle pieces or quadrants
        };

        switch (id) {
            case 'tl': return { ...base, borderRadius: '50% 0 0 0', background: '#ff4d4d' };
            case 'tr': return { ...base, borderRadius: '0 50% 0 0', background: '#ff1a1a' };
            case 'bl': return { ...base, borderRadius: '0 0 0 50%', background: '#ff6666' };
            case 'br': return { ...base, borderRadius: '0 0 50% 0', background: '#cc0000' };
            default: return base;
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div style={getPieceStyle()} />
        </div>
    );
};

// Drop Zone Component
const DropZone = ({ id, isFilled, children }: { id: string, isFilled: boolean, children?: React.ReactNode }) => {
    const { setNodeRef } = useDroppable({
        id: id
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                width: '102px',
                height: '102px',
                border: isFilled ? 'none' : '2px dashed rgba(255,255,255,0.3)',
                borderRadius: id === 'target-tl' ? '50% 0 0 0' :
                    id === 'target-tr' ? '0 50% 0 0' :
                        id === 'target-bl' ? '0 0 0 50%' : '0 0 50% 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isFilled ? 'transparent' : 'rgba(255,255,255,0.05)'
            }}
        >
            {children}
        </div>
    );
};

export const Page6_Puzzle = () => {
    const { goToPage } = useGame();
    const { playSFX } = useAudio();

    const [placedPieces, setPlacedPieces] = useState<Record<string, boolean>>({
        tl: false, tr: false, bl: false, br: false
    });

    const isComplete = Object.values(placedPieces).every(v => v);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && over.id === `target-${active.id}`) {
            // Correct drop
            playSFX('snap');
            setPlacedPieces(prev => ({ ...prev, [active.id]: true }));

            // Check completion in state update logic or effect
        } else {
            // Wrong drop
            // playSFX('click'); // Optional feedback
        }
    };

    if (isComplete) {
        // Auto advance
        setTimeout(() => {
            playSFX('heartbeat'); // Start heartbeat loop (simulated by game context or audio effect)
            setTimeout(() => goToPage(7), 3000);
        }, 500);
    }

    return (
        <PageTransition>
            <DndContext onDragEnd={handleDragEnd}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'var(--purple-deep)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3rem'
                }}>

                    <h2 style={{ fontFamily: 'var(--font-typewriter)', color: 'var(--purple-light)' }}>
                        RESTORE THE HEART
                    </h2>

                    {/* Puzzle Board (Center) */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '100px 100px',
                        gap: '2px',
                        animation: isComplete ? 'pulse 1s infinite' : 'none'
                    }}>
                        <DropZone id="target-tl" isFilled={placedPieces.tl}>
                            {placedPieces.tl && <PuzzlePiece id="tl" isPlaced={true} />}
                        </DropZone>
                        <DropZone id="target-tr" isFilled={placedPieces.tr}>
                            {placedPieces.tr && <PuzzlePiece id="tr" isPlaced={true} />}
                        </DropZone>
                        <DropZone id="target-bl" isFilled={placedPieces.bl}>
                            {placedPieces.bl && <PuzzlePiece id="bl" isPlaced={true} />}
                        </DropZone>
                        <DropZone id="target-br" isFilled={placedPieces.br}>
                            {placedPieces.br && <PuzzlePiece id="br" isPlaced={true} />}
                        </DropZone>
                    </div>

                    {/* Scatter Area (Bottom) */}
                    <div style={{
                        height: '150px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        alignItems: 'center'
                    }}>
                        {!placedPieces.tl && <PuzzlePiece id="tl" isPlaced={false} />}
                        {!placedPieces.tr && <PuzzlePiece id="tr" isPlaced={false} />}
                        {!placedPieces.bl && <PuzzlePiece id="bl" isPlaced={false} />}
                        {!placedPieces.br && <PuzzlePiece id="br" isPlaced={false} />}
                    </div>

                    {isComplete && (
                        <div style={{
                            position: 'absolute',
                            top: '20%',
                            color: '#ff4d4d',
                            fontFamily: 'var(--font-display)',
                            fontSize: '2rem',
                            textShadow: '0 0 10px red',
                            animation: 'fadeIn 1s'
                        }}>
                            HEART RESTORED
                        </div>
                    )}

                </div>
            </DndContext>
        </PageTransition>
    );
};
