const deals = [
  { text: '🏨 Paris Hotels', highlight: 'from $72/night' },
  { text: '🏖 Miami Beach Hotels', highlight: '40% OFF' },
  { text: '💎 Dubai 5★ Hotels', highlight: 'from $219/night' },
  { text: '🌴 Maldives Overwater Villas', highlight: 'from $489/night' },
  { text: '🗽 New York Hotels', highlight: 'from $89/night' },
  { text: '🎰 Las Vegas Strip Hotels', highlight: 'Save 35%' },
  { text: '🌸 Tokyo Boutique Hotels', highlight: 'from $58/night' },
];
export default function DealsTicker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {[...deals, ...deals].map((d, i) => (
          <div key={i} className="ticker-item">
            {d.text} <span className="ticker-highlight">{d.highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
