'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Modal from '@/app/components/Modal';
import Input from '@/app/components/Input';
import Toggle from '@/app/components/Toggle';
import Button from '@/app/components/Button';
import Dropdown from '@/app/components/Dropdown';
import Breadcrumb from '@/app/components/Breadcrumb';
import { DataTable } from '@/app/components/DataTable';
import { useConfirm } from '@/app/components/ConfirmProvider';
import { AlertConfirmation } from '@/app/components/AlertConfirmation';

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

    filterFn: (row, id, value) => {
      const rowValue = row.getValue<string>(id) ?? '';
      const search = value?.trim().toLowerCase();

      if (!search) return true;

      return rowValue.toLowerCase().includes(search);
    },
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
  const [columnFilters, setColumnFilters] = useState({
    name: '',
  });

  const renderFilters = (
    <div className="relative w-full max-w-sm">
      {/* icon */}
      <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-primary-light pointer-events-none" />

      {/* input */}
      <input
        value={columnFilters.name || ''}
        onChange={(e) =>
          setColumnFilters((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        placeholder="Cari Nama"
        className="w-full border border-[var(--input-form-light)] rounded-lg pl-10 pr-3 py-2 text-sm text-primary-light focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

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
          <Link href="/dashboard/user-management/tambah">
            <Button primary={true}>+ Tambah User</Button>
          </Link>
        </div>
      </div>

      <div className="card mt-8">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={data}
            columnFilters={columnFilters}
            onColumnFiltersChange={(filters) => {
              setColumnFilters((prev) => ({
                ...prev,
                name: filters.name ?? prev.name ?? '',
              }));
            }}
            renderFilters={renderFilters}
          />
        </div>
      </div>
    </div>
  );
}
