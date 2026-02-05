'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  useEffect(() => {
    if (pathname.startsWith('/dashboard/system')) {
      setOpenMenu('system');
    }
  }, [pathname]);

  const handleToogleSidebar = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
  };

  return (
    <aside
      className={`
        sidebar
        text-white
        transition-all duration-300
        ${sidebarCollapsed ? 'w-17' : 'w-60'}
      `}
      onClick={handleToogleSidebar}
    >
      <div className={`flex justify-center items-center  ${sidebarCollapsed ? 'px-5 py-6' : 'px-5 py-4'}`} onClick={() => router.push('/dashboard')}>
        <a href="">{sidebarCollapsed ? <img src="/logo-minimized.png" alt="Logo" className="w-auto h-auto" /> : <img src="/brand-logo-dev.png" alt="Logo" className="w-auto h-auto mr-2" />}</a>
      </div>

      <nav className="flex-1 p-3 space-y-2 text-sm">
        <button
          className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 ${sidebarCollapsed ? 'active font-semibold' : 'not-active'} `}
          onClick={() => {
            setSidebarCollapsed((prev) => !prev);
          }}
        >
          <i className="ri-layout-left-2-line text-lg"></i>
          {!sidebarCollapsed && <span className="regular-text">Sembunyikan</span>}
        </button>

        <button
          className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 text-[#113F67] ${isActive('/dashboard') ? 'active font-semibold' : 'not-active'}`}
          onClick={() => {
            setOpenMenu(null);
            router.push('/dashboard');
          }}
        >
          <i className="ri-home-4-line text-lg"></i>
          {!sidebarCollapsed && <span className="regular-text">Dashboard</span>}
        </button>

        <button
          className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 text-[#113F67] ${isActive('/dashboard/myComponents') ? 'active font-semibold' : 'not-active'}`}
          onClick={() => {
            setOpenMenu(null);
            router.push('/dashboard/myComponents');
          }}
        >
          <i className="ri-shapes-line text-lg"></i>
          {!sidebarCollapsed && <span className="regular-text">Global UI Components</span>}
        </button>

        <button
          onClick={() => setOpenMenu(openMenu === 'system' ? null : 'system')}
          className={`
            w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 text-[#113F67] ${openMenu === 'system' || pathname.startsWith('/dashboard/system') ? 'active font-semibold' : 'not-active'}
          `}
        >
          <i className="ri-tools-line text-lg"></i>

          {!sidebarCollapsed && (
            <>
              <span className="regular-text flex-1">System Configuration</span>

              {/* arrow */}
              <i className={`ri-arrow-down-s-line transition-transform ${openMenu === 'system' ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>

        {!sidebarCollapsed && openMenu === 'system' && (
          <div className="ml-8 mt-1 space-y-1">
            <button
              className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2  ${isActive('/dashboard/systemConfig/maintenance') ? 'text-[#25a194] font-semibold' : 'text-[var(--text-secondary-light)]'}`}
              onClick={() => router.push('/dashboard/systemConfig/maintenance')}
            >
              <i className="ri-circle-fill text-[0.4rem]"></i>
              {!sidebarCollapsed && <span className="regular-text">Maintenance</span>}
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
}
