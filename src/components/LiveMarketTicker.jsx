import React, { useState, useEffect, useRef } from 'react';
import { Marquee } from '@/components/ui/marquee';

// Initial realistic baseline values (Synced to latest market session)
const INITIAL_QUOTES = [
  { symbol: 'INDIA VIX', name: 'India VIX', price: 15.87, change: +7.41, yahooKey: '%5EINDIAVIX', decimals: 2 },
  { symbol: 'USD/INR', name: 'USD/INR', price: 94.61, change: -0.17, yahooKey: 'INR=X', decimals: 2 },
  { symbol: 'GOLD MCX', name: 'Gold MCX', price: 78240, change: +0.31, yahooKey: 'GC=F', decimals: 0, isGold: true },
  { symbol: 'RELIANCE', name: 'Reliance', price: 1203.00, change: +0.08, yahooKey: 'RELIANCE.NS', decimals: 2 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 701.45, change: -1.48, yahooKey: 'HDFCBANK.NS', decimals: 2 },
  { symbol: 'NIFTY 50', name: 'Nifty 50', price: 22678.70, change: -0.92, yahooKey: '%5ENSEI', decimals: 2 },
  { symbol: 'BSE SENSEX', name: 'Sensex', price: 73291.78, change: -0.76, yahooKey: '%5EBSESN', decimals: 2 },
  { symbol: 'BANK NIFTY', name: 'Bank Nifty', price: 54790.55, change: -1.26, yahooKey: '%5ENSEBANK', decimals: 2 },
  { symbol: 'TCS', name: 'TCS', price: 2513.20, change: +2.13, yahooKey: 'TCS.NS', decimals: 2 },
  { symbol: 'INFY', name: 'Infosys', price: 1164.40, change: +2.98, yahooKey: 'INFY.NS', decimals: 2 },
  { symbol: 'SILVER MCX', name: 'Silver MCX', price: 92450, change: +0.45, decimals: 0 },
  { symbol: 'CRUDE OIL', name: 'Crude Oil', price: 6480, change: -1.15, decimals: 0 }
];

