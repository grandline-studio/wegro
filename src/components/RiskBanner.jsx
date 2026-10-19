import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { companyConfig } from '../data/companyConfig';

export default function RiskBanner() {
  return (
    <div className="risk-warning-bar" role="region" aria-label="Statutory Market Risk Warning">
      <div className="container">
        <div className="risk-warning-inner">
          <AlertTriangle size={16} className="risk-warning-icon" aria-hidden="true" />
          <p>
            <strong style={{ color: '#cbd5e1' }}>Regulatory Risk Disclosure: </strong>
            {companyConfig.riskDisclosure}
          </p>
        </div>
      </div>
    </div>
  );
}
