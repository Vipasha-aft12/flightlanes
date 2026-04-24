import Link from 'next/link';

/**
 * Generic SEO landing page scaffold.
 * Used by every catch-all dispatcher so all new routes render consistently.
 *
 * Props:
 *  - badge:       small pill above the H1 (e.g. "Hotels in India")
 *  - title:       main H1 text
 *  - titleEm:     optional italic/gold emphasis word(s) inside the title
 *  - subtitle:    paragraph under H1
 *  - breadcrumbs: array of { label, href? } (last one is current — no href)
 *  - ctaPrimary:  { label, href } - main call-to-action (routes to booking flow)
 *  - ctaSecondary: optional second CTA
 *  - bodyBlocks:  array of { heading, text } sections rendered below hero
 *  - relatedLinks: array of { label, href } for internal linking
 */
export default function SeoLanding({
  badge,
  title,
  titleEm,
  subtitle,
  breadcrumbs = [],
  ctaPrimary,
  ctaSecondary,
  bodyBlocks = [],
  relatedLinks = [],
}) {
  return (
    <>
      <section className="hero" style={{ minHeight: '55vh' }}>
        <div className="hero-bg" style={{ background: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&q=90') center/cover no-repeat", opacity: 0.55 }}></div>
        <div className="hero-grad"></div>
        <div className="hero-content">
          {breadcrumbs.length > 0 && (
            <nav aria-label="breadcrumb" className="mb-3" style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.85)' }}>
              {breadcrumbs.map((b, i) => (
                <span key={i}>
                  {b.href ? <Link href={b.href} style={{ color: 'rgba(255,255,255,.9)', textDecoration: 'underline' }}>{b.label}</Link> : <span style={{ fontWeight: 600 }}>{b.label}</span>}
                  {i < breadcrumbs.length - 1 && <span style={{ margin: '0 8px', opacity: .6 }}>›</span>}
                </span>
              ))}
            </nav>
          )}
          {badge && (
            <div className="hero-badge">
              <div className="badge-dot"></div>
              {badge}
            </div>
          )}
          <h1>
            {title}
            {titleEm && <><br /><em>{titleEm}</em></>}
          </h1>
          {subtitle && <p>{subtitle}</p>}
          <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
            {ctaPrimary && (
              <Link href={ctaPrimary.href} className="btn-cta">
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link href={ctaSecondary.href} className="btn-ghost" style={{ color: 'white', borderColor: 'white' }}>
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {bodyBlocks.length > 0 && (
        <section className="py-5 px-3 bg-white">
          <div className="container-xl" style={{ maxWidth: 960 }}>
            {bodyBlocks.map((block, i) => (
              <div key={i} className="mb-5">
                {block.heading && <h2 className="mb-3" style={{ fontSize: '1.6rem', color: 'var(--g800)' }}>{block.heading}</h2>}
                {block.text && <p style={{ color: 'var(--g600)', lineHeight: 1.75, fontSize: '1.02rem' }}>{block.text}</p>}
                {block.list && (
                  <ul style={{ color: 'var(--g600)', lineHeight: 1.8, paddingLeft: 22 }}>
                    {block.list.map((item, j) => <li key={j} style={{ marginBottom: 6 }}>{item}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedLinks.length > 0 && (
        <section className="py-5 px-3" style={{ background: 'var(--g50)' }}>
          <div className="container-xl" style={{ maxWidth: 1100 }}>
            <div className="section-label">Explore More</div>
            <h2 className="mb-4" style={{ fontSize: '1.5rem' }}>Related Pages</h2>
            <div className="row g-3">
              {relatedLinks.map((link, i) => (
                <div key={i} className="col-6 col-md-4 col-lg-3">
                  <Link href={link.href} style={{
                    display: 'block',
                    padding: '14px 16px',
                    background: 'white',
                    borderRadius: 12,
                    border: '1px solid var(--g200)',
                    color: 'var(--teal)',
                    fontWeight: 600,
                    fontSize: '.9rem',
                    transition: 'all .2s',
                  }}>
                    {link.label} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
