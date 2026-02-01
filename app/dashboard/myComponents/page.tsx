'use client';

import React, { useState } from 'react';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/TextArea';
import Dropzone from '../../components/Dropzone';
import Modal from '@/app/components/Modal';

export default function MyComponentsPage() {
  const [val, setValue] = useState('');

  const validate = (value: string) => {
    if (!value) {
      setValue('Validation message.');
    }

    setValue(value);
  };

  const [option, setOption] = useState('');
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-1 text-primary-light">Global UI Components</h1>
      <span className="text-sm text-primary-light">Dashboard / Global UI Components</span>

      {/* INPUT FIELDS */}
      <div className="card mt-8">
        <span className="font-semibold text-primary-light">Inputs</span>
        <hr className="my-3" />

        <Input label="Label" value={val} onChange={validate} placeholder="Placeholder" />

        <Select
          label="Label"
          placeholder="Placeholder"
          value={option}
          onChange={setOption}
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Viewer', value: 'viewer' },
          ]}
        />

        <Textarea label="Description" placeholder="Write something..." value={desc} onChange={setDesc} rows={5} />

        <Dropzone label="Label" onChange={setFiles} />
      </div>

      {/* MODAL */}
      <div className="card mt-8">
        <span className="font-semibold text-primary-light">Modal</span>
        <hr className="my-3" />

        <button onClick={() => setOpen(true)} className="px-4 py-2 bg-[var(--primary-600)] text-white text-sm font-semibold rounded">
          Open Modal
        </button>

        <Modal open={open} onClose={() => setOpen(false)} title="Title">
          <p className="text-sm mb-4 text-primary-light">Put your form here</p>

          <button onClick={() => setOpen(false)} className="px-4 py-2 rounded text-primary-light font-semibold" style={{ backgroundColor: 'var(--neutral-300)' }}>
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
}
