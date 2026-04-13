const tiers = [
  { icon: '🥉', name: 'Explorer', pts: '0–5,000 pts' },
  { icon: '🥈', name: 'Voyager', pts: '5K–20K pts' },
  { icon: '🥇', name: 'Globetrotter', pts: '20K–60K pts' },
  { icon: '💎', name: 'Elite', pts: '60,000+ pts' },
];
export default function Loyalty() {
  return (
    <section className="loyalty-section py-5 px-3 text-center">
      <div className="container-xl">
        <div className="section-label section-label-light">Hotel Rewards</div>
        <h2 className="section-title-white mt-3">Earn Points on Every Hotel Night</h2>
        <p className="section-subtitle-white mx-auto mb-4">Book hotels and collect reward points redeemable for free nights and upgrades.</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
          {tiers.map((t, i) => (
            <div key={i} className="tier-card">
              <div className="tier-icon">{t.icon}</div>
              <div className="fw-bold">{t.name}</div>
              <div className="tier-pts">{t.pts}</div>
            </div>
          ))}
        </div>
        <button className="btn-fl-white">Join Free — Start Earning Hotel Rewards</button>
      </div>
    </section>
  );
}
