'use client';

import { useState, useMemo } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, SortingState, useReactTable } from '@tanstack/react-table';

import Select from './Select';

type ColumnFiltersState = Record<string, any>;

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;

  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: (filters: ColumnFiltersState) => void;

  renderFilters?: React.ReactNode;
};

export function DataTable<TData, TValue>({ columns, data, globalFilter, onGlobalFilterChange, columnFilters, onColumnFiltersChange, renderFilters }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnFiltersArray = useMemo(() => {
    return Object.entries(columnFilters).map(([id, value]) => ({
      id,
      value,
    }));
  }, [columnFilters]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters: columnFiltersArray,
    },

    onSortingChange: setSorting,

    onGlobalFilterChange: (value) => {
      if (value !== globalFilter) {
        onGlobalFilterChange?.(value);
      }
    },

    onColumnFiltersChange: (updater) => {
      const next = typeof updater === 'function' ? updater(table.getState().columnFilters) : updater;

      const obj = Object.fromEntries(next.map((item: any) => [item.id, item.value]));

      onColumnFiltersChange(obj);
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const total = table.getFilteredRowModel().rows.length;

  const start = total === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);
  const pageCount = table.getPageCount();

  return (
    <div className="w-full overflow-y-auto">
      {/* FILTER AREA */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">{renderFilters}</div>

        <div className="flex items-center gap-2 text-sm">
          <span>Rows per page:</span>
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
            forDatatable
          />
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm bordered-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sort = header.column.getIsSorted();

                return (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="px-4 py-3 text-left font-semibold cursor-pointer">
                    {flexRender(header.column.columnDef.header, header.getContext())}

                    {sort === 'asc' && ' ↑'}
                    {sort === 'desc' && ' ↓'}
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
      <div className="flex items-center justify-between p-3 text-sm">
        {/* left side */}
        <div className="flex items-center gap-6 text-secondary-light text-xs">
          <span>
            Showing <b>{start}</b> to <b>{end}</b> of <b>{total}</b> entries
          </span>
        </div>

        {/* right side */}
        <div className="flex items-center gap-1">
          {/* FIRST */}
          <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="text-primary-light px-2 py-1 rounded disabled:opacity-40">
            <i className="ri-arrow-left-double-fill"></i>
          </button>

          {/* PREV */}
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="text-primary-light px-2 py-1 rounded disabled:opacity-40">
            <i className="ri-arrow-left-s-line" />
          </button>

          {/* PAGE NUMBERS */}
          {Array.from({ length: pageCount })
            .filter((_, i) => Math.abs(i - pageIndex) <= 2)
            .map((_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`
                  min-w-[30px] h-7 rounded text-sm
                  ${pageIndex === i ? 'bg-[var(--primary-600)] text-white' : 'bg-[var(--neutral-200)] hover:bg-gray-200 text-secondary-light transition'}
                `}
              >
                {i + 1}
              </button>
            ))}

          {/* NEXT */}
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="text-primary-light px-2 py-1 rounded disabled:opacity-40">
            <i className="ri-arrow-right-s-line" />
          </button>

          {/* LAST */}
          <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()} className="text-primary-light px-2 py-1 rounded  disabled:opacity-40">
            <i className="ri-arrow-right-double-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
