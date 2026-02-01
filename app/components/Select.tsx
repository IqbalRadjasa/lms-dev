type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  label?: string;
  value?: string | number;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function Select({ label, value, options, placeholder = 'Select option', onChange }: SelectProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className={`block mb-1 text-sm text-black font-semibold text-primary-light`}>{label}</label>

      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="
          text-primary-light font-base text-sm h-auto w-full
          bg-[var(--white)]
          px-4 py-2
          border rounded-sm
          border-[var(--input-form-light)]
          focus:outline-none
          focus:ring-0
          focus:border-[#25a194]
        "
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
