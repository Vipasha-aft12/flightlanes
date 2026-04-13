'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './BlogPage.css';

export default function BlogPage() {

  useEffect(() => {
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

  function handleFaqClick(e) {
    const item = e.currentTarget.closest('.faq-item') || e.currentTarget.closest('.sdoc-faq-item');
    if (item) item.classList.toggle('open');
  }

  return (
    <div className="blog-page">
<div className="arl-wrap">

  <div className="arl-hero">
    <div className="arl-hero-label">✍ Travel Inspiration & Tips</div>
    <h1>The Flightlanes Travel Blog</h1>
    <p>Expert travel tips, destination guides, money-saving hacks and insider stories from our global community of travelers.</p>
  </div>

  <div className="arl-inner">

    {/* Filter bar with scroll */}
    <div className="arl-filter-wrap">
      <button className="arl-filter-arrow" title="Scroll left">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div className="arl-filter-scroll" id="blog-filter-scroll">
        <div className="arl-filter-bar" id="blog-filter-bar">
          <button className="arl-filter-btn active">All Articles</button>
          <button className="arl-filter-btn">🌍 Destinations</button>
          <button className="arl-filter-btn">✈ Flights</button>
          <button className="arl-filter-btn">🏨 Hotels</button>
          <button className="arl-filter-btn">🔥 Deals</button>
          <button className="arl-filter-btn">🏔 Adventure</button>
          <button className="arl-filter-btn">🍜 Food & Drink</button>
          <button className="arl-filter-btn">💡 Tips</button>
          <button className="arl-filter-btn">🚢 Cruises</button>
        </div>
      </div>
      <button className="arl-filter-arrow" title="Scroll right">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>

    <div className="arl-section-title" id="blog-list-title">All Articles</div>
    <div className="arl-section-sub">Click any article to read the full guide</div>

    <div className="arl-grid" id="blog-list-grid">
      <div className="arl-card" data-cat="destinations">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=85" alt="The Ultimate Tokyo Travel Guide 2026" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🌍</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🌍 Destinations</div>
          <div className="arl-card-name is-blo-c425bf">The Ultimate Tokyo Travel Guide 2026</div>
          <div className="arl-card-desc">Everything you need to know before you fly — temples, food, transport and hidden gems.</div>
          <div className="arl-card-foot">
            <Link href="/blog/the-ultimate-tokyo-travel-guide-2026" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="destinations">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=85" alt="Paris in 48 Hours — The Perfect Weekend" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🌍</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🌍 Destinations</div>
          <div className="arl-card-name is-blo-c425bf">Paris in 48 Hours — The Perfect Weekend</div>
          <div className="arl-card-desc">The ultimate short-break itinerary for the City of Light — art, food and romance.</div>
          <div className="arl-card-foot">
            <Link href="/blog/paris-in-48-hours-the-perfect-weekend" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="flights">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=85" alt="17 Proven Tricks to Find Cheap Flights" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">✈</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">✈ Flights</div>
          <div className="arl-card-name is-blo-c425bf">17 Proven Tricks to Find Cheap Flights</div>
          <div className="arl-card-desc">Insider hacks that actually work — from incognito mode myths to real booking windows.</div>
          <div className="arl-card-foot">
            <Link href="/blog/17-proven-tricks-to-find-cheap-flights" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="deals">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=85" alt="Bali All-Inclusive Packages Under $1,000" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🔥</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🔥 Deals</div>
          <div className="arl-card-name is-blo-c425bf">Bali All-Inclusive Packages Under $1,000</div>
          <div className="arl-card-desc">Sun, rice paddies, temples and surf — all for less than you think. Here's how.</div>
          <div className="arl-card-foot">
            <Link href="/blog/bali-all-inclusive-packages-under-1-000" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="hotels">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=85" alt="World's 10 Most Extraordinary Hotels 2026" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🏨</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🏨 Hotels</div>
          <div className="arl-card-name is-blo-c425bf">World's 10 Most Extraordinary Hotels 2026</div>
          <div className="arl-card-desc">Ice hotels in Sweden, underwater suites in Maldives — these stays redefine luxury.</div>
          <div className="arl-card-foot">
            <Link href="/blog/world-s-10-most-extraordinary-hotels-202" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="flights">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600&q=85" alt="How to Fly Business Class for Economy Prices" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">✈</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">✈ Flights</div>
          <div className="arl-card-name is-blo-c425bf">How to Fly Business Class for Economy Prices</div>
          <div className="arl-card-desc">Miles hacks, error fares and bidding strategies that get you into lie-flat seats cheap.</div>
          <div className="arl-card-foot">
            <Link href="/blog/how-to-fly-business-class-for-economy-pr" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="food">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85" alt="The Best Street Food Cities on Earth" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🍜</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🍜 Food & Drink</div>
          <div className="arl-card-name is-blo-c425bf">The Best Street Food Cities on Earth</div>
          <div className="arl-card-desc">Bangkok, Mexico City, Marrakech — our guide to eating brilliantly on a budget.</div>
          <div className="arl-card-foot">
            <Link href="/blog/the-best-street-food-cities-on-earth" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="adventure">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=85" alt="Patagonia: The Ultimate Trekker's Guide" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🏔</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🏔 Adventure</div>
          <div className="arl-card-name is-blo-c425bf">Patagonia: The Ultimate Trekker's Guide</div>
          <div className="arl-card-desc">Torres del Paine, the W-Circuit and how to plan the trip of a lifetime at the end of the world.</div>
          <div className="arl-card-foot">
            <Link href="/blog/patagonia-the-ultimate-trekker-s-guide" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="destinations">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85" alt="Maldives on a Budget — Is It Possible?" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🌍</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🌍 Destinations</div>
          <div className="arl-card-name is-blo-c425bf">Maldives on a Budget — Is It Possible?</div>
          <div className="arl-card-desc">Yes. Guesthouses, local islands and ferry networks mean paradise doesn't have to cost a fortune.</div>
          <div className="arl-card-foot">
            <Link href="/blog/maldives-on-a-budget-is-it-possible" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="tips">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=85" alt="The Only Packing List You'll Ever Need" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">💡</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">💡 Tips</div>
          <div className="arl-card-name is-blo-c425bf">The Only Packing List You'll Ever Need</div>
          <div className="arl-card-desc">Pack light, pack right. Our carry-on-only system works for any trip from 3 days to 3 months.</div>
          <div className="arl-card-foot">
            <Link href="/blog/the-only-packing-list-you-ll-ever-need" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="hotels">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=85" alt="Hostel vs Hotel: Which Should You Book?" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🏨</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🏨 Hotels</div>
          <div className="arl-card-name is-blo-c425bf">Hostel vs Hotel: Which Should You Book?</div>
          <div className="arl-card-desc">Beyond price — the real differences in comfort, social life, safety and experience.</div>
          <div className="arl-card-foot">
            <Link href="/blog/hostel-vs-hotel-which-should-you-book" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="adventure">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=85" alt="Your First African Safari: A Complete Guide" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🏔</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🏔 Adventure</div>
          <div className="arl-card-name is-blo-c425bf">Your First African Safari: A Complete Guide</div>
          <div className="arl-card-desc">Which country, which park, which time of year — everything first-timers need to know.</div>
          <div className="arl-card-foot">
            <Link href="/blog/your-first-african-safari-a-complete-gui" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="food">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=85" alt="Europe's Best Wine Regions for Travelers" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🍷</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🍷 Food & Drink</div>
          <div className="arl-card-name is-blo-c425bf">Europe's Best Wine Regions for Travelers</div>
          <div className="arl-card-desc">Bordeaux, Tuscany, Rioja — the vineyards, tastings and village stays worth planning around.</div>
          <div className="arl-card-foot">
            <Link href="/blog/europe-s-best-wine-regions-for-travelers" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="tips">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=85" alt="The Ultimate USA Road Trip Route" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🚗</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🚗 Tips</div>
          <div className="arl-card-name is-blo-c425bf">The Ultimate USA Road Trip Route</div>
          <div className="arl-card-desc">Coast to coast in 21 days — the classic American road trip planned stop by stop.</div>
          <div className="arl-card-foot">
            <Link href="/blog/the-ultimate-usa-road-trip-route" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="cruises">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=85" alt="Mediterranean Cruise Guide: Ports Worth Your Day" loading="lazy" />
          <div className="arl-card-logo is-blo-5eac1d">🚢</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🚢 Cruises</div>
          <div className="arl-card-name is-blo-c425bf">Mediterranean Cruise Guide: Ports Worth Your Day</div>
          <div className="arl-card-desc">Barcelona to Athens — how to make the most of every port call on a Med cruise.</div>
          <div className="arl-card-foot">
            <Link href="/blog/mediterranean-cruise-guide-ports-worth-y" className="arl-card-btn">Read More →</Link>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

    </div>
  );
}
