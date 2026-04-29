'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import React, { useState, useEffect } from 'react';

import Button from '@/app/components/Button';
import Breadcrumb from '@/app/components/Breadcrumb';
import { DataTable } from '@/app/components/DataTable';

type Log = {
  time: Date;
  action: string;
};

const columns: ColumnDef<Log>[] = [
  {
    accessorKey: 'time',
    header: 'Time',

    // ✅ FORMAT DI SINI (UI only)
    cell: ({ row }) => {
      const date = row.getValue('time') as Date;
      return format(date, 'dd-MM-yyyy HH:mm:ss');
    },

    // ✅ FILTER TETAP SAMA (logic kamu sudah benar)
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));

      const { date, time } = value || {};

      // DATE FILTER
      if (date?.from) {
        if (rowDate < new Date(date.from)) return false;
      }

      if (date?.to) {
        if (rowDate > new Date(date.to)) return false;
      }

      // TIME FILTER
      if (time?.from || time?.to) {
        const hours = rowDate.getHours();
        const minutes = rowDate.getMinutes();

        const totalMinutes = hours * 60 + minutes;

        if (time.from) {
          const [h, m] = time.from.split(':').map(Number);
          if (totalMinutes < h * 60 + m) return false;
        }

        if (time.to) {
          const [h, m] = time.to.split(':').map(Number);
          if (totalMinutes > h * 60 + m) return false;
        }
      }

      return true;
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
  },
];

export default function MonitoringAudit() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState({
    time: {
      date: { from: '', to: '' },
      time: { from: '', to: '' },
    },
  });

  const data: Log[] = [
    { time: new Date('2026-05-13T15:51:21'), action: 'Iqbal mengubah mata pelajaran' },
    { time: new Date('2026-05-13T10:20:00'), action: 'Agas mengubah mata pelajaran' },
    { time: new Date('2026-05-12T08:15:00'), action: 'Heri mengubah mata pelajaran' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-xl mb-1 text-primary-light">Monitoring Audit</h1>
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
              setColumnFilters({
                time: filters.time ?? {
                  date: { from: '', to: '' },
                  time: { from: '', to: '' },
                },
              });
            }}
            renderFilters={
              <>
                {/* DATE & TIME FROM */}
                <span className="text-sm">From: </span>
                <input
                  type="date"
                  onChange={(e) =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      time: {
                        ...prev.time,
                        date: {
                          ...prev.time.date,
                          from: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full border border-[var(--input-form-light)] rounded-lg px-3 py-2 text-sm text-primary-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="time"
                  onChange={(e) =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      time: {
                        ...prev.time,
                        time: {
                          ...prev.time.time,
                          from: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full border border-[var(--input-form-light)] rounded-lg px-3 py-2 text-sm text-primary-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* DATE & TIME TO */}
                <span className="text-sm">To: </span>
                <input
                  type="date"
                  onChange={(e) =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      time: {
                        ...prev.time,
                        date: {
                          ...prev.time.date,
                          to: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full border border-[var(--input-form-light)] rounded-lg px-3 py-2 text-sm text-primary-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="time"
                  onChange={(e) =>
                    setColumnFilters((prev) => ({
                      ...prev,
                      time: {
                        ...prev.time,
                        time: {
                          ...prev.time.time,
                          to: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full border border-[var(--input-form-light)] rounded-lg px-3 py-2 text-sm text-primary-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
