const reviews = [
  { text: "Found our dream Bali villa through Fareoworld at $60 cheaper per night than on other sites.", avatar: 'EL', name: 'Emily L.', loc: 'Seattle, WA' },
  { text: "Booked a last-minute NYC hotel at 11pm and got instant confirmation. Perfect location.", avatar: 'DM', name: 'David M.', loc: 'Chicago, IL' },
  { text: "The Santorini caldera view suite was absolute perfection. Fareoworld beat every other price.", avatar: 'RK', name: 'Rachel K.', loc: 'Boston, MA' },
];
export default function Reviews() {
  return (
    <section className="py-5 px-3 section-bg-teal">
      <div className="container-xl">
        <div className="text-center mb-5 fade-up">
          <div className="section-label section-label-light">Guest Reviews</div>
          <h2 className="section-title-white">Travelers Love Their Hotel Bookings</h2>
          <p className="section-subtitle-white">Real experiences from verified Fareoworld hotel guests.</p>
        </div>
        <div className="row g-4 fade-up">
          {reviews.map((r, i) => (
            <div key={i} className="col-12 col-md-4">
              <div className="review-card h-100">
                <div className="review-stars mb-3">★★★★★</div>
                <p className="review-text mb-4">"{r.text}"</p>
                <div className="d-flex align-items-center gap-3">
                  <div className="rev-avatar">{r.avatar}</div>
                  <div>
                    <div className="fw-bold small">{r.name}</div>
                    <div className="rev-loc">{r.loc} · Verified Guest</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <div className="review-aggregate-sub mb-2">Average from 1.8 million hotel reviews</div>
          <div className="review-aggregate-score">4.8 / 5 ★</div>
        </div>
      </div>
    </section>
  );
}
