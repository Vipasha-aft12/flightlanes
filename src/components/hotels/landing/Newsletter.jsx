'use client';
export default function Newsletter() {
  return (
    <section className="newsletter-section py-5 px-3">
      <div className="container-xl newsletter-container mx-auto text-center" >
        <div className="section-label">Hotel Deals in Your Inbox</div>
        <h2>Never Miss a Hotel Deal</h2>
        <p className="section-subtitle mb-4">Get exclusive hotel flash sales and member-only rates delivered to your inbox.</p>
        <div className="d-flex gap-2 flex-column flex-sm-row">
          <input type="email" className="form-control form-control-lg newsletter-input" placeholder="Enter your email address" />
          <button className="btn-fl-book newsletter-btn px-4 flex-shrink-0">Get Hotel Deals →</button>
        </div>
        <div className="small text-secondary mt-3">Join 500,000+ deal hunters. No spam. Unsubscribe anytime.</div>
      </div>
    </section>
  );
}
