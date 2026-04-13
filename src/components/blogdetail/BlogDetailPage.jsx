'use client';
import Link from 'next/link';
import './BlogDetailPage.css';

export default function BlogDetailPage() {
  return (
    <div className="blogdetail-page">
      <div className="bd2-outer">

        {/* Back */}
        <Link href="/blog" className="bd2-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back to Blog
        </Link>

        {/* Hero */}
        <div className="bd2-hero">
          <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=90" alt="Tokyo Travel Guide" />
          <div className="bd2-hero-overlay"></div>
          <div className="bd2-hero-content">
            <span className="bd2-badge">🌍 Destinations</span>
            <h1>The Ultimate Tokyo Travel Guide 2026</h1>
          </div>
        </div>

        {/* Author bar */}
        <div className="bd2-author-bar">
          <div className="bd2-author-left">
            <div className="bd2-av">AK</div>
            <div>
              <div className="bd2-author-name">Akira Kimura</div>
              <div className="bd2-author-meta">April 10, 2026 · 8 min read</div>
            </div>
          </div>
          <div className="bd2-share-row">
            <button className="bd2-share-btn" onClick={() => alert('Link copied to clipboard!')}>🔗 Share</button>
            <button className="bd2-share-btn" onClick={() => alert('Saved to reading list!')}>🔖 Save</button>
          </div>
        </div>

        {/* Layout */}
        <div className="bd2-layout">

          {/* Left: TOC */}
          <div className="bd2-left-col">
            <div className="bd2-toc">
              <div className="bd2-toc-head">📋 Contents</div>
              <div className="bd2-toc-body">
                <a className="bd2-toc-item" href="#intro">Introduction</a>
                <a className="bd2-toc-item" href="#best-time">Best Time to Visit</a>
                <a className="bd2-toc-item" href="#getting-around">Getting Around</a>
                <a className="bd2-toc-item" href="#must-see">Must-See Attractions</a>
                <a className="bd2-toc-item" href="#food">Food & Dining</a>
                <a className="bd2-toc-item" href="#budget">Budget Tips</a>
              </div>
            </div>
          </div>

          {/* Centre: Content */}
          <div className="bd2-content-col">
            <div className="bd2-content">
              <h2 id="intro">Introduction</h2>
              <p>Tokyo is a city that defies expectations at every turn. Ancient temples stand in the shadow of futuristic skyscrapers. Quiet zen gardens exist blocks from the busiest intersection on Earth. It is a destination that rewards the curious traveller with discoveries around every corner.</p>
              <p>In this comprehensive guide, we cover everything you need to plan the perfect Tokyo trip — from the best time to visit to budget-saving secrets that locals swear by.</p>

              <h2 id="best-time">Best Time to Visit</h2>
              <p>The ideal windows are March–May (cherry blossom season) and October–November (stunning autumn foliage with comfortable temperatures). Summers can be hot and humid, while winters are mild but crisp. Avoid Golden Week in late April–early May when domestic travel prices spike dramatically.</p>

              <h2 id="getting-around">Getting Around</h2>
              <p>Tokyo's transit system is among the world's best. Purchase a Suica or Pasmo IC card immediately upon arrival — it works on all trains, subways and buses. The JR Pass is excellent value if you plan day trips to Kyoto, Osaka or Hakone. Taxis are safe but expensive; save them for late-night returns.</p>

              <h2 id="must-see">Must-See Attractions</h2>
              <p>Start with the historic Sensoji Temple in Asakusa, then cross to the futuristic teamLab Borderless digital art museum. Visit the Meiji Shrine in Harajuku, watch the Shibuya Scramble Crossing from above, and spend an evening in the neon-drenched lanes of Shinjuku's Golden Gai.</p>

              <h2 id="food">Food & Dining</h2>
              <p>Tokyo has more Michelin stars than Paris and London combined. But some of the best food costs under $10 — try standing sushi bars, basement-level ramen shops, and the incredible food halls in any department store. Don't miss a conveyor belt sushi experience and a traditional kaiseki dinner.</p>

              <h2 id="budget">Budget Tips</h2>
              <p>Convenience stores (7-Eleven, Lawson, FamilyMart) are shockingly good for cheap, quality meals. Stay in capsule hotels for a unique experience under $40/night. Many temples and gardens are free to enter. And the 100-yen shops (Daiso) are perfect for picking up travel essentials.</p>
            </div>

            {/* Related */}
            <div className="bd2-related">
              <div className="bd2-related-head">You Might Also Like</div>
              <div className="bd2-related-grid">
                <Link href="/blog/paris-48-hours" className="arl-card">
                  <div className="arl-card-img">
                    <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" alt="Paris" />
                  </div>
                  <div className="arl-card-body">
                    <div className="arl-card-tag">🌍 Destinations</div>
                    <div className="arl-card-name">Paris in 48 Hours</div>
                  </div>
                </Link>
                <Link href="/blog/bali-hidden-gems" className="arl-card">
                  <div className="arl-card-img">
                    <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" alt="Bali" />
                  </div>
                  <div className="arl-card-body">
                    <div className="arl-card-tag">🌍 Destinations</div>
                    <div className="arl-card-name">Bali Hidden Gems</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="bd2-right-col">
            <div className="bd2-cta-card">
              <h3>Ready to Book Your Trip?</h3>
              <p>Find the best flights, hotels and packages at guaranteed lowest rates.</p>
              <Link href="/" className="bd2-cta-btn">🔍 Search &amp; Book Now</Link>
              <Link href="/deals" className="bd2-cta-btn-ghost">🔥 View Today&apos;s Deals</Link>
              <hr className="bd2-cta-divider" />
              <div className="bd2-cta-contact">
                <span className="bd2-cta-contact-icon">💬</span>
                <div><strong>Live Chat</strong><br /><small>Available 24/7</small></div>
              </div>
              <div className="bd2-cta-contact">
                <span className="bd2-cta-contact-icon">📞</span>
                <div><strong>+1 (888) 000-0000</strong><br /><small>Speak to an expert</small></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
