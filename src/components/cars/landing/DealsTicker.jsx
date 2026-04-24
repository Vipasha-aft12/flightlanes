const deals = [
  '🚗 Economy Cars NYC from $22/day',
  '🚙 SUV Miami Save 35%',
  '💎 Luxury Vegas from $89/day',
  '🚐 Minivan Los Angeles from $65/day',
  '🚗 Compact Cars Chicago from $28/day',
  '🏎 Convertible Miami from $72/day',
  '🚙 4WD Off-road Phoenix Save 40%',
];

export default function DealsTicker() {
  const doubled = [...deals, ...deals];
  return (
    <div className="deals-ticker"><div className="ticker-inner">
      {doubled.map((d, i) => <div className="ticker-item" key={i}>{d}</div>)}
    </div></div>
  );
}
