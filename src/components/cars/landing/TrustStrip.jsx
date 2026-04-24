const items = [
  { icon: '🛡', text: 'No Hidden Fees' },
  { icon: '✅', text: 'Free Cancellation' },
  { icon: '💳', text: 'Instant Confirmation' },
  { icon: '📞', text: '24/7 Roadside Support' },
  { icon: '⭐', text: '500+ Brands Compared' },
];

export default function TrustStrip() {
  return (
    <div className="trust-strip"><div className="trust-inner">
      {items.map((item, i) => (
        <div className="trust-item" key={i}><div className="trust-icon">{item.icon}</div>{item.text}</div>
      ))}
    </div></div>
  );
}
