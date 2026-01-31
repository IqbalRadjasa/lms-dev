'use client';

import React, { useState } from 'react';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/TextArea';
import Dropzone from '../../components/Dropzone';

export default function MyComponentsPage() {
  const [val, setValue] = useState('');

  const validate = (value: string) => {
    const onlyNumbers = /^[0-9]*$/;

    if (!onlyNumbers.test(value)) {
      setValue('Validation message.');
    } else {
      setValue('');
    }
  };

  const [option, setOption] = useState('');
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-1">Global UI Components</h1>
      <span className="text-sm text-gray-500">Dashboard / Global UI Components</span>

      <div className="card mt-8">
        <span className="font-semibold">Inputs</span>
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
    </div>
  );
}
