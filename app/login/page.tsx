'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Crimson_Text, Dongle } from 'next/font/google';

import Input from '../components/Input';

const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const dongle = Dongle({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');

  const validateIdentifier = (value: string) => {
    const onlyNumbers = /^[0-9]*$/;

    if (!onlyNumbers.test(value)) {
      setIdError('NISN / NIP must contain numbers only.');
    } else {
      setIdError('');
    }

    setIdentifier(value);
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      setPwError('Password harus lebih dari 8 karakter');
    } else {
      setPwError('');
    }

    setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      setIdError('NISN / NIP tidak boleh kosong!');
      setPwError('Password tidak boleh kosong!');
      return;
    }

    if (idError == '' && pwError == '') {
      toast.success('Login berhasil!', {
        duration: 2000,
        style: {
          background: '#113F67',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SECTION */}
      <div className="w-full md:w-1/4 bg-white p-10 flex flex-col justify-center" style={{ backgroundColor: '#F3F9FB' }}>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo-onedek.png" alt="Logo" className="w-32 h-auto" />
        </div>

        <h1 className={`text-3xl text-center ${crimson.className}`} style={{ color: '#113F67' }}>
          Selamat Datang di <br /> One - LMS
        </h1>

        <hr className="my-6" style={{ color: 'black', opacity: '20%' }} />

        <h2 className={`text-2xl mb-4 text-center text-black ${crimson.className}`}>Login</h2>

        {/* Inputs */}
        <div className="space-y-4">
          <Input label="NISN / NIP" value={identifier} onChange={validateIdentifier} placeholder="Masukkan NISN / NIP" />

          {idError && <span className={`text-red-600 text-2xl block ${dongle.className}`}>{idError}</span>}

          <Input label="Password" type="password" value={password} onChange={validatePassword} placeholder="Masukkan password" />

          {pwError && <span className={`text-red-600 text-2xl block ${dongle.className}`}>{pwError}</span>}

          <button
            className={`
                            w-full text-2xl text-white py-2 rounded-lg transition 
                            bg-[#226597] hover:bg-sky-900
                            ${dongle.className}
                        `}
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>

        <p className={`text-xl text-black text-center mt-4 ${dongle.className}`}>
          Kamu lupa password?{' '}
          <a href="#" className="underline" style={{ color: '#226597' }}>
            Klik disini
          </a>
        </p>

        <footer className="text-xs text-center text-gray-500 mt-10">© 2025 SMKN 1 Depok. All rights reserved.</footer>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden md:block w-3/4 relative">
        <img src="/onedek.jpg" className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute inset-0 opacity-55 backdrop-blur-sm" style={{ backgroundColor: '#226597' }}></div>
      </div>
    </div>
  );
}
