import type { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            animation: 'fadeIn var(--transition-page)'
        }}>
            {children}
        </div>
    );
};
