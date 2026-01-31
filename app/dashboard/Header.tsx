'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Crimson_Text, Dongle } from 'next/font/google';

import { AlertConfirmation } from '../components/AlertConfirmation';
import ThemeToggle from '../components/ThemeToggle';

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
    <header className="header h-18 flex items-center justify-between px-4">
      <div className="ml-auto flex relative h-full cursor-pointer" ref={dropdownRef}>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
        <div onClick={() => setOpen(!open)} className="flex items-center border-l-2 border-[#d1d5db] text-[var(--text-secondary-light)] pl-3 ml-4">
          <img src="/profil-dev.jpeg" className="w-8 h-auto rounded-full mr-2" />
          <span className="regular-text uppercase mr-2">Muhammad Iqbal Radjasa</span>
          <svg className={`w-4 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
            <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Button */}
        {/* <button onClick={() => setOpen(!open)} className="flex items-center px-3 py-1.5 rounded-full bg-white border-2 border-[#113F67] border not-active ml-16">
          <img src="/profil-dev.jpeg" className="w-8 h-auto rounded-full mr-2" />
          <span className="uppercase">Muhammad Iqbal Radjasa</span>
          <span>{user ?? 'User'}</span>
          <svg className={`w-4 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
            <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="2" fill="#113F67" />
          </svg>
        </button> */}

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-18 w-40 bg-[var(--white)] rounded-md shadow-lg p-2 aniamte-in fade-in slide-in-from-top-1">
            <button className={`w-full px-3 py-2 text-left rounded hover:bg-[#6c757d]/10 transition text-[#113F67]`}>
              <span className="regular-text text-[var(--text-secondary-light)]">Profil Saya</span>
            </button>

            <hr className="my-1" />
            <button className={`w-full px-3 py-2 text-base text-left text-red-600 rounded hover:bg-red-50 transition`} onClick={handleLogout}>
              <span className="regular-text">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
