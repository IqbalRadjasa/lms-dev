'use client';

import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import Modal from '@/app/components/Modal';
import Toggle from '@/app/components/Toggle';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import { AlertConfirmation } from '@/app/components/AlertConfirmation';
import Breadcrumb from '@/app/components/Breadcrumb';
import { DataTable } from '@/app/components/DataTable';
import Dropdown from '@/app/components/Dropdown';
import { useConfirm } from '@/app/components/ConfirmProvider';

type Log = {
  id: number;
  name: string;
  identifier: string;
  role: string;
  created_at: string;
  updated_at: string;
};

const columns: ColumnDef<Log>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    accessorKey: 'identifier',
    header: 'NIP/NISN',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'created_at',
    header: 'Dibuat pada',
  },
  {
    accessorKey: 'updated_at',
    header: 'Diubah pada',
  },
  {
    header: 'Aksi',
    cell: ({ row }) => (
      <Dropdown
        items={[
          {
            icon: <i className="ri-user-3-line mr-1"></i>,
            label: 'View',
            onClick: () => alert(`View ${row.original.name}`),
          },
          {
            icon: <i className="ri-edit-2-line mr-1"></i>,
            label: 'Edit',
            onClick: () => alert(`Edit ${row.original.name}`),
          },
          {
            icon: <i className="ri-delete-bin-6-line mr-1"></i>,
            label: 'Delete',
            onClick: () => alert(`Delete ${row.original.name}`),
          },
        ]}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="text-primary-light cursor-pointer">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0" />
        </svg>
      </Dropdown>
    ),
  },
];

export default function UserManagement() {
  const confirm = useConfirm();

  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const [pesan, setPesan] = useState('');
  const [pesanError, setPesanError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('maintenance') === 'true';
    setStatus(saved);
  }, []);

  const validatePesan = (value: string) => {
    if (value.length < 5) {
      setPesanError('Pesan harus lebih dari 5 huruf!');
    } else {
      setPesanError('');
    }

    setPesan(value);
  };

  const [kode, setKode] = useState('');
  const [kodeError, setKodeError] = useState('');

  const validateKode = (value: string) => {
    if (value.length < 5) {
      setKodeError('Kode harus lebih dari 5 huruf!');
    } else {
      setKodeError('');
    }

    setKode(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pesan.length < 5 || kode.length < 5) {
      setPesanError('Pesan harus lebih dari 5 huruf!');
      setKodeError('Kode harus lebih dari 5 huruf!');
      return;
    }

    const confirmed = await confirm('Apakah kamu yakin?');

    if (!confirmed) return;
    console.log('mode on');
    localStorage.setItem('maintenance', 'true');
    window.location.reload();
  };

  const data: Log[] = [
    { id: 1, name: 'Eman', identifier: '123456789', role: 'Super Admin', created_at: '12-12-2025', updated_at: '12-12-2025' },
    { id: 2, name: 'Pacul', identifier: '123456789', role: 'Siswa', created_at: '12-12-2025', updated_at: '12-12-2025' },
    { id: 3, name: 'Rolan', identifier: '123456789', role: 'Siswa', created_at: '12-12-2025', updated_at: '12-12-2025' },
    { id: 4, name: 'Anton', identifier: '123456789', role: 'Admin', created_at: '12-12-2025', updated_at: '12-12-2025' },
    { id: 5, name: 'Kucing', identifier: '123456789', role: 'Siswa', created_at: '12-12-2025', updated_at: '12-12-2025' },
    { id: 5, name: 'Tapir', identifier: '123456789', role: 'Siswa', created_at: '12-12-2025', updated_at: '12-12-2025' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-xl mb-1 text-primary-light">User Management</h1>
          <Breadcrumb />
        </div>
        <div>
          <Button primary={true}>+ Tambah User</Button>
        </div>
      </div>

      <div className="card mt-8">
        <DataTable columns={columns} data={data} />
      </div>

      <Modal open={open} onClose={() => setStatus(false)} title="Maintenance">
        <form onSubmit={handleSubmit}>
          <img src="/maintenance.jpg" className="w-100 h-auto mx-auto mb-3" />

          <Input label="Masukkan pesan" value={pesan} onChange={validatePesan} placeholder="....." required message={pesanError} />

          <Input label="Masukkan kode aktivasi" value={kode} onChange={validateKode} placeholder="....." required message={kodeError} />

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              onClick={() => {
                setPesan('');
                setKode('');
                setStatus(false);
                setOpen(false);
              }}
            >
              Batal
            </Button>

            <Button primary={true} type="submit">
              Kirim
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
