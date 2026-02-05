'use client';

import React, { useState } from 'react';

import Toggle from '../../../components/Toggle';

export default function MyComponentsPage() {
  const [status, setStatus] = useState(false);

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-1 text-primary-light">Maintenance</h1>
      <span className="text-sm text-primary-light">Dashboard / System Configuration / Maintenance</span>

      {/* INPUT FIELDS */}
      <div className="card mt-8">
        <div className="flex items-center">
          <span className="font-base text-primary-light mr-3">Maintenance Mode:</span>
          <Toggle checked={status} onChange={setStatus} />
          <span className="font-semibold text-primary-light ml-2">{!status ? 'Off' : 'On'}</span>
        </div>
      </div>
    </div>
  );
}
