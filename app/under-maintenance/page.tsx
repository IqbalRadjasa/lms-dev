'use client';

import { useRouter } from 'next/navigation';

export default function UnderMaintenance() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#3db9ab] flex items-center justify-center p-8">
      {/* BIG WHITE CONTAINER */}
      <div className="relative bg-white rounded-2xl shadow-xl flex items-center px-10 py-10">
        {/* LEFT IMAGE */}
        <div className="w-1/2 flex justify-center">
          <img src="/maintenance.jpg" alt="Maintenance" className="w-[85%] max-w-lg object-contain" />
        </div>

        {/* RIGHT TEXT */}
        <div className="w-1/2 text-left">
          <h1 className="text-xl font-bold mb-4">Sedang dalam perbaikan...</h1>

          <p className="text-gray-600 text-sm leading-relaxed max-w-md">
            Halaman ini sedang dalam proses pengembangan. <br /> Silakan kunjungi kembali nanti.
          </p>
        </div>

        {/* FLOATING BUTTON (bottom right) */}
        <button onClick={() => router.push('/dashboard')} className="absolute bottom-8 right-8 bg-[#3db9ab] text-sm hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-1">
          <i className="ri-arrow-left-s-line text-lg"></i>
          Kembali
        </button>
      </div>
    </div>
  );
}
