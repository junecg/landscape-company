'use client';
import { useEffect } from 'react';

/**
 * Smooth scroll — intercepts wheel events and applies lerp-eased scrollTo.
 * Does NOT use fixed+transform, so position:fixed elements (Navbar) work fine.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Mobile: native scroll is fine
    if (window.innerWidth < 768) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let rafId: number;
    let ticking = false;
    const ease = 0.1; // 0.07 = very smooth, 0.12 = snappier

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Accumulate delta — normalize across mouse/trackpad
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target = clamp(target + delta, 0, maxScroll);

      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      const diff = Math.abs(target - current);
      if (diff < 0.3) {
        current = target;
        ticking = false;
        return;
      }
      current = lerp(current, target, ease);
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(tick);
    };

    // Sync target if user scrolls via keyboard/scrollbar
    const onScroll = () => {
      // Only sync if not currently animating from wheel
      if (!ticking) {
        target = window.scrollY;
        current = window.scrollY;
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
