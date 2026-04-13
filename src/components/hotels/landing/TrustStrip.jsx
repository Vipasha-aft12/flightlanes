const items = [
  { icon: '🛡', text: 'SSL Secured Booking' },
  { icon: '✅', text: 'Best Rate Guarantee' },
  { icon: '🆓', text: 'Free Cancellation' },
  { icon: '💬', text: '24/7 Hotel Support' },
  { icon: '⭐', text: '2M+ Verified Reviews' },
];
export default function TrustStrip() {
  return (
    <div className="trust-strip py-3 px-3">
      <div className="container-xl d-flex align-items-center justify-content-center gap-4 flex-wrap">
        {items.map((item, i) => (
          <div key={i} className="d-flex align-items-center gap-2 small fw-semibold text-secondary">
            <div className="trust-icon"><span>{item.icon}</span></div>{item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
