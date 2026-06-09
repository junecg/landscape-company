'use client';
import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let rafId: number;
    let ticking = false;

    // exponential ease-out — same feel as Lenis default
    const ease = (t: number) => 1 - Math.pow(2, -10 * t);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target = clamp(target + delta, 0, maxScroll);
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    let progress = 0;
    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.3) {
        current = target;
        progress = 0;
        ticking = false;
        return;
      }
      progress = Math.min(progress + 0.012, 1);          // advance ~1.2s
      const t = ease(progress);
      current = lerp(current, target, Math.min(t * 0.18 + 0.04, 1));
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!ticking) {
        target = window.scrollY;
        current = window.scrollY;
        progress = 0;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
