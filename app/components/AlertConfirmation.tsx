import toast from 'react-hot-toast';
import { Crimson_Text, Dongle } from 'next/font/google';

const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const dongle = Dongle({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const AlertConfirmation = (message: string, onConfirm: () => Promise<void> | void) => {
  toast.custom((t) => (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 w-72 border
      ${t.visible ? 'animate-enter' : 'animate-leave'}`}
    >
      <p className={`text-[#113F67] text-base mb-4 ${crimson.className}`}>{message}</p>

      <div className="flex justify-end gap-2">
        <button onClick={() => toast.remove(t.id)} className={`px-3 py-1 text-gray-800 text-sm rounded bg-gray-100 hover:bg-gray-300 ${crimson.className}`}>
          Tidak
        </button>

        <button
          onClick={() => {
            toast.remove(t.id);
            onConfirm();
          }}
          className={`px-3 py-1 text-sm rounded bg-red-100 text-red-800 hover:bg-red-300 ${crimson.className} `}
        >
          Ya
        </button>
      </div>
    </div>
  ));
};
