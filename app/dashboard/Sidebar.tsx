'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const [collapsed, setCollapsed] = useState(false);

  const handleToogleSidebar = () => {
    if (collapsed) {
      setCollapsed(false);
    }
  };

  return (
    <aside
      className={`
        bg-[#FFFFFF]
        text-white
        transition-all duration-300
        ${collapsed ? 'w-17' : 'w-60'}
      `}
      onClick={handleToogleSidebar}
    >
      <div className={`flex justify-center items-center  ${collapsed ? 'px-5 py-6' : 'px-5 py-4'}`} onClick={() => router.push('/dashboard')}>
        <a href="">{collapsed ? <img src="/logo-minimized.png" alt="Logo" className="w-auto h-auto" /> : <img src="/brand-logo-dev.png" alt="Logo" className="w-auto h-auto mr-2" />}</a>
        {/* <img src="/logo-onedek.png" alt="Logo" className={`w-13 h-auto  ${!collapsed && 'mr-2'}`} /> */}
        {/* {!collapsed && <h1 className={`text-xl ${crimson.className} text-[#113F67]`}>One - LMS</h1>} */}
      </div>

      {/* <hr /> */}

      {/* Toggle Button */}

      <nav className="flex-1 p-3 space-y-2 text-sm">
        <button onClick={() => setCollapsed((prev) => !prev)} className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 ${collapsed ? 'active font-semibold' : 'not-active'} `}>
          {/* <svg viewBox="0 0 16 16" className="w-5 h-auto">
            <path fill="currentColor" d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" />
            <path fill="currentColor" d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          </svg> */}
          <i className="ri-layout-left-2-line text-lg"></i>
          {!collapsed && <span>Sembunyikan</span>}
        </button>

        <button className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 text-[#113F67] ${isActive('/dashboard') ? 'active font-semibold' : 'not-active'}`} onClick={() => router.push('/dashboard')}>
          {/* <svg viewBox="0 0 16 16" className="w-5 h-auto">
            <path fill="currentColor" d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793zm1 0V7.5h6.482A7 7 0 0 0 8.5 1.018M14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8" />
          </svg> */}
          <i className="ri-home-4-line text-lg"></i>
          {!collapsed && <span className="">Dashboard</span>}
        </button>
      </nav>
    </aside>
  );
}
