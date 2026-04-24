'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './BlogDetailPage.css';

export default function BlogDetailPage() {
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean).pop();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/public/blogs/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => {
        setBlog(d.blog);
        // Extract h2 headings from content for TOC
        const matches = [...(d.blog.content || '').matchAll(/<h2[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h2>/g)];
        if (matches.length) {
          setToc(matches.map(m => ({ id: m[1], label: m[2] })));
        } else {
          // Fallback: extract all h2 text
          const h2s = [...(d.blog.content || '').matchAll(/<h2[^>]*>([^<]*)<\/h2>/g)];
          setToc(h2s.map((m, i) => ({ id: `section-${i}`, label: m[1] })));
        }
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div className="blogdetail-page"><div className="state-msg-lg">Loading article...</div></div>
  );
  if (error || !blog) return (
    <div className="blogdetail-page"><div className="state-msg-box">
      <h2>Article not found</h2>
      <p>This blog post may have been removed or the URL is incorrect.</p>
      <Link href="/blog" className="state-msg-link">← Back to Blog</Link>
    </div></div>
  );

  const pubDate = blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  // Add IDs to h2 tags in content if missing
  let processedContent = blog.content || '';
  let h2Index = 0;
  processedContent = processedContent.replace(/<h2([^>]*)>/g, (match, attrs) => {
    if (attrs.includes('id=')) return match;
    return `<h2${attrs} id="section-${h2Index++}">`;
  });

  return (
    <div className="blogdetail-page">
      <div className="bd2-outer">
        <Link href="/blog" className="bd2-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back to Blog
        </Link>

        <div className="bd2-hero">
          <img src={blog.heroImage?.url} alt={blog.heroImage?.alt || blog.title} />
          <div className="bd2-hero-overlay"></div>
          <div className="bd2-hero-content">
            <span className="bd2-badge">{blog.categoryIcon} {blog.category}</span>
            <h1>{blog.title}</h1>
          </div>
        </div>

        <div className="bd2-author-bar">
          <div className="bd2-author-left">
            <div className="bd2-av">{blog.authorInitials || 'FL'}</div>
            <div>
              <div className="bd2-author-name">{blog.author || 'Fareoworld Editorial'}</div>
              <div className="bd2-author-meta">{pubDate} · {blog.readingTime || 7} min read</div>
            </div>
          </div>
          <div className="bd2-share-row">
            <button className="bd2-share-btn" onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Link copied!'); }}>🔗 Share</button>
            <button className="bd2-share-btn" onClick={() => alert('Saved to reading list!')}>🔖 Save</button>
          </div>
        </div>

        <div className="bd2-layout">
          {toc.length > 0 && (
            <div className="bd2-left-col">
              <div className="bd2-toc">
                <div className="bd2-toc-head">📋 Contents</div>
                <div className="bd2-toc-body">
                  {toc.map((t, i) => (
                    <a key={i} className="bd2-toc-item" href={`#${t.id}`}>{t.label}</a>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="bd2-content-col">
            <div className="bd2-content" dangerouslySetInnerHTML={{ __html: processedContent }} />

            {blog.faqs?.length > 0 && (
              <div className="bd2-faq-section">
                <h2>Frequently Asked Questions</h2>
                {blog.faqs.map((f, i) => (
                  <div key={i} className="bd2-faq-card">
                    <div className="bd2-faq-q">{f.question}</div>
                    <div className="bd2-faq-a">{f.answer}</div>
                  </div>
                ))}
              </div>
            )}

            {blog.heroImage?.credit && (
              <p className="bd2-hero-credit">Hero image: {blog.heroImage.credit}</p>
            )}
          </div>
        </div>

        {/* FAQ Schema for Google */}
        {blog.faqs?.length > 0 && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: blog.faqs.map(f => ({
              '@type': 'Question', name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }) }} />
        )}
      </div>
    </div>
  );
}
