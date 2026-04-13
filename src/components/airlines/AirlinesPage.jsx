'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './AirlinesPage.css';

export default function AirlinesPage() {

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
    <div className="airlines-page">
<div className="arl-wrap">

  <div className="arl-hero">
    <div className="arl-hero-label">✈ Browse Airlines</div>
    <h1>Find Your Perfect Airline</h1>
    <p>Compare 20+ airlines across US carriers, international flag carriers and budget airlines — all at guaranteed lowest fares.</p>
  </div>

  <div className="arl-inner">

    {/* Filter bar with scroll */}
    <div className="arl-filter-wrap">
      <button className="arl-filter-arrow" title="Scroll left">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div className="arl-filter-scroll" id="arl-filter-scroll">
        <div className="arl-filter-bar" id="arl-filter-bar">
          <button className="arl-filter-btn active">All Airlines</button>
          <button className="arl-filter-btn">🇺🇸 US Carriers</button>
          <button className="arl-filter-btn">🌍 International</button>
          <button className="arl-filter-btn">💰 Budget Airlines</button>
        </div>
      </div>
      <button className="arl-filter-arrow" title="Scroll right">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>

    <div className="arl-section-title" id="arl-sec-title">All Airlines</div>
    <div className="arl-section-sub">Click any airline to search available flights</div>

    {/* All cards */}
    <div className="arl-grid" id="arl-grid-all">
      <div className="arl-card" data-cat="us">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=85" alt="Delta Air Lines" loading="lazy" />
          <div className="arl-card-logo">DL</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">US Major Carrier</div>
          <div className="arl-card-name">Delta Air Lines</div>
          <div className="arl-card-desc">Fly Delta's extensive US and international network with award-winning service and generous miles program.</div>
          <div className="arl-card-foot"><Link href="/airlines/delta-air-lines" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="us">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=85" alt="American Airlines" loading="lazy" />
          <div className="arl-card-logo">AA</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">World's Largest</div>
          <div className="arl-card-name">American Airlines</div>
          <div className="arl-card-desc">The world's largest airline by fleet size, connecting 350+ destinations across 60+ countries.</div>
          <div className="arl-card-foot"><Link href="/airlines/american-airlines" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="us">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=85" alt="United Airlines" loading="lazy" />
          <div className="arl-card-logo">UA</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Global Network</div>
          <div className="arl-card-name">United Airlines</div>
          <div className="arl-card-desc">Fly United's global network spanning 340+ destinations, with premium Polaris Business Class on long-haul.</div>
          <div className="arl-card-foot"><Link href="/airlines/united-airlines" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="us">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=85" alt="Southwest Airlines" loading="lazy" />
          <div className="arl-card-logo">WN</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">No Hidden Fees</div>
          <div className="arl-card-name">Southwest Airlines</div>
          <div className="arl-card-desc">No change fees, free bags fly free, and flexible fares — the friendliest way to fly across the US.</div>
          <div className="arl-card-foot"><Link href="/airlines/southwest-airlines" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="us">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=85" alt="JetBlue Airways" loading="lazy" />
          <div className="arl-card-logo">B6</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Premium Economy</div>
          <div className="arl-card-name">JetBlue Airways</div>
          <div className="arl-card-desc">JetBlue's Mint business class offers lie-flat seats and farm-to-table dining on select transcontinental routes.</div>
          <div className="arl-card-foot"><Link href="/airlines/jetblue-airways" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="us">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=85" alt="Alaska Airlines" loading="lazy" />
          <div className="arl-card-logo">AS</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">West Coast Leader</div>
          <div className="arl-card-name">Alaska Airlines</div>
          <div className="arl-card-desc">Alaska's vast West Coast network plus international routes to Mexico, Canada and Central America.</div>
          <div className="arl-card-foot"><Link href="/airlines/alaska-airlines" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="us">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85" alt="Spirit Airlines" loading="lazy" />
          <div className="arl-card-logo">NK</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Ultra Low Cost</div>
          <div className="arl-card-name">Spirit Airlines</div>
          <div className="arl-card-desc">Spirit keeps fares low so you choose only what you need. Great for short hops and budget-conscious travelers.</div>
          <div className="arl-card-foot"><Link href="/airlines/spirit-airlines" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="us">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=85" alt="Frontier Airlines" loading="lazy" />
          <div className="arl-card-logo">F9</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Green Low Cost</div>
          <div className="arl-card-name">Frontier Airlines</div>
          <div className="arl-card-desc">America's greenest airline with ultra-low fares, Frontier keeps travel affordable across 100+ US cities.</div>
          <div className="arl-card-foot"><Link href="/airlines/frontier-airlines" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="intl">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=85" alt="British Airways" loading="lazy" />
          <div className="arl-card-logo">BA</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Flag Carrier UK</div>
          <div className="arl-card-name">British Airways</div>
          <div className="arl-card-desc">Premium transatlantic routes from London Heathrow with Club World business class and Executive Club miles.</div>
          <div className="arl-card-foot"><Link href="/airlines/british-airways" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="intl">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=85" alt="Emirates" loading="lazy" />
          <div className="arl-card-logo">EK</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">World's Best Airline</div>
          <div className="arl-card-name">Emirates</div>
          <div className="arl-card-desc">Experience unmatched luxury with Emirates' A380 first-class suites, private bars and onboard showers.</div>
          <div className="arl-card-foot"><Link href="/airlines/emirates" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="intl">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=85" alt="Air France" loading="lazy" />
          <div className="arl-card-logo">AF</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">French Elegance</div>
          <div className="arl-card-name">Air France</div>
          <div className="arl-card-desc">Fly la compagnie nationale with award-winning cuisine, La Première first class and a global codeshare network.</div>
          <div className="arl-card-foot"><Link href="/airlines/air-france" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="intl">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&q=85" alt="Lufthansa" loading="lazy" />
          <div className="arl-card-logo">LH</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">German Engineering</div>
          <div className="arl-card-name">Lufthansa</div>
          <div className="arl-card-desc">Germany's flagship carrier with award-winning First Class, a vast European network and Miles & More rewards.</div>
          <div className="arl-card-foot"><Link href="/airlines/lufthansa" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="intl">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=85" alt="ANA" loading="lazy" />
          <div className="arl-card-logo">NH</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Japanese Hospitality</div>
          <div className="arl-card-name">ANA</div>
          <div className="arl-card-desc">All Nippon Airways — Japan's largest airline delivering legendary Japanese hospitality on every flight.</div>
          <div className="arl-card-foot"><Link href="/airlines/ana" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="intl">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&q=85" alt="Singapore Airlines" loading="lazy" />
          <div className="arl-card-logo">SQ</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">5-Star Excellence</div>
          <div className="arl-card-name">Singapore Airlines</div>
          <div className="arl-card-desc">Consistently rated the world's best airline, Singapore Airlines sets the gold standard for premium travel.</div>
          <div className="arl-card-foot"><Link href="/airlines/singapore-airlines" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="intl">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=85" alt="Cathay Pacific" loading="lazy" />
          <div className="arl-card-logo">CX</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Asia's Premier Hub</div>
          <div className="arl-card-name">Cathay Pacific</div>
          <div className="arl-card-desc">Based in Hong Kong, Cathay Pacific connects Asia to the world with Business and Premium Economy excellence.</div>
          <div className="arl-card-foot"><Link href="/airlines/cathay-pacific" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="intl">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=85" alt="Turkish Airlines" loading="lazy" />
          <div className="arl-card-logo">TK</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Most Countries Flown</div>
          <div className="arl-card-name">Turkish Airlines</div>
          <div className="arl-card-desc">Turkish Airlines flies to more countries than any other airline, connecting East and West through Istanbul.</div>
          <div className="arl-card-foot"><Link href="/airlines/turkish-airlines" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="budget">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=85" alt="Ryanair" loading="lazy" />
          <div className="arl-card-logo">FR</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Europe Budget King</div>
          <div className="arl-card-name">Ryanair</div>
          <div className="arl-card-desc">Europe's largest low-cost carrier connecting 230+ airports across Europe and North Africa at unbeatable prices.</div>
          <div className="arl-card-foot"><Link href="/airlines/ryanair" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="budget">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=85" alt="easyJet" loading="lazy" />
          <div className="arl-card-logo">U2</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Orange Low Cost</div>
          <div className="arl-card-name">easyJet</div>
          <div className="arl-card-desc">easyJet makes European city breaks easy with affordable fares to 150+ destinations from major UK airports.</div>
          <div className="arl-card-foot"><Link href="/airlines/easyjet" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="budget">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=85" alt="WestJet" loading="lazy" />
          <div className="arl-card-logo">WS</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">Canada's Favourite</div>
          <div className="arl-card-name">WestJet</div>
          <div className="arl-card-desc">WestJet's warm, friendly service connects Canadian cities and popular sun destinations from coast to coast.</div>
          <div className="arl-card-foot"><Link href="/airlines/westjet" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
      <div className="arl-card" data-cat="budget">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=85" alt="IndiGo" loading="lazy" />
          <div className="arl-card-logo">6E</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">India's Largest</div>
          <div className="arl-card-name">IndiGo</div>
          <div className="arl-card-desc">IndiGo dominates Indian skies with on-time performance and low fares connecting 100+ Indian destinations.</div>
          <div className="arl-card-foot"><Link href="/airlines/indigo" className="arl-card-btn">Read More →</Link></div>
        </div>
      </div>
    </div>

  </div>
</div>




{/* ═══ AIRLINE DETAIL PAGE ═══ */}
    </div>
  );
}
