'use client';

import React, { useState } from 'react';

import Input from '../components/Input';
import Breadcrumb from '../components/Breadcrumb';

export default function DashboardPage() {
  const [val, setValue] = useState('');

  const validate = (value: string) => {
    const onlyNumbers = /^[0-9]*$/;

    if (!onlyNumbers.test(value)) {
      setValue('Validation message.');
    } else {
      setValue('');
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-1 text-primary-light">Dashboard</h1>
      <Breadcrumb />
    </div>
  );
}
