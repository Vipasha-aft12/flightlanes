'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import './DestinationsPage.css';

export default function DestinationsPage() {

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
    <div className="destinations-page">
<div className="arl-wrap">
  <div className="arl-hero">
    <div className="arl-hero-label">🌍 Explore the World</div>
    <h1>Top Travel Destinations</h1>
    <p>Hand-picked destinations across every continent — from iconic cities and tropical islands to wildlife safaris and mountain adventures.</p>
  </div>
  <div className="arl-inner">
    <div className="arl-filter-wrap">
      <button className="arl-filter-arrow" title="Scroll left">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div className="arl-filter-scroll" id="dst-filter-scroll">
        <div className="arl-filter-bar">
          <button className="arl-filter-btn active">All Destinations</button>
          <button className="arl-filter-btn">🌏 Asia</button>
          <button className="arl-filter-btn">🏰 Europe</button>
          <button className="arl-filter-btn">🗽 Americas</button>
          <button className="arl-filter-btn">🕌 Middle East</button>
          <button className="arl-filter-btn">🌍 Africa</button>
          <button className="arl-filter-btn">🌊 Pacific</button>
        </div>
      </div>
      <button className="arl-filter-arrow" title="Scroll right">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
    <div className="arl-section-title" id="dst-sec-title">All Destinations</div>
    <div className="arl-section-sub">Click any destination to explore guides, tips and flights</div>
    <div className="arl-grid" id="dst-grid">
      <div className="arl-card" data-cat="asia">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=85" alt="Tokyo" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🇯🇵</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🇯🇵 Asia · Japan</div>
          <div className="arl-card-name">Tokyo</div>
          <div className="arl-card-desc">Where Tradition Meets the Future</div>
          <div className="arl-card-foot">
            <Link href="/destinations/tokyo" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="europe">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=85" alt="Paris" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🇫🇷</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🇫🇷 Europe · France</div>
          <div className="arl-card-name">Paris</div>
          <div className="arl-card-desc">The City of Light, Art & Romance</div>
          <div className="arl-card-foot">
            <Link href="/destinations/paris" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="asia">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=85" alt="Bali" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🇮🇩</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🇮🇩 Asia · Indonesia</div>
          <div className="arl-card-name">Bali</div>
          <div className="arl-card-desc">Island of the Gods</div>
          <div className="arl-card-foot">
            <Link href="/destinations/bali" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="americas">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=85" alt="New York City" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🇺🇸</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🇺🇸 Americas · United States</div>
          <div className="arl-card-name">New York City</div>
          <div className="arl-card-desc">The City That Never Sleeps</div>
          <div className="arl-card-foot">
            <Link href="/destinations/new-york-city" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="middleeast">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=85" alt="Dubai" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🇦🇪</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🇦🇪 Middle East · UAE</div>
          <div className="arl-card-name">Dubai</div>
          <div className="arl-card-desc">Where Ambition Meets the Desert</div>
          <div className="arl-card-foot">
            <Link href="/destinations/dubai" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="europe">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=85" alt="London" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🇬🇧</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🇬🇧 Europe · United Kingdom</div>
          <div className="arl-card-name">London</div>
          <div className="arl-card-desc">History, Culture & Pubs on Every Corner</div>
          <div className="arl-card-foot">
            <Link href="/destinations/london" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="asia">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85" alt="Maldives" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🌊</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🌊 Indian Ocean · Maldives</div>
          <div className="arl-card-name">Maldives</div>
          <div className="arl-card-desc">The Last Paradise on Earth</div>
          <div className="arl-card-foot">
            <Link href="/destinations/maldives" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="europe">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=85" alt="Rome" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🇮🇹</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🇮🇹 Europe · Italy</div>
          <div className="arl-card-name">Rome</div>
          <div className="arl-card-desc">The Eternal City</div>
          <div className="arl-card-foot">
            <Link href="/destinations/rome" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="pacific">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=85" alt="New Zealand" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🇳🇿</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🇳🇿 Pacific · New Zealand</div>
          <div className="arl-card-name">New Zealand</div>
          <div className="arl-card-desc">Adventure Capital of the World</div>
          <div className="arl-card-foot">
            <Link href="/destinations/new-zealand" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="europe">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=85" alt="Barcelona" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🇪🇸</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🇪🇸 Europe · Spain</div>
          <div className="arl-card-name">Barcelona</div>
          <div className="arl-card-desc">Gaudí, Beaches & Tapas</div>
          <div className="arl-card-foot">
            <Link href="/destinations/barcelona" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
      <div className="arl-card" data-cat="africa">
        <div className="arl-card-img">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=85" alt="African Safari" loading="lazy" />
          <div className="arl-card-logo is-des-e79cc0">🌍</div>
        </div>
        <div className="arl-card-body">
          <div className="arl-card-tag">🌍 Africa · Kenya / Tanzania</div>
          <div className="arl-card-name">African Safari</div>
          <div className="arl-card-desc">The Greatest Wildlife Show on Earth</div>
          <div className="arl-card-foot">
            <Link href="/destinations/african-safari" className="arl-card-btn">Explore →</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
