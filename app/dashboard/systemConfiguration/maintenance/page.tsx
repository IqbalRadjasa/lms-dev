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

type Log = {
  id: number;
  user: string;
  role: string;
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
    header: "Action",
    cell: ({ row }) => (
      <button
        className="text-blue-600 hover:underline"
        onClick={() => alert(row.original.user)}
      >
        View
      </button>
    ),
  },
];

export default function Maintenance() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pesan.length < 5 || kode.length < 5) {
      setPesanError('Pesan harus lebih dari 5 huruf!');
      setKodeError('Kode harus lebih dari 5 huruf!');
      return;
    }

    AlertConfirmation('Apakah kamu yakin?', () => {
      console.log('mode on');
      localStorage.setItem('maintenance', 'true');

      window.location.reload();
    });
  };

  const handleMaintenance = () => {
    if (status) {
      AlertConfirmation('Apakah kamu yakin?', () => {
        localStorage.setItem('maintenance', 'false');
        setStatus(false);
      });
    } else {
      setStatus(true);
      setOpen(true);
    }
  };

  const data: Log[] = [
    {id: 1, user: 'Eman', role: 'Super Admin'},
    {id: 2, user: 'Umar', role: 'Super Admin'},
    {id: 3, user: 'Esty', role: 'Super Admin'}
  ]

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
        <DataTable columns={columns} data={data}/>
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
