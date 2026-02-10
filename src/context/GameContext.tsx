import { createContext, useContext, useState, type ReactNode } from 'react';

interface GameState {
    currentPage: number;
    evidenceCollected: Set<string>;
    quizAnswers: Map<number, boolean>;
    cluesFound: Set<string>;
    puzzlePlaced: number;
    hasAnswered: boolean;
    replayCount: number;
}

interface GameContextType extends GameState {
    goToPage: (n: number) => void;
    collectEvidence: (id: string) => void;
    answerQuiz: (qIndex: number, isCorrect: boolean) => void;
    findClue: (id: string) => void;
    placePuzzlePiece: () => void;
    setAnswered: (yes: boolean) => void;
    resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [evidenceCollected, setEvidenceCollected] = useState(new Set<string>());
    const [quizAnswers, setQuizAnswers] = useState(new Map<number, boolean>());
    const [cluesFound, setCluesFound] = useState(new Set<string>());
    const [puzzlePlaced, setPuzzlePlaced] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [replayCount, setReplayCount] = useState(0);

    const goToPage = (n: number) => setCurrentPage(n);

    const collectEvidence = (id: string) => {
        setEvidenceCollected(prev => new Set(prev).add(id));
    };

    const answerQuiz = (qIndex: number, isCorrect: boolean) => {
        setQuizAnswers(prev => new Map(prev).set(qIndex, isCorrect));
    };

    const findClue = (id: string) => {
        setCluesFound(prev => new Set(prev).add(id));
    };

    const placePuzzlePiece = () => {
        setPuzzlePlaced(prev => prev + 1);
    };

    const setAnswered = (yes: boolean) => {
        setHasAnswered(yes);
        if (yes) setReplayCount(prev => prev + 1);
    };

    const resetGame = () => {
        setCurrentPage(0);
        setEvidenceCollected(new Set());
        setQuizAnswers(new Map());
        setCluesFound(new Set());
        setPuzzlePlaced(0);
        setHasAnswered(false);
        // Keep replayCount
    };

    return (
        <GameContext.Provider value={{
            currentPage, evidenceCollected, quizAnswers, cluesFound, puzzlePlaced, hasAnswered, replayCount,
            goToPage, collectEvidence, answerQuiz, findClue, placePuzzlePiece, setAnswered, resetGame
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};
