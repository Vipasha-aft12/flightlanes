'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './ActivityResultsPage.css';

export default function ActivityResultsPage() {

  useEffect(() => {
    /* Scroll fade-up animation */
    const items = document.querySelectorAll('.fade-up');
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* FAQ accordion toggle */
  function handleFaqClick(e) {
    const item = e.currentTarget.closest('.faq-item');
    if (item) item.classList.toggle('open');
  }

  return (
    <div className="activityresults-page">
<div className="rl-summary-bar">
    <div className="rl-summary-inner">
      <div className="rl-search-pill"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg><span id="arr-dest-display">Paris, France</span></div>
      <div className="rl-search-pill">🎯 Tours & Activities</div>
      <div className="rl-result-count"><span className="rl-result-dot"></span><span id="arr-result-count">🎯 84 activities found</span></div>
      <button className="rl-modify-btn">✏ Modify Search</button>
    </div>
  </div>

  <div className="rl-layout">
    <aside className="rl-filters">
      <div className="rl-filter-header"><h3>🎛 Filters</h3><button className="rl-filter-clear">Clear all</button></div>
      <div className="rl-filter-body">
        <div className="rl-filter-group"><h4>💰 Price per Person</h4><div className="rl-price-range"><div className="rl-price-values"><span>$0</span><span id="arr-price-val">$500</span></div><input type="range" className="rl-slider" min="0" max="1000" value="500" /></div></div>
        <div className="rl-filter-group"><h4>🎭 Category</h4>
          <label className="rl-check"><input type="checkbox" checked={true} /> Tours & Sightseeing<span className="rl-check-count">28</span></label>
          <label className="rl-check"><input type="checkbox" checked={true} /> Food & Drink<span className="rl-check-count">18</span></label>
          <label className="rl-check"><input type="checkbox" checked={true} /> Culture & Art<span className="rl-check-count">15</span></label>
          <label className="rl-check"><input type="checkbox" /> Adventure & Sports<span className="rl-check-count">9</span></label>
          <label className="rl-check"><input type="checkbox" /> Day Trips<span className="rl-check-count">14</span></label>
        </div>
        <div className="rl-filter-group"><h4>⏱ Duration</h4>
          <label className="rl-check"><input type="checkbox" checked={true} /> Under 3 hours</label>
          <label className="rl-check"><input type="checkbox" checked={true} /> 3–6 hours</label>
          <label className="rl-check"><input type="checkbox" /> Full Day</label>
          <label className="rl-check"><input type="checkbox" /> Multi-Day</label>
        </div>
        <div className="rl-filter-group"><h4>🎟 Features</h4>
          <label className="rl-check"><input type="checkbox" checked={true} /> Skip the Line</label>
          <label className="rl-check"><input type="checkbox" /> Private Tour</label>
          <label className="rl-check"><input type="checkbox" /> Small Group (&lt;12)</label>
          <label className="rl-check"><input type="checkbox" /> Instant Confirmation</label>
          <label className="rl-check"><input type="checkbox" /> Free Cancellation</label>
        </div>
        <div className="rl-filter-group"><h4>🌐 Language</h4>
          <label className="rl-check"><input type="checkbox" checked={true} /> English</label>
          <label className="rl-check"><input type="checkbox" /> Spanish</label>
          <label className="rl-check"><input type="checkbox" /> French</label>
        </div>
        <div className="rl-filter-group"><h4>⭐ Rating</h4>
          <label className="rl-check"><input type="checkbox" checked={true} /> 4.5+ Stars<span className="rl-check-count">41</span></label>
          <label className="rl-check"><input type="checkbox" checked={true} /> 4.0+ Stars<span className="rl-check-count">33</span></label>
          <label className="rl-check"><input type="checkbox" /> Any Rating<span className="rl-check-count">84</span></label>
        </div>
      </div>
    </aside>

    <div className="rl-results">
      <div className="rl-sort-bar">
        <span className="rl-sort-label">Sort:</span>
        <button className="rl-sort-btn active">⭐ Best Rated</button>
        <button className="rl-sort-btn">💰 Lowest Price</button>
        <button className="rl-sort-btn">🔥 Most Popular</button>
        <button className="rl-sort-btn">⏱ Duration</button>
        <span className="rl-showing">Showing 6 of 84 activities</span>
      </div>

      {/* ACTIVITY 1 */}
      <div className="act-card is-act-2cfdd3">
        <div className="is-act-18ac00">⭐ Most Booked — Paris's #1 rated experience</div>
        <div className="act-img"><img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=85" alt="Eiffel Tower" loading="eager" /><div className="act-cat-badge">🗼 Landmark</div></div>
        <div className="act-body">
          <div className="act-name">Eiffel Tower Skip-the-Line Summit Access + Seine River Cruise</div>
          <div className="act-meta"><span>⏱ 4 hours</span><span>👥 Small Group ≤12</span><span>🌐 English / French</span></div>
          <div className="act-tags"><span className="act-tag is-act-a6d906">⚡ Skip the Line</span><span className="act-tag">🎧 Audio Guide</span><span className="act-tag">✅ Instant Confirm</span><span className="act-tag">🚣 River Cruise Included</span></div>
          <div className="act-rating"><div className="act-score">4.9</div><div className="is-act-8f6c39"><strong>Exceptional</strong> · 18,421 reviews<br />"Absolutely worth it — no queue and stunning views!"</div></div>
        </div>
        <div className="act-price-col">
          <div className="is-act-6f0bca">from</div>
          <div className="act-price">$68</div>
          <div className="is-act-5bc72c">per person</div>
          <span className="ht-free-cancel is-act-4b8345">✅ Free Cancel</span>
          <button className="act-book-btn">Book Now →</button>
        </div>
      </div>

      {/* ACTIVITY 2 */}
      <div className="act-card">
        <div className="act-img"><img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=85" alt="Louvre" loading="eager" /><div className="act-cat-badge">🎨 Museum</div></div>
        <div className="act-body">
          <div className="act-name">Louvre Museum Private Guided Tour — Mona Lisa & Masterpieces</div>
          <div className="act-meta"><span>⏱ 3 hours</span><span>👥 Private</span><span>🌐 English</span></div>
          <div className="act-tags"><span className="act-tag is-act-a6d906">⚡ Skip the Line</span><span className="act-tag">🏛 Expert Guide</span><span className="act-tag">✅ Instant Confirm</span></div>
          <div className="act-rating"><div className="act-score">4.8</div><div className="is-act-8f6c39"><strong>Exceptional</strong> · 9,214 reviews<br />"Our guide's knowledge was extraordinary."</div></div>
        </div>
        <div className="act-price-col">
          <div className="is-act-6f0bca">from</div>
          <div className="act-price">$89</div>
          <div className="is-act-5bc72c">per person</div>
          <span className="ht-free-cancel is-act-4b8345">✅ Free Cancel</span>
          <button className="act-book-btn">Book Now →</button>
        </div>
      </div>

      {/* ACTIVITY 3 */}
      <div className="act-card">
        <div className="act-img"><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=85" alt="Food Tour" loading="eager" /><div className="act-cat-badge">🍷 Food & Wine</div></div>
        <div className="act-body">
          <div className="act-name">Paris Food & Wine Tour — Le Marais Market + Cheese & Wine Tasting</div>
          <div className="act-meta"><span>⏱ 3.5 hours</span><span>👥 Small Group ≤10</span><span>🌐 English</span></div>
          <div className="act-tags"><span className="act-tag">🧀 6 Tastings</span><span className="act-tag">🍷 Wine Pairing</span><span className="act-tag">✅ Instant Confirm</span><span className="act-tag">🗺 Local Guide</span></div>
          <div className="act-rating"><div className="act-score">4.9</div><div className="is-act-8f6c39"><strong>Exceptional</strong> · 5,882 reviews<br />"The best 3 hours I spent in Paris. Magnifique!"</div></div>
        </div>
        <div className="act-price-col">
          <div className="is-act-6f0bca">from</div>
          <div className="act-price">$79</div>
          <div className="is-act-5bc72c">per person</div>
          <span className="ht-free-cancel is-act-4b8345">✅ Free Cancel</span>
          <button className="act-book-btn">Book Now →</button>
        </div>
      </div>

      {/* ACTIVITY 4 */}
      <div className="act-card">
        <div className="act-img"><img src="https://images.unsplash.com/photo-1520986606214-8b456906c813?w=500&q=85" alt="Bike Tour" loading="eager" /><div className="act-cat-badge">🚴 Bike Tour</div></div>
        <div className="act-body">
          <div className="act-name">Paris Bike & Baguette Morning Tour — Seine, Notre-Dame & Montmartre</div>
          <div className="act-meta"><span>⏱ 4 hours</span><span>👥 Small Group ≤14</span><span>🌐 English / Spanish</span></div>
          <div className="act-tags"><span className="act-tag">🚲 E-Bike Option</span><span className="act-tag">🥐 Breakfast Stop</span><span className="act-tag">📸 Photo Stops</span></div>
          <div className="act-rating"><div className="act-score">4.7</div><div className="is-act-8f6c39"><strong>Excellent</strong> · 7,103 reviews<br />"Best way to see Paris on a beautiful morning."</div></div>
        </div>
        <div className="act-price-col">
          <div className="is-act-6f0bca">from</div>
          <div className="act-price">$49</div>
          <div className="is-act-5bc72c">per person</div>
          <span className="ht-free-cancel is-act-4b8345">✅ Free Cancel</span>
          <button className="act-book-btn">Book Now →</button>
        </div>
      </div>

      {/* ACTIVITY 5 */}
      <div className="act-card">
        <div className="act-img"><img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=85" alt="Versailles" loading="eager" /><div className="act-cat-badge">🏰 Day Trip</div></div>
        <div className="act-body">
          <div className="act-name">Versailles Palace & Gardens Full-Day Tour from Paris — Skip the Line</div>
          <div className="act-meta"><span>⏱ 8 hours</span><span>👥 Small Group ≤15</span><span>🌐 English</span></div>
          <div className="act-tags"><span className="act-tag is-act-a6d906">⚡ Skip the Line</span><span className="act-tag">🚌 Transport Incl.</span><span className="act-tag">🎧 Audio Guide</span><span className="act-tag">🌸 Garden Access</span></div>
          <div className="act-rating"><div className="act-score">4.8</div><div className="is-act-8f6c39"><strong>Exceptional</strong> · 11,440 reviews<br />"The Hall of Mirrors is absolutely stunning."</div></div>
        </div>
        <div className="act-price-col">
          <div className="is-act-6f0bca">from</div>
          <div className="act-price">$94</div>
          <div className="is-act-5bc72c">per person</div>
          <span className="ht-free-cancel is-act-4b8345">✅ Free Cancel</span>
          <button className="act-book-btn">Book Now →</button>
        </div>
      </div>

      {/* ACTIVITY 6 */}
      <div className="act-card">
        <div className="act-img"><img src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&q=85" alt="Cooking Class" loading="eager" /><div className="act-cat-badge">👨‍🍳 Cooking</div></div>
        <div className="act-body">
          <div className="act-name">French Cooking Class in Paris — Croissants, Macarons & Crêpes</div>
          <div className="act-meta"><span>⏱ 3 hours</span><span>👥 Small Group ≤12</span><span>🌐 English / French</span></div>
          <div className="act-tags"><span className="act-tag">👨‍🍳 Expert Chef</span><span className="act-tag">🥐 Eat What You Make</span><span className="act-tag">📜 Recipe Book</span></div>
          <div className="act-rating"><div className="act-score">4.9</div><div className="is-act-8f6c39"><strong>Exceptional</strong> · 4,218 reviews<br />"Now I can make perfect croissants at home!"</div></div>
        </div>
        <div className="act-price-col">
          <div className="is-act-6f0bca">from</div>
          <div className="act-price">$112</div>
          <div className="is-act-5bc72c">per person</div>
          <span className="ht-free-cancel is-act-4b8345">✅ Free Cancel</span>
          <button className="act-book-btn">Book Now →</button>
        </div>
      </div>

      <div id="activity-more-container"></div>
      <div id="activity-load-wrap" className="is-act-81b95c">
        <button id="activity-load-btn" className="btn-ghost is-act-c27b6e">Load More Activities <span id="activity-remaining">(78 remaining)</span> →</button>
      </div>
    </div>
  </div>
</div>
  );
}
