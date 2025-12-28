'use client';

import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crimson_Text, Dongle } from 'next/font/google';

import { AlertConfirmation } from '../components/AlertConfirmation';

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();

    AlertConfirmation('Kamu yakin ingin logout?', async () => {
      setLoading(true);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Logout failed');
        }

        toast.success('Logout berhasil!', {
          duration: 1500,
          style: {
            background: '#113F67',
            color: '#fff',
          },
        });

        router.push('/login');
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    });
  };

  return <div></div>;
}
