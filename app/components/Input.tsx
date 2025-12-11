'use client';

import { Crimson_Text, Dongle } from 'next/font/google';

type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};


const dongle = Dongle({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export default function Input({ label, type = 'text', value, onChange, placeholder }: InputProps) {
  return (
    <div className="mb-4">
      <label className={`block mb-1 text-2xl text-black ${dongle.className}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`text-black text-2xl h-12 border-[#87C0CD] w-full px-4 py-2 border rounded-sm focus:outline-none
        focus:ring-2 focus:ring-blue-200 ${dongle.className}`}
      />
    </div>
  );
}