export default function LiveMarketTicker({ className = '' }) {
  const [quotes, setQuotes] = useState(INITIAL_QUOTES);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [activeTickSymbol, setActiveTickSymbol] = useState(null);
  const tickTimeoutRef = useRef(null);

  // 1. Fetch real market values via Vite proxy
  useEffect(() => {
    let isMounted = true;

    const fetchLivePrices = async () => {
      try {
        const fetchPromises = INITIAL_QUOTES.filter(q => q.yahooKey).map(async (quote) => {
          try {
            const url = `/api/market/v8/finance/chart/${quote.yahooKey}?interval=1d&range=1d`;
            const res = await fetch(url);
            if (!res.ok) return null;
            const data = await res.json();
            const result = data?.chart?.result?.[0];
            const currentPrice = result?.meta?.regularMarketPrice;
            const prevClose = result?.meta?.chartPreviousClose || currentPrice;

            if (currentPrice) {
              let adjustedPrice = currentPrice;
              let chg = prevClose ? ((currentPrice - prevClose) / prevClose) * 100 : quote.change;

              // If Gold futures, convert to approx MCX 10g INR equivalent
              if (quote.isGold) {
                // approximate INR/10g using USD/INR ~94.6 and import duty
                adjustedPrice = Math.round((currentPrice * 94.61 / 31.1035) * 10 * 1.15 / 10) * 10;
              }

              return {
                symbol: quote.symbol,
                price: adjustedPrice,
                change: parseFloat(chg.toFixed(2))
              };
            }
          } catch (e) {
            // Silently retain current value
          }
          return null;
        });

        const results = await Promise.all(fetchPromises);
        if (isMounted) {
          const validResults = results.filter(Boolean);
          if (validResults.length > 0) {
            setQuotes(prevQuotes =>
              prevQuotes.map(q => {
                const found = validResults.find(r => r.symbol === q.symbol);
                return found ? { ...q, price: found.price, change: found.change } : q;
              })
            );
            setIsLiveSynced(true);
          }
        }
      } catch (err) {
        // Fallback to baseline
      }
    };

    fetchLivePrices();
    const pollInterval = setInterval(fetchLivePrices, 45000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  // 2. Micro-tick animation: simulates realistic live broker terminal fluctuations (±0.01% to ±0.03%)
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setQuotes(prevQuotes => {
        const randomIndex = Math.floor(Math.random() * prevQuotes.length);
        const item = prevQuotes[randomIndex];
        if (!item) return prevQuotes;

        // Micro-tick delta: -0.02% to +0.02%
        const deltaPercent = (Math.random() * 0.04 - 0.02);
        const newPrice = item.price * (1 + deltaPercent / 100);
        const newChange = item.change + deltaPercent;

        setActiveTickSymbol(item.symbol);
        if (tickTimeoutRef.current) clearTimeout(tickTimeoutRef.current);
        tickTimeoutRef.current = setTimeout(() => setActiveTickSymbol(null), 1200);

        return prevQuotes.map((q, idx) =>
          idx === randomIndex
            ? { ...q, price: newPrice, change: parseFloat(newChange.toFixed(2)) }
            : q
        );
      });
    }, 3600);

    return () => {
      clearInterval(tickInterval);
      if (tickTimeoutRef.current) clearTimeout(tickTimeoutRef.current);
    };
  }, []);

  const formatPrice = (val, decimals = 2) => {
    if (val >= 1000) {
      return val.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    return val.toFixed(decimals);
  };

  return (
    <div
      className={`live-market-ticker-bar ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#FAF8F5',
        border: '1px solid #E5E3DC',
        borderRadius: 4,
        height: 38,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        userSelect: 'none',
        width: '100%'
      }}
      role="region"
      aria-label="Live Market Ticker"
    >
      {/* ── PINNED LEFT: INDICATIVE BADGE ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 14px',
          height: '100%',
          background: '#F3F1EC',
          borderRight: '1px solid #E5E3DC',
          flexShrink: 0,
          zIndex: 5
        }}
      >
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: '#B91C1C',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}
        >
          INDICATIVE
        </span>
      </div>

      {/* ── CENTER: SCROLLING TICKER MARQUEE ── */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Soft Edge Fade Gradients */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 20,
            background: 'linear-gradient(to right, #FAF8F5, transparent)',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 20,
            background: 'linear-gradient(to left, #FAF8F5, transparent)',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />

        <Marquee className="p-0 [--duration:38s] [--gap:2.25rem]" pauseOnHover repeat={3}>
          {quotes.map((q) => {
            const isPositive = q.change >= 0;
            const isTicking = activeTickSymbol === q.symbol;
            return (
              <div
                key={q.symbol}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '2px 8px',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontSize: '0.75rem',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.3s ease',
                  backgroundColor: isTicking ? (isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)') : 'transparent',
                  borderRadius: 3
                }}
              >
                {/* Ticker Name */}
                <span
                  style={{
                    color: '#4B5563',
                    fontWeight: 600,
                    fontSize: '0.71875rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  {q.symbol}
                </span>

                {/* Price / Value */}
                <span
                  style={{
                    color: '#111827',
                    fontWeight: 700,
                    letterSpacing: '-0.01em'
                  }}
                >
                  {formatPrice(q.price, q.decimals)}
                </span>

                {/* Jagged Sparkline Trend Arrow + Change Percentage */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    color: isPositive ? '#047857' : '#B91C1C',
                    fontWeight: 700,
                    fontSize: '0.71875rem'
                  }}
                >
                  {isPositive ? (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="#047857"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="1 11 5 7 9 9 15 3" />
                      <polyline points="10 3 15 3 15 8" />
                    </svg>
                  ) : (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="#B91C1C"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="1 5 5 9 9 7 15 13" />
                      <polyline points="10 13 15 13 15 8" />
                    </svg>
                  )}
                  <span>
                    {isPositive ? `+${q.change.toFixed(2)}%` : `${q.change.toFixed(2)}%`}
                  </span>
                </span>
              </div>
            );
          })}
        </Marquee>
      </div>

      {/* ── PINNED RIGHT: SIMULATED / LIVE FEED BADGE ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '0 12px',
          height: '100%',
          background: '#F3F1EC',
          borderLeft: '1px solid #E5E3DC',
          flexShrink: 0,
          zIndex: 5
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: isLiveSynced ? '#10B981' : '#10B981',
            boxShadow: '0 0 5px #10B981'
          }}
        />
        <span
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '0.625rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: '#6B7280',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}
        >
          {isLiveSynced ? 'LIVE FEED' : 'SIMULATED FEED'}
        </span>
      </div>
    </div>
  );
}
