'use client';

import React, { useState } from 'react';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/TextArea';
import Dropzone from '../../components/Dropzone';
import Modal from '@/app/components/Modal';
import Breadcrumb from '@/app/components/Breadcrumb';
import Toggle from '@/app/components/Toggle';
import { AlertConfirmation } from '@/app/components/AlertConfirmation';

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
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-1 text-primary-light">Global Components</h1>
      <Breadcrumb />

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
          className="
          h-auto w-full"
        />
        <div className="mb-4"></div>
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

      {/* LOADING SKELETON */}
      <div className="card mt-8">
        <span className="font-semibold text-primary-light">Loading Skeleton</span>
        <hr className="my-3" />

        <div className="w-full max-w-sm rounded-md border border-[var(--primary-600)] p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200"></div>

            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200"></div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>

                <div className="h-2 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="card mt-8">
        <span className="font-semibold text-primary-light">Breadcrumb</span>
        <hr className="my-3" />

        <Breadcrumb />
      </div>

      {/* TOGGLE */}
      <div className="card mt-8">
        <span className="font-semibold text-primary-light">Toggle Button</span>
        <hr className="my-3" />

        <Toggle checked={status} onChange={handleToggle} />
      </div>
    </div>
  );
}
