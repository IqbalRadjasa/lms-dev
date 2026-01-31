'use client';

import React, { useState } from 'react';

import Input from '../components/Input';

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

  return <div></div>;
}
