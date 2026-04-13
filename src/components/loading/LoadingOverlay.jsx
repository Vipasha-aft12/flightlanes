'use client';
import { useEffect, useRef, useState } from 'react';
import { useLoading } from './LoadingContext';
import loadingConfig from './loadingConfig';
import './LoadingOverlay.css';

/* ─── LoadingOverlay ──────────────────────────────────────────────
   Renders a full-screen overlay with:
   - Dual-ring spinner with emoji icon
   - Title + subtitle
   - 3-step animated checklist
   - Progress bar + percentage
   - Travel tip
   Automatically hides and calls callback when duration ends.
   ───────────────────────────────────────────────────────────────── */

export default function LoadingOverlay() {
  const { loadingType, callback, hideLoading } = useLoading();
  const barRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [stepStates, setStepStates] = useState(['active', '', '']); // 'active' | 'done' | ''
  const timersRef = useRef([]);

  // Get config for current loading type (fallback if unknown type)
  const cfg = loadingConfig[loadingType] || {
    icon: '✈', title: 'Loading', sub: 'Please wait…', tip: '', dur: 1800,
    steps: ['Connecting…', 'Loading data…', 'Almost ready…'],
  };

  useEffect(() => {
    if (!loadingType) return;

    // Reset everything
    setPercent(0);
    setStepStates(['active', '', '']);
    if (barRef.current) {
      barRef.current.style.transition = 'none';
      barRef.current.style.width = '0%';
    }

    // Clear any previous timers
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];

    const dur = cfg.dur;
    const phase = dur / 3;

    // Start progress bar animation after a tiny delay (for CSS reset)
    const startTimer = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.transition = `width ${dur}ms cubic-bezier(.4,0,.2,1)`;
        barRef.current.style.width = '100%';
      }
    }, 30);
    timersRef.current.push(startTimer);

    // Percent counter
    let pct = 0;
    const pctStep = 100 / (dur / 40);
    const pctInterval = setInterval(() => {
      pct = Math.min(100, pct + pctStep);
      setPercent(Math.floor(pct));
      if (pct >= 100) clearInterval(pctInterval);
    }, 40);

    // Step 1 → done, Step 2 → active at 33%
    const t1 = setTimeout(() => {
      setStepStates(['done', 'active', '']);
    }, phase);
    timersRef.current.push(t1);

    // Step 2 → done, Step 3 → active at 66%
    const t2 = setTimeout(() => {
      setStepStates(['done', 'done', 'active']);
    }, phase * 2);
    timersRef.current.push(t2);

    // Complete — all done, then hide and fire callback
    const t3 = setTimeout(() => {
      setStepStates(['done', 'done', 'done']);
      setPercent(100);
      clearInterval(pctInterval);

      // Small delay before hiding overlay and firing callback
      const t4 = setTimeout(() => {
        hideLoading();
        if (callback) callback();
      }, 150);
      timersRef.current.push(t4);
    }, dur);
    timersRef.current.push(t3);

    // Cleanup on unmount or type change
    return () => {
      clearInterval(pctInterval);
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
    };
  }, [loadingType]); // eslint-disable-line react-hooks/exhaustive-deps

  // Step class helper
  const stepClass = (state) => {
    if (state === 'active') return 'flo-step flo-active';
    if (state === 'done') return 'flo-step flo-done';
    return 'flo-step';
  };

  return (
    <div className={`flo-overlay${loadingType ? ' active' : ''}`}>
      <div className="flo-card">

        {/* Dual-ring spinner */}
        <div className="flo-spinner-wrap">
          <svg className="flo-spinner-svg" viewBox="0 0 80 80">
            <circle className="flo-spin-track" cx="40" cy="40" r="34" />
            <circle className="flo-spin-teal" cx="40" cy="40" r="34" />
            <circle className="flo-spin-orange" cx="40" cy="40" r="34" />
          </svg>
          <div className="flo-spin-icon">{cfg.icon}</div>
        </div>

        {/* Title & subtitle */}
        <div className="flo-title">{cfg.title}</div>
        <div className="flo-sub">{cfg.sub}</div>

        {/* 3-step checklist */}
        <div className="flo-steps">
          {cfg.steps.map((label, i) => (
            <div key={i} className={stepClass(stepStates[i])}>
              <div className="flo-step-num">
                {stepStates[i] === 'done' ? '✓' : i + 1}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flo-bar-track">
          <div className="flo-bar" ref={barRef}></div>
        </div>

        {/* Percent + tip */}
        <div className="flo-bottom-row">
          <div className="flo-percent">{percent}%</div>
          <div className="flo-tip">{cfg.tip}</div>
        </div>

      </div>
    </div>
  );
}
