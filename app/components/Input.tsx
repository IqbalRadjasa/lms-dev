'use client';

type InputProps = {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function Input({label, type = 'text', value, onChange, placeholder}: InputProps){
    return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none
        focus:ring-2 focus:ring-blue-300"
      />
    </div>
    );
}