import toast from 'react-hot-toast';

const CONFIRM_TOAST_ID = 'alert-confirmation';

export const AlertConfirmation = (message: string, onConfirm: () => Promise<void> | void) => {
  toast.custom(
    (t) => (
      <div
        className={`bg-[var(--white)] shadow-lg rounded-lg p-4 w-72 border border-[var(--border-color)]
        ${t.visible ? 'animate-enter' : 'animate-leave'}`}
      >
        <p className="text-primary-light text-sm mb-4">{message}</p>

        <div className="flex justify-end gap-2">
          <button onClick={() => toast.dismiss(CONFIRM_TOAST_ID)} className="px-3 py-1 text-gray-800 text-xs font-semibold rounded bg-gray-100 hover:bg-gray-300 transition">
            Tidak
          </button>

          <button
            onClick={async () => {
              toast.dismiss(CONFIRM_TOAST_ID);
              await onConfirm();
            }}
            className="px-3 py-1 text-xs font-semibold rounded bg-[var(--primary-600)] text-white hover:bg-[var(--primary-400)] transition"
          >
            Ya
          </button>
        </div>
      </div>
    ),
    {
      id: CONFIRM_TOAST_ID, // ⭐ THIS prevents duplicates
    }
  );
};
