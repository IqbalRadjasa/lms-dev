'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const [collapsed, setCollapsed] = useState(false);

  const handleToogleSidebar = () => {
    if (collapsed) {
      setCollapsed(false);
    }
  }

  return (
    <aside
      className={`
        bg-[#F3F9FB]
        text-white
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-60'}
      `}
      onClick={handleToogleSidebar}
    >
      <div className="flex justify-center items-center p-5" onClick={() => router.push('/dashboard')}>
        <img src="/logo-onedek.png" alt="Logo" className={`w-13 h-auto  ${!collapsed && 'mr-2'}`} />
        {!collapsed && <h1 className={`text-xl ${crimson.className} text-[#113F67]`}>One - LMS</h1>}
      </div>

      {/* Toggle Button */}

      <nav className="flex-1 p-3 space-y-2 text-sm">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 ${crimson.className} ${collapsed ? 'bg-[#226597] text-white font-semibold' : 'text-[#113F67] hover:bg-[#113F67]/10 transition'} `}
        >
          <svg viewBox="0 0 16 16" className="w-5 h-auto">
            <path fill="currentColor" d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" />
            <path fill="currentColor" d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          </svg>
          {!collapsed && <span>Sembunyikan</span>}
        </button>

        <button
          className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 ${crimson.className} text-[#113F67] ${
            isActive('/dashboard') ? 'bg-[#226597] text-white font-semibold' : 'text-[#113F67] hover:bg-[#113F67]/10 transition'
          }`}
          onClick={() => router.push('/dashboard')}
        >
          {/* <img src="/icons/pie-chart.svg" /> */}
          <svg viewBox="0 0 16 16" className="w-5 h-auto">
            <path fill="currentColor" d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793zm1 0V7.5h6.482A7 7 0 0 0 8.5 1.018M14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8" />
          </svg>
          {!collapsed && <span>Dashboard</span>}
        </button>
      </nav>
    </aside>
  );
}
