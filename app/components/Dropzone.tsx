'use client';

import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';

type PreviewFile = File & {
  preview?: string;
};

type Props = {
  label: string;
  onChange?: (files: File[]) => void;
  disabled?: boolean;
};

export default function Dropzone({ label, onChange, disabled = false }: Props) {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
    },
    onDrop: (acceptedFiles) => {
      const mappedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        })
      );

      setFiles(mappedFiles);
      onChange?.(acceptedFiles);
    },
  });

  // Clean up image previews
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  return (
    <div className="mb-4">
      <label className="block mb-1 text-xs font-semibold text-primary-light ">{label}</label>
      <div className="space-y-4">
        {/* Drop area */}
        <div
          {...getRootProps()}
          className={`
          border-2 border-dashed border-[var(--input-form-light)]
          p-6 rounded-sm text-center 
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          transition
          bg-[var(--white)]
        `}
        >
          <input {...getInputProps()} disabled={disabled} />
          <p className="text-xs text-[var(--text-secondary-light)]">Drag & drop images or documents here, or click to select</p>
        </div>

        {/* Preview list */}
        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center gap-3 border p-2 rounded-sm 
          border-[var(--input-form-light)]"
              >
                {/* Image preview */}
                {file.preview ? <img src={file.preview} alt={file.name} className="h-12 w-12 object-cover rounded" /> : <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded text-[#6c757d] text-xs">DOC</div>}

                {/* File info */}
                <div className="flex-1">
                  <p className="text-xs text-[var(--text-secondary-light)] truncate">{file.name}</p>
                  <p className="text-xs text-[var(--text-secondary-light)]">{(file.size / 1024).toFixed(1)} KB</p>
                </div>

                {/* Remove */}
                <button onClick={() => setFiles(files.filter((_, i) => i !== index))} className="text-xs border border-red-500 rounded px-3 py-2 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
