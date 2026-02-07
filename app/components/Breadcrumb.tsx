'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  const formatLabel = (text: string) => {
    return text
      .replace(/([A-Z])/g, ' $1') // camelCase → space
      .replace(/-/g, ' ') // kebab → space
      .replace(/^./, (c) => c.toUpperCase())
      .trim();
  };

  return (
    <nav className="flex items-center text-sm text-primary-light">
      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const label = formatLabel(segment);

        return (
          <div key={href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}

            <Link href={href} className={`text-[var(--text-secondary-light)] hover:text-[var(--primary-600)] transition ${index === segments.length - 1 ? 'font-semibold' : ''}`}>
              {label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
