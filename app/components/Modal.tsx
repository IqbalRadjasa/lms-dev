'use client';

import { useEffect } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
  // close with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (open) window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* modal */}
      <div
        className="
          relative z-10
          w-full max-w-lg
          rounded-lg
          background-primary
          p-6
          shadow-xl
          animate-in fade-in zoom-in-95
        "
      >
        {title && <h2 className="text-lg font-semibold mb-4 text-black text-primary-light">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
