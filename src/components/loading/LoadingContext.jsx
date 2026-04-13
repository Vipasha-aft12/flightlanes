'use client';
import { createContext, useContext, useState, useCallback } from 'react';

/* ─── Loading Context ─────────────────────────────────────────────
   Usage:
     const { showLoading } = useLoading();
     showLoading('flight-search', () => router.push('/flights/results?...'));
   ───────────────────────────────────────────────────────────────── */

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [loadingType, setLoadingType] = useState(null);   // e.g. 'flight-search'
  const [callback, setCallback] = useState(null);          // function to run after loading

  // Show loading overlay, then run callback after duration
  const showLoading = useCallback((type, cb) => {
    setLoadingType(type);
    // Store callback as a function-returning-function so React doesn't call it
    setCallback(() => cb);
  }, []);

  // Called by LoadingOverlay when animation finishes
  const hideLoading = useCallback(() => {
    setLoadingType(null);
    setCallback(null);
  }, []);

  return (
    <LoadingContext.Provider value={{ loadingType, callback, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider');
  return ctx;
}
