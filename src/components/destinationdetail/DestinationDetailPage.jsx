'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import './DestinationDetailPage.css';

/* ── Tokyo content data ── */
const DEST = {
  name: 'Tokyo',
  region: '🇯🇵 Asia · Japan',
  tagline: 'Where Tradition Meets the Future',
  heroImg: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=90',
  stats: [
    { val: '14M+', label: 'Annual Visitors' },
    { val: '13.96M', label: 'Population' },
    { val: '★★★★★', label: 'Safety Rating' },
  ],
  about: [
    "Tokyo is one of the world's most captivating cities — a seamless fusion of ancient temples and neon-lit skyscrapers, Michelin-starred restaurants and tiny ramen stalls, serene gardens and frenetic pop culture. The Japanese capital consistently tops global travel rankings for safety, cuisine, cleanliness and sheer variety.",
    "From the historic streets of Asakusa and the bamboo groves of Arashiyama to the futuristic Shibuya crossing and the tranquil Imperial Palace East Gardens, Tokyo rewards every kind of traveller. With an exceptional metro system and some of the world's most courteous locals, it is also one of the easiest mega-cities to navigate.",
  ],
  highlights: [
    { icon: '🏯', title: 'Sensoji Temple', desc: "Tokyo's oldest temple, dating to 628 AD, in the historic Asakusa district" },
    { icon: '🍜', title: 'Food Capital', desc: 'More Michelin stars than any other city on Earth — 203 and counting' },
    { icon: '🌸', title: 'Cherry Blossoms', desc: 'Ueno Park and Shinjuku Gyoen explode with sakura every late March to April' },
    { icon: '🎮', title: 'Pop Culture Hub', desc: 'Akihabara electronics district and Harajuku fashion scene are unmissable' },
    { icon: '🗼', title: 'Tokyo Tower', desc: 'The 333-metre landmark offers panoramic views over the entire city' },
    { icon: '🛁', title: 'Onsen Retreats', desc: 'Day-trip to Hakone for mountain hot springs with views of Mount Fuji' },
  ],
  tips: [
    '🗓 Best Time: March–May for cherry blossoms; October–November for autumn foliage. Avoid mid-August (scorching heat) and Golden Week (late April–early May) when prices spike.',
    '🚇 Getting Around: The Tokyo Metro and JR Pass make the city extremely easy to navigate. Get a Suica card on arrival at Narita or Haneda.',
    '💴 Budget Tip: Convenience stores (7-Eleven, FamilyMart) serve surprisingly delicious and cheap meals. A great sushi lunch can cost as little as ¥500.',
    '📸 Must-Do: Watch the sunrise from the Shibuya Sky observation deck for a stunning view over the scramble and city skyline.',
  ],
  quickInfo: [
    { lbl: 'Language', val: 'Japanese' },
    { lbl: 'Currency', val: 'JPY (¥)' },
    { lbl: 'Time Zone', val: 'JST (UTC+9)' },
    { lbl: 'Visa', val: '90-day free (US)' },
    { lbl: 'Best Airport', val: 'NRT / HND' },
    { lbl: 'Avg Flight', val: '~14h from NYC' },
  ],
};

const TOC = [
  { id: 'about', num: '1', label: 'About' },
  { id: 'highlights', num: '2', label: 'Top Highlights' },
  { id: 'tips', num: '3', label: 'Traveller Tips' },
];

export default function DestinationDetailPage() {
  const [activeToc, setActiveToc] = useState('about');
  const sectionRefs = useRef({});

  function scrollToSection(id) {
    setActiveToc(id);
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="destinationdetail-page">
      <div className="dst-wrap">

        {/* ── Hero ── */}
        <div className="dst-hero">
          <img src={DEST.heroImg} alt={DEST.name} />
          <div className="dst-hero-overlay"></div>
          <div className="dst-hero-content">
            <Link href="/destinations" className="dst-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Back to Destinations
            </Link>
            <div className="dst-hero-badge">{DEST.region}</div>
            <h1>{DEST.name}</h1>
            <div className="dst-hero-sub">{DEST.tagline}</div>
          </div>
        </div>

        {/* ── 3-Column Layout ── */}
        <div className="dst-inner">

          {/* LEFT — Table of Contents */}
          <div className="dst-toc-col">
            <div className="dst-toc">
              <div className="dst-toc-head">📋 Contents</div>
              {TOC.map((item) => (
                <button
                  key={item.id}
                  className={`dst-toc-item ${activeToc === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="dst-toc-num">{item.num}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* CENTRE — Main Content */}
          <div className="dst-main-content">

            {/* About Section */}
            <div
              className="dst-section"
              ref={(el) => { sectionRefs.current.about = el; }}
            >
              <div className="dst-section-title">About {DEST.name}</div>
              <div className="dst-stats">
                {DEST.stats.map((s, i) => (
                  <div key={i} className="dst-stat">
                    <div className="dst-stat-val">{s.val}</div>
                    <div className="dst-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
              {DEST.about.map((p, i) => (
                <p key={i} className="dst-about-text">{p}</p>
              ))}
            </div>

            {/* Highlights Section */}
            <div
              className="dst-section"
              ref={(el) => { sectionRefs.current.highlights = el; }}
            >
              <div className="dst-section-title">Top Highlights</div>
              <div className="dst-highlights">
                {DEST.highlights.map((h, i) => (
                  <div key={i} className="dst-highlight">
                    <div className="dst-highlight-icon">{h.icon}</div>
                    <div>
                      <div className="dst-highlight-title">{h.title}</div>
                      <div className="dst-highlight-desc">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Section */}
            <div
              className="dst-section"
              ref={(el) => { sectionRefs.current.tips = el; }}
            >
              <div className="dst-section-title">Traveller Tips</div>
              <div className="dst-tips">
                {DEST.tips.map((tip, i) => (
                  <div key={i} className="dst-tip">{tip}</div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT — Sidebar */}
          <div className="dst-sidebar">

            {/* Booking Card */}
            <div className="dst-book-card">
              <div className="dst-book-title">Fly to {DEST.name}</div>
              <div className="dst-book-sub">Search the best fares to {DEST.name}, Japan</div>
              <Link href="/flights" className="dst-book-btn">✈ Search Flights</Link>
              <Link href="/hotels" className="dst-book-btn-ghost">🏨 Find Hotels</Link>
            </div>

            {/* Quick Info Card */}
            <div className="dst-info-card">
              <div className="dst-info-head">Quick Info</div>
              {DEST.quickInfo.map((row, i) => (
                <div key={i} className="dst-info-row">
                  <div className="dst-info-lbl">{row.lbl}</div>
                  <div className="dst-info-val">{row.val}</div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
