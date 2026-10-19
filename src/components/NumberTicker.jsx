import React, { useEffect, useState } from 'react';

export default function NumberTicker({
  value,
  prefix = '',
  suffix = '',
  duration = 1200
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // If not a pure number, just display as is
    const num = parseFloat(value);
    if (isNaN(num)) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const end = num;
    const isInteger = Number.isInteger(num);
    const steps = 30;
    const stepDuration = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      const current = start + (end - start) * Math.sin((progress * Math.PI) / 2); // easeOutSine

      if (stepCount >= steps) {
        setDisplayValue(isInteger ? end : end.toFixed(1));
        clearInterval(timer);
      } else {
        setDisplayValue(isInteger ? Math.round(current) : current.toFixed(1));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span className="number-ticker tabular-numbers">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
