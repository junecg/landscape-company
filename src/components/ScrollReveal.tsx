'use client';
import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number; // 0–5
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'fade';
  duration?: number; // ms
}

/**
 * Leafix-style scroll reveal — replaces WOW.js / AOS.
 * Wraps children in a div that fades+slides in when it enters the viewport.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  duration = 700,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left':  return 'translateX(-40px)';
      case 'right': return 'translateX(40px)';
      case 'fade':  return 'none';
      default:      return 'translateY(36px)';
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    // Set initial state
    el.style.opacity = '0';
    el.style.transform = getInitialTransform();
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay * 100}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay * 100}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, direction, duration]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
}
