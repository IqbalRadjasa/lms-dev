'use client';

type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function Input({ label, type = 'text', value, onChange, placeholder }: InputProps) {
  return (
    <div className="mb-4">
      <label className={`block mb-1 text-sm text-black font-semibold text-primary-light`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          text-primary-light font-base text-sm h-auto w-full
          px-4 py-2
          border rounded-sm
          border-[var(--input-form-light)]
          focus:outline-none
          focus:ring-0
          focus:border-[#25a194]
        "
      />
    </div>
  );
}
