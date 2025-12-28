'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Crimson_Text, Dongle } from 'next/font/google';

import { AlertConfirmation } from '../components/AlertConfirmation';

const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function Header({ user }: { user?: string }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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

  return (
    <header className="h-23 border-b bg-[#F3F9FB] flex items-center justify-between px-4">
      <div className="ml-auto flex relative" ref={dropdownRef}>
        <div className={`text-base ${crimson.className} text-[#113F67] flex items-center gap-1`}>
          <span>Halo,</span>
          <span className="font-bold">{user ?? 'User'}</span>
        </div>

        {/* Button */}
        <button onClick={() => setOpen(!open)} className="flex items-center px-3 py-1.5 rounded-full bg-white border-2 border-[#113F67] border hover:bg-[#113F67]/10 transition ml-16">
          <img src="/icons/person.svg" />

          <svg className={`w-4 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
            <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="2" fill="#113F67" />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg p-2 animate-in fade-in slide-in-from-top-1">
            <button className={`w-full px-3 py-2 text-base text-left rounded hover:bg-[#113F67]/10 transition ${crimson.className} text-[#113F67]`}>Profil Saya</button>

            <hr className="my-1" />
            <button className={`w-full px-3 py-2 text-base text-left text-red-600 rounded hover:bg-red-50 transition ${crimson.className}`} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
