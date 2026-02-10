import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  delay?: number;
}

export const TypewriterText = ({ 
  text, 
  speed = 50, 
  onComplete, 
  className = '', 
  delay = 0 
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isStarted, onComplete]);

  return <p className={className}>{displayedText}</p>;
};
