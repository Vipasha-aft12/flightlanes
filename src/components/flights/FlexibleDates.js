'use client';
import { useState } from 'react';
import { flexibleDates } from '@/lib/flightUtils';

export default function FlexibleDates() {
  const [selected, setSelected] = useState('Jun 15');

  return (
    <div style={{ background: 'white', borderBottom: '2px solid var(--g100)', padding: '18px 24px', borderTop: '1px solid var(--g100)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg,var(--teal),var(--tl))', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, boxShadow: '0 3px 10px rgba(0,109,119,.22)' }}>📅</div>
            <div>
              <div style={{ fontSize: '.92rem', fontWeight: 800, color: 'var(--g800)', lineHeight: 1.2 }}>Flexible Date Prices</div>
              <div style={{ fontSize: '.75rem', color: 'var(--g600)', marginTop: '2px' }}>Lowest fare per person · Click any date to switch</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { label: 'Cheap', color: '#065f46', bg: '#ecfdf5', border: '#a7f3d0', dot: '#10b981' },
              { label: 'Mid', color: '#92400e', bg: '#fffbeb', border: '#fcd34d', dot: '#f59e0b' },
              { label: 'High', color: 'var(--g600)', bg: 'var(--g50)', border: 'var(--g200)', dot: 'var(--g400)' },
              { label: 'Selected', color: 'white', bg: 'var(--teal)', border: 'var(--teal)', dot: 'rgba(255,255,255,.7)' },
            ].map((l) => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '.75rem', fontWeight: 700, color: l.color, background: l.bg, border: `1.5px solid ${l.border}`, padding: '4px 11px', borderRadius: '100px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.dot, display: 'inline-block' }}></span>{l.label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto', scrollbarWidth: 'thin', paddingBottom: '4px' }}>
          <div style={{ display: 'flex', gap: '7px', minWidth: 'max-content', paddingBottom: '2px' }}>
            {flexibleDates.map((d) => {
              const isSelected = d.date === selected;
              const cls = isSelected ? 'fdv2 fdv2-active' : `fdv2 fdv2-${d.level}`;
              return (
                <div className={cls} key={d.date} onClick={() => setSelected(d.date)} style={{ position: 'relative' }}>
                  {d.lowest && isSelected && (
                    <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'white', fontSize: '.58rem', fontWeight: 800, padding: '2px 8px', borderRadius: '100px', whiteSpace: 'nowrap', boxShadow: '0 2px 6px rgba(0,0,0,.15)' }}>★ LOWEST</div>
                  )}
                  <div className="fdv2-dow">{d.dow}</div>
                  <div className="fdv2-date">{d.date}</div>
                  <div className="fdv2-bar-outer"><div className="fdv2-bar" style={{ height: d.height }}></div></div>
                  <div className="fdv2-price" style={d.lowest && isSelected ? { fontSize: '1rem', fontWeight: 900 } : {}}>${d.price}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
