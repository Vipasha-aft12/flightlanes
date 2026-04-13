'use client';
import { useEffect } from 'react';

/**
 * Mounts once and attaches an IntersectionObserver to every .fade-up element,
 * adding the .visible class when each enters the viewport.
 * Exactly replicates the original HTML scroll animation behaviour.
 */
export default function FadeUpObserver() {
  useEffect(() => {
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

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null; // renders nothing — side-effect only
}
