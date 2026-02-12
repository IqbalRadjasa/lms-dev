type Option<T> = {
  label: string;
  value: T;
};

type SelectProps<T> = {
  label?: string;
  value?: T;
  options: Option<T>[];
  placeholder?: string;
  onChange: (value: T) => void;
  className?: string;
};

export default function Select<T extends string | number>({ label, value, options, placeholder = 'Select option', onChange, className }: SelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="block mb-1 text-sm font-semibold text-primary-light">{label}</label>}

      <select
        value={value !== undefined ? String(value) : ''}
        onChange={(e) => {
          const selected = options.find((opt) => String(opt.value) === e.target.value);
          if (selected) onChange(selected.value);
        }}
        className={`
          text-primary-light font-base text-sm 
          bg-[var(--white)]
          px-4 py-2
          border rounded-sm
          border-[var(--input-form-light)]
          focus:outline-none
          focus:ring-0
          focus:border-[#25a194]
          ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
