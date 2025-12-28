'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Crimson_Text, Dongle } from 'next/font/google';

const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const dongle = Dongle({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export default function Sidebar() {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        bg-[#F3F9FB]
        text-white
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      <div className="flex justify-center items-center p-5" onClick={() => router.push('/dashboard')}>
        <img src="/logo-onedek.png" alt="Logo" className={`w-13 h-auto  ${!collapsed && 'mr-2'}`} />
        {!collapsed && <h1 className={`text-xl ${crimson.className} text-[#113F67]`}>One - LMS</h1>}
      </div>

      {/* Toggle Button */}

      <nav className="flex-1 p-3 space-y-2 text-sm">
        <button onClick={() => setCollapsed((prev) => !prev)} className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 ${crimson.className} text-[#113F67]`}>
          <img src="icons/Sidebar.png" alt="Logo" className="w-5 h-auto" />
          {!collapsed && <span>Sembunyikan</span>}
        </button>

        <button className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 ${crimson.className} text-[#113F67]`} onClick={() => router.push('/dashboard')}>
          <img src="/icons/Home.png" className="w-5 h-auto" />
          {!collapsed && <span>Dashboard</span>}
        </button>
      </nav>
    </aside>
  );
}
