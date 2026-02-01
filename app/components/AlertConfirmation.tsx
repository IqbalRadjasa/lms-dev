import toast from 'react-hot-toast';

export const AlertConfirmation = (message: string, onConfirm: () => Promise<void> | void) => {
  toast.custom((t) => (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 w-72 border
      ${t.visible ? 'animate-enter' : 'animate-leave'}`}
    >
      <p className={`text-[#113F67] text-sm mb-4`}>{message}</p>

      <div className="flex justify-end gap-2">
        <button onClick={() => toast.remove(t.id)} className={`px-3 py-1 text-gray-800 text-xs font-semibold rounded bg-gray-100 hover:bg-gray-300`}>
          Tidak
        </button>

        <button
          onClick={() => {
            toast.remove(t.id);
            onConfirm();
          }}
          className={`px-3 py-1 text-xs font-semibold rounded bg-red-100 text-red-800 hover:bg-red-300 `}
        >
          Ya
        </button>
      </div>
    </div>
  ));
};
