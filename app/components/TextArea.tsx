type TextareaProps = {
  label: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  onChange: (value: string) => void;
};

export default function Textarea({ label, value, placeholder, rows = 4, onChange }: TextareaProps) {
  return (
    <div className="w-full">
      <label className="block mb-1 text-sm text-black font-semibold">{label}</label>

      <textarea
        rows={rows}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          text-black text-sm h-auto w-full
          px-4 py-2
          mb-4
          border border-[#25a194]
          rounded-sm
          focus:outline-none
          focus:ring-2 focus:ring-green-200
          resize-y
        "
      />
    </div>
  );
}
