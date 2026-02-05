'use client';

type ToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export default function Toggle({ checked, onChange, disabled = false, className = '' }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex items-center
        w-11 h-6 rounded-full
        transition-colors duration-300
        ${checked ? 'bg-[var(--primary-600)]' : 'bg-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span
        className={`
          absolute left-1
          w-4 h-4 bg-white rounded-full shadow
          transition-transform duration-300
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}
