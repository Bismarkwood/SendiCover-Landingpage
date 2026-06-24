import { type ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealSectionProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}

export function RevealSection({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: RevealSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const baseClass = direction === 'up' ? 'reveal-up'
    : direction === 'left' ? 'reveal-left'
    : direction === 'right' ? 'reveal-right'
    : 'reveal-scale';

  const visibleClass = `${baseClass}--visible`;

  return (
    <div
      ref={ref}
      className={`${baseClass} ${isVisible ? visibleClass : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
