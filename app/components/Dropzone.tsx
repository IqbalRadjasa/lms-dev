'use client';

import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';

type PreviewFile = File & {
  preview?: string;
};

type Props = {
  label: string;
  onChange?: (files: File[]) => void;
};

export default function Dropzone({ label, onChange }: Props) {
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
      <label className="block mb-1 text-sm text-black font-semibold">{label}</label>
      <div className="space-y-4">
        {/* Drop area */}
        <div
          {...getRootProps()}
          className={`
          border-2 border-dashed border-[#25a194]
          p-6 rounded-sm text-center cursor-pointer
          transition
          ${isDragActive ? 'bg-green-50' : 'bg-white'}
        `}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-600">Drag & drop images or documents here, or click to select</p>
        </div>

        {/* Preview list */}
        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center gap-3 border p-2 rounded-sm">
                {/* Image preview */}
                {file.preview ? <img src={file.preview} alt={file.name} className="h-12 w-12 object-cover rounded" /> : <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded text-gray-500 text-xs">DOC</div>}

                {/* File info */}
                <div className="flex-1">
                  <p className="text-sm text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>

                {/* Remove */}
                <button onClick={() => setFiles(files.filter((_, i) => i !== index))} className="text-xs text-red-500 hover:underline">
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
