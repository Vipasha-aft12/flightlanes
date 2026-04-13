import './DealsTicker.css';
const TICKER_ITEMS = [
  ['✈ NYC → London', 'from $349'],
  ['🏨 Miami Beach Hotels', '40% OFF'],
  ['✈ LA → Tokyo', 'from $699'],
  ['🚢 Caribbean Cruise 7-night', 'from $599/pp'],
  ['✈ Chicago → Paris', 'from $419'],
  ['🏝️ Hawaii All-inclusive', 'from $1,299'],
  ['🚗 Car Rentals', 'Save 35%'],
  ['✈ Dallas → Cancún', 'from $189'],
];

export default function DealsTicker() {
  /* Duplicate items so the infinite CSS animation scrolls seamlessly */
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="deals-ticker" role="marquee" aria-label="Live travel deals">
      <div className="ticker-inner">
        {doubled.map(([text, price], i) => (
          <div className="ticker-item" key={i}>
            {text} <span>{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
