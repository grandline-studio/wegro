import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const tickerData = [
  { symbol: "NIFTY 50", price: "24,865.20", change: "+118.40 (+0.48%)", isUp: true },
  { symbol: "SENSEX", price: "81,381.36", change: "+361.07 (+0.45%)", isUp: true },
  { symbol: "BANK NIFTY", price: "51,420.75", change: "-84.60 (-0.16%)", isUp: false },
  { symbol: "NIFTY MIDCAP 100", price: "58,920.10", change: "+324.50 (+0.55%)", isUp: true },
  { symbol: "MCX GOLD DEC", price: "₹76,140", change: "+280 (+0.37%)", isUp: true },
  { symbol: "MCX SILVER DEC", price: "₹91,450", change: "+620 (+0.68%)", isUp: true },
  { symbol: "MCX CRUDE OIL", price: "₹5,890", change: "-42 (-0.71%)", isUp: false },
  { symbol: "USD / INR", price: "84.06", change: "+0.02 (+0.02%)", isUp: true },
];

export default function LiveTicker() {
  return (
    <div className="ticker-bar" aria-label="Market Data Ticker">
      <div className="ticker-track">
        {[...tickerData, ...tickerData].map((item, idx) => (
          <div className="ticker-item" key={idx}>
            <span className="ticker-symbol">{item.symbol}</span>
            <span className="ticker-price">{item.price}</span>
            <span className={`ticker-change ${item.isUp ? 'up' : 'down'}`}>
              {item.isUp ? (
                <TrendingUp size={12} style={{ display: 'inline', marginRight: 3 }} />
              ) : (
                <TrendingDown size={12} style={{ display: 'inline', marginRight: 3 }} />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
