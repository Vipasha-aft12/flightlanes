'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Mounts once and attaches an IntersectionObserver to every .fade-up element,
 * adding the .visible class when each enters the viewport.
 * Exactly replicates the original HTML scroll animation behaviour.
 *
 * NOTE: Depends on `pathname` so the observer re-scans the DOM after every
 * client-side route change. Without this, new .fade-up elements mounted by a
 * freshly navigated page (e.g. /hotels) stay at opacity:0 forever because
 * the layout — and therefore this effect — never re-runs on navigation.
 */
export default function FadeUpObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Safety bail-out for SSR / environments without IntersectionObserver.
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    // Only pick up elements that haven't already been revealed.
    const targets = Array.from(document.querySelectorAll('.fade-up:not(.visible)'));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger each element by 60 ms — exact match to original JS
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null; // renders nothing — side-effect only
}
