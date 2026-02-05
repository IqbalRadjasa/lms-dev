'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Input from '../components/Input';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateIdentifier = (value: string) => {
    const onlyNumbers = /^[0-9]*$/;

    if (!onlyNumbers.test(value)) {
      setIdError('NISN / NIP harus berisi angka.');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      setIdError('NISN / NIP tidak boleh kosong!');
      setPwError('Password tidak boleh kosong!');
      return;
    }

    if (idError != '' || pwError != '') {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await res.json();

      if (res.status == 401) {
        throw new Error(data.message || 'Login failed');
      }

      if (res.status == 400) {
        throw new Error(data.message || 'Login failed');
      }

      if (res.status == 500) {
        throw new Error(data.message || 'Login failed');
      }

      toast.success('Login berhasil!', {
        duration: 1500,
        style: {
          background: '#113F67',
          color: '#fff',
        },
      });

      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SECTION */}
      <div className="w-full md:w-1/4 bg-white p-10 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="circle bg-[#9ca3af] w-30 h-30 rounded-full"></div>
          {/* <img src="/logo-onedek.png" alt="Logo" className="w-32 h-auto" /> */}
        </div>

        <h1 className={`text-xl text-center font-semibold tracking-wide`} style={{ color: '#0d3c36' }}>
          Selamat Datang di <br /> One - LMS
        </h1>

        <hr className="my-6" style={{ color: 'black', opacity: '20%' }} />

        <h2 className={`text-md mb-4 text-center text-black font-semibold`}>Login</h2>

        {/* Inputs */}
        <div className="space-y-4">
          <Input label="NISN / NIP" value={identifier} onChange={validateIdentifier} placeholder="Masukkan NISN / NIP" />

          {idError && <span className={`text-red-600 text-xs font-semibold block`}>{idError}</span>}

          <Input label="Password" type="password" value={password} onChange={validatePassword} placeholder="Masukkan password" />

          {pwError && <span className={`text-red-600 text-xs font-semibold block`}>{pwError}</span>}

          <button className={`w-full text-xs font-semibold text-white py-2 rounded-lg transition bg-[#25a194] hover:bg-[#1c7f73]`} onClick={handleSubmit}>
            Login
          </button>
        </div>

        <p className={`text-xs text-black text-center mt-4`}>
          Kamu lupa password?{' '}
          <a href="#" className="underline font-semibold" style={{ color: '#25a194' }}>
            Klik disini
          </a>
        </p>

        <footer className="text-xs text-center text-gray-500 mt-10">© 2025 One - LMS DEV. All rights reserved.</footer>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden md:block w-3/4 relative">
        <img src="/dev-wallpaper.jpg" className="absolute inset-0 w-full h-full object-cover opacity-55" />

        {/* <div className="absolute inset-0 opacity-55 backdrop-blur-sm" style={{ backgroundColor: '#226597' }}></div> */}
      </div>
    </div>
  );
}
