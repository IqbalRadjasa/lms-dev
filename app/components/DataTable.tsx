'use client';

import { useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, SortingState, useReactTable } from '@tanstack/react-table';

import Select from './Select';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full overflow-y-auto">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center">
          <div className="relative w-full max-w-sm">
            {/* icon */}
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-primary-light pointer-events-none" />

            {/* input */}
            <input
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="w-full border border-[var(--input-form-light)] rounded-lg pl-10 pr-3 py-2 text-sm text-primary-light focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-secondary-light text-sm">
          <span>Rows per page: </span>

          <Select<number>
            value={table.getState().pagination.pageSize}
            onChange={(size) => table.setPageSize(size)}
            options={[
              { label: '5', value: 5 },
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
            ]}
            className="h-auto w-16"
            forDatatable={true}
          />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sort = header.column.getIsSorted();

                return (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="px-4 py-3 text-left font-semibold cursor-pointer select-none">
                    {flexRender(header.column.columnDef.header, header.getContext())}

                    {sort === 'asc' && <i className="ri-arrow-up-s-fill ml-1" />}
                    {sort === 'desc' && <i className="ri-arrow-down-s-fill ml-1" />}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-between p-3 border-t text-sm">
        {/* left side */}
        {/* <div className="flex items-center gap-2">
          <span>Rows per page</span>

          <select value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))} className="border rounded-md px-2 py-1">
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div> */}

        {/* right side */}
        <div className="flex items-center gap-3">
          <span>
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>

          <div className="flex gap-1">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-2 py-1 border rounded disabled:opacity-40">
              Prev
            </button>

            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-2 py-1 border rounded disabled:opacity-40">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
