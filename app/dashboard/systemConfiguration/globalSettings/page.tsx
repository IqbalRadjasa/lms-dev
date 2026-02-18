'use client';

import { useState } from 'react';

import Breadcrumb from '@/app/components/Breadcrumb';
import Input from '@/app/components/Input';
import Select from '@/app/components/Select';
import Dropzone from '@/app/components/Dropzone';
import Button from '@/app/components/Button';

export default function globalSettings() {
  const [namaSekolah, setNamaSekolah] = useState('');
  const [tahunAkademik, setTahunAkademik] = useState(0);
  const [semester, setSemester] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [edit, setEdit] = useState(false);

  const [namaSekolahError, setNamaSekolahError] = useState('');

  const validateNamaSekolah = (value: string) => {
    if (!value) {
      setNamaSekolahError('Nama sekolah tidak boleh kosong!');
    } else {
      setNamaSekolah('');
    }

    setNamaSekolah(value);
  };

  const handleCancel = () => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-1 text-primary-light">Global Settings</h1>
      <Breadcrumb />

      <div className="card mt-8">
        <form action="">
          <div className="flex gap-2">
            <div className="w-2/6">
              <Input label="Nama Sekolah" value={namaSekolah} onChange={validateNamaSekolah} placeholder="....." required message={namaSekolahError} disabled={edit ? false : true} />
            </div>
            <div className="w-2/6">
              <Select<number>
                label="Tahun Akademik"
                className="h-auto w-full"
                value={tahunAkademik}
                onChange={setTahunAkademik}
                disabled={edit ? false : true}
                options={[
                  { label: '2025/2026', value: 1 },
                  { label: '2024/2025', value: 2 },
                  { label: '2023/2024', value: 3 },
                ]}
              />
            </div>
            <div className="w-2/6">
              <Select<number>
                label="Semester"
                className="h-auto w-full"
                value={tahunAkademik}
                onChange={setTahunAkademik}
                disabled={edit ? false : true}
                options={[
                  { label: '1 (Satu)', value: 1 },
                  { label: '2 (Dua)', value: 2 },
                  { label: '3 (Tiga)', value: 3 },
                ]}
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-4/6">
              <Dropzone label="Logo Sekolah" onChange={setFiles} disabled={edit ? false : true} />
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Button onClick={handleCancel} type="button">
              {edit ? 'Batal' : 'Edit'}
            </Button>

            <Button primary={true} type="submit" disabled={edit ? false : true}>
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
