'use client';

import { useState } from 'react';

type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  message?: string;
};

export default function Input({ label, type = 'text', value, onChange, placeholder, required = false, message = '' }: InputProps) {
  const [show, setShow] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && show ? 'text' : type;

  return (
    <div className="mb-4">
      {required ? (
        <div className="flex">
          <label className="block mb-1 text-xs font-semibold text-primary-light">{label}</label>
          <i className="ri-asterisk text-[var(--danger-600)] text-[7px]"></i>
        </div>
      ) : (
        <>
          <label className="block mb-1 text-xs font-semibold text-primary-light">{label}</label>
        </>
      )}

      <div className="relative mb-1">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
        w-full
        px-4 py-2 pr-10
        text-xs
        border rounded-sm
        border-[var(--input-form-light)]
        focus:outline-none
        focus:ring-0
        focus:border-[#25a194]
        text-primary-light
      "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="
          absolute right-3 top-1/2 -translate-y-1/2
          text-gray-500 hover:text-[#25a194]
        "
          >
            {show ? <i className="ri-eye-off-line text-lg" /> : <i className="ri-eye-line text-lg" />}
          </button>
        )}
      </div>
      <span className="text-red-600 text-xs font-semibold block">{message}</span>
    </div>
  );
}
