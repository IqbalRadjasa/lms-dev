'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ConfirmContextType = {
  confirm: (message: string) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = (message: string) => {
    setMessage(message);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    if (resolver) resolver(result);
    setMessage(null);
    setResolver(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {/* Modal */}
      {message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <p className="text-sm mb-4">{message}</p>

            <div className="flex justify-end gap-2">
              <button onClick={() => handleClose(false)} className="px-3 py-1 text-xs font-semibold rounded bg-gray-200 cursor-pointer">
                Tidak
              </button>

              <button onClick={() => handleClose(true)} className="px-3 py-1 text-xs font-semibold rounded bg-teal-600 text-white cursor-pointer">
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within ConfirmProvider');
  }
  return context.confirm;
}
