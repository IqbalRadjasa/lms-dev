'use client';

import Link from 'next/link';
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
          className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer ${sidebarCollapsed ? 'active font-semibold' : 'not-active'} `}
          onClick={() => {
            setSidebarCollapsed((prev) => !prev);
          }}
        >
          <i className="ri-layout-left-2-line text-lg"></i>
          {!sidebarCollapsed && <span className="regular-text">Sembunyikan</span>}
        </button>

        <Link href="/dashboard">
          <button
            className={`w-full mb-2 text-left text-base px-3 py-2 rounded-md flex items-center gap-2 text-[#113F67] cursor-pointer ${isActive('/dashboard') ? 'active' : 'not-active'}`}
            onClick={() => {
              setOpenMenu(null);
            }}
          >
            <i className="ri-home-4-line text-lg"></i>
            {!sidebarCollapsed && <span className="regular-text">Dashboard</span>}
          </button>
        </Link>

        <Link href="/dashboard/global-components">
          <button
            className={`w-full mb-2 text-left text-base px-3 py-2 rounded-md flex items-center gap-2 text-[#113F67] cursor-pointer ${isActive('/dashboard/global-components') ? 'active' : 'not-active'}`}
            onClick={() => {
              setOpenMenu(null);
            }}
          >
            <i className="ri-shapes-line text-lg"></i>
            {!sidebarCollapsed && <span className="regular-text">Global Components</span>}
          </button>
        </Link>

        <button
          onClick={() => setOpenMenu(openMenu === 'system' ? null : 'system')}
          className={`
            w-full mb-2 text-left text-base px-3 py-2 rounded-md flex items-center gap-2 text-[#113F67] cursor-pointer ${openMenu === 'system' || pathname.startsWith('/dashboard/system') ? 'active' : 'not-active'}
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
          <div className="ml-8 mt-1 space-y-1 sidebar-submen">
            <Link href="/dashboard/system-configuration/global-settings">
              <button
                className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer ${
                  isActive('/dashboard/system-configuration/global-settings') ? 'text-[#25a194] font-semibold' : 'text-[var(--text-secondary-light)]'
                }`}
              >
                <i className="ri-circle-fill text-[0.4rem]"></i>
                {!sidebarCollapsed && <span className="regular-text">Global Settings</span>}
              </button>
            </Link>

            <Link href="/dashboard/system-configuration/maintenance">
              <button
                className={`w-full text-left text-base px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer ${
                  isActive('/dashboard/system-configuration/maintenance') ? 'text-[#25a194] font-semibold' : 'text-[var(--text-secondary-light)]'
                }`}
              >
                <i className="ri-circle-fill text-[0.4rem]"></i>
                {!sidebarCollapsed && <span className="regular-text">Maintenance</span>}
              </button>
            </Link>
          </div>
        )}

        <Link href="/dashboard/user-management">
          <button className={`w-full mb-2 text-left text-base px-3 py-2 rounded-md flex items-center gap-2 text-[#113F67] cursor-pointer ${isActive('/dashboard/user-management') || pathname.startsWith('/dashboard/user-management') ? 'active' : 'not-active'}`}>
            <i className="ri-user-line text-lg"></i>
            {!sidebarCollapsed && <span className="regular-text">User Management</span>}
          </button>
        </Link>
      </nav>
    </aside>
  );
}
