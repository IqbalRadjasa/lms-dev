'use client';

import React, { useState, useRef, useEffect } from 'react';

type DropdownItem = {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
};

type Props = {
  items: DropdownItem[];
  children: React.ReactNode;
};

export default function Dropdown({ items, children }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      {/* trigger */}
      <button onClick={() => setOpen(!open)}>{children}</button>

      {/* menu */}
      {open && (
        <div className="dropdown-menu absolute right-0 mt-2 w-32 z-50 text-xs">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={`w-full text-left text-secondary-light px-3 py-2 bg-hover-neutral-200 rounded text-hover-neutral-900 ${item.danger ? 'text-red-600' : ''}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
