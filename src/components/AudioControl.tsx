import { useAudio } from '../hooks/useAudio';

export const AudioControl = () => {
    const { isMuted, toggleMute } = useAudio();

    return (
        <button
            onClick={toggleMute}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: 'rgba(0,0,0,0.5)',
                color: 'var(--white)',
                border: '1px solid var(--purple-light)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1000,
                fontSize: '1.2rem',
                backdropFilter: 'blur(4px)'
            }}
            aria-label={isMuted ? "Unmute" : "Mute"}
        >
            {isMuted ? "🔇" : "🔊"}
        </button>
    );
};
