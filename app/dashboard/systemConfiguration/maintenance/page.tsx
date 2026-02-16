'use client';

import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import Modal from '../../../components/Modal';
import Toggle from '../../../components/Toggle';
import Input from '@/app/components/Input';
import ButtonPrimary from '@/app/components/ButtonPrimary';
import { AlertConfirmation } from '@/app/components/AlertConfirmation';
import Breadcrumb from '@/app/components/Breadcrumb';
import { DataTable } from '@/app/components/DataTable';
import Dropdown from '@/app/components/Dropdown';
import { useConfirm } from '@/app/components/ConfirmProvider';

type Log = {
  id: number;
  user: string;
  role: string;
  created_at: string;
  status: string;
};

const columns: ColumnDef<Log>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'user',
    header: 'User',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'created_at',
    header: 'Tanggal Ubah',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={`
          px-2.5 py-1 rounded-sm text-xs font-semibold
          ${status == 'ON' ? 'bg-success-100 text-success-600' : 'bg-red-100 text-red-600'}
        `}
        >
          {status == 'ON' ? <i className="ri-lock-line mr-1"></i> : <i className="ri-lock-unlock-line mr-1"></i>}
          {status}
        </span>
      );
    },
  },
  {
    header: 'Aksi',
    cell: ({ row }) => (
      <Dropdown
        items={[
          {
            icon: <i className="ri-user-3-line mr-1"></i>,
            label: 'View',
            onClick: () => alert(`View ${row.original.user}`),
          },
          {
            icon: <i className="ri-edit-2-line mr-1"></i>,
            label: 'Edit',
            onClick: () => alert(`Edit ${row.original.user}`),
          },
          {
            icon: <i className="ri-delete-bin-6-line mr-1"></i>,
            label: 'Delete',
            onClick: () => alert(`Delete ${row.original.user}`),
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

export default function Maintenance() {
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

  const handleMaintenance = async () => {
    if (status) {
      const confirmed = await confirm('Apakah kamu yakin?');

      if (!confirmed) return;

      localStorage.setItem('maintenance', 'false');
      setStatus(false);
    } else {
      setStatus(true);
      setOpen(true);
    }
  };

  const data: Log[] = [
    { id: 1, user: 'Eman', role: 'Super Admin', created_at: '12-02-2026', status: 'ON' },
    { id: 2, user: 'Umar', role: 'Super Admin', created_at: '12-02-2026', status: 'OFF' },
    { id: 3, user: 'Esty', role: 'Super Admin', created_at: '12-02-2026', status: 'ON' },
    { id: 4, user: 'Sintya', role: 'Super Admin', created_at: '12-02-2026', status: 'ON' },
    { id: 5, user: 'Usman', role: 'Super Admin', created_at: '12-02-2026', status: 'OFF' },
    { id: 6, user: 'Rela  ', role: 'Super Admin', created_at: '12-02-2026', status: 'OFF' },
  ];

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-1 text-primary-light">Maintenance</h1>
      <Breadcrumb />

      <div className="card mt-8">
        <div className="flex items-center mb-5">
          <span className="font-base text-primary-light mr-3">Maintenance Mode:</span>
          <Toggle checked={status} onChange={handleMaintenance} />
          <button
            className={`
              ml-2 
              px-3 py-2
              rounded-full
              ${!status ? 'not-active bg-[var(--neutral-200)]' : 'active'}
              flex items-center
            `}
          >
            {!status ? <i className="ri-lock-unlock-line"></i> : <i className="ri-lock-line"></i>}
          </button>
          {/* <button
            className={`
              ml-2 
              font-semibold 
              px-4 py-1
              rounded-full
              ${!status ? 'not-active' : 'active'}
            `}
          >
            {!status ? 'Off' : 'On'}
          </button> */}
        </div>
        <DataTable columns={columns} data={data} />
      </div>

      <Modal open={open} onClose={() => setStatus(false)} title="Maintenance">
        <form onSubmit={handleSubmit}>
          <img src="/maintenance.jpg" className="w-100 h-auto mx-auto mb-3" />

          <Input label="Masukkan pesan" value={pesan} onChange={validatePesan} placeholder="....." required message={pesanError} />

          <Input label="Masukkan kode aktivasi" value={kode} onChange={validateKode} placeholder="....." required message={kodeError} />

          <div className="flex justify-end gap-2 mt-4">
            <ButtonPrimary
              type="button"
              onClick={() => {
                setPesan('');
                setKode('');
                setStatus(false);
                setOpen(false);
              }}
              className="px-4 py-2 rounded text-primary-light text-sm font-semibold bg-[var(--neutral-300)]"
            >
              Batal
            </ButtonPrimary>

            <ButtonPrimary type="submit" className="px-4 py-2 rounded text-white text-sm font-semibold bg-[var(--primary-600)]">
              Kirim
            </ButtonPrimary>
          </div>
        </form>
      </Modal>
    </div>
  );
}
