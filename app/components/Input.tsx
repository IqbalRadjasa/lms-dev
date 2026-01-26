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
      <label className={`block mb-1 text-sm text-black font-semibold`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`text-black text-sm h-auto border-[#25a194] w-full px-4 py-2 border rounded-sm focus:outline-none
        focus:ring-2 focus:ring-green-200`}
      />
    </div>
  );
}
