'use client';
import { useEffect } from 'react';

export default function FadeUpObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), i * 60);
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
