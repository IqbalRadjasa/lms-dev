import toast from 'react-hot-toast';

export const AlertConfirmation = (message: string, onConfirm: () => Promise<void> | void) => {
  toast.custom((t) => (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 w-72 border
      ${t.visible ? 'animate-enter' : 'animate-leave'}`}
    >
      <p className="text-gray-800 text-sm mb-4">{message}</p>

      <div className="flex justify-end gap-2">
        <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300">
          Cancel
        </button>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
        >
          Yes
        </button>
      </div>
    </div>
  ));
};
