import React, { useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { PAGINATION } from '@/constants/pagination'
import { BiSort } from 'react-icons/bi'
import { ActionIcon, Button, Input, Menu, Select } from '@mantine/core'
import { FaSearch } from 'react-icons/fa'

type Props = {
    clientSide?: boolean
    totalData: number
    rows: object[]
    columns: {
        header: string
        field?: string
        [key: string]: any
    }[]
}

export default function BaseTableUser({ rows, columns, totalData }: Props) {
    const columnHelper = createColumnHelper()

    let colmns = React.useMemo(() => {
        return columns.map((el) => {
            const { header, field, ...rest } = el
            return columnHelper.accessor(field as any, {
                header: el.header,
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
                enableSorting: false,
                ...rest,
            })
        })
    }, [])

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: PAGINATION.PER_PAGE,
    })

    const [searchText, setsearchText] = useState('')

    const table = useReactTable({
        data: rows,
        columns: colmns,
        rowCount: totalData,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination,
            // columnFilters,
            globalFilter: searchText, // filters for all fields
        },
    })

    function Filter({ column, table }) {
        const columnFilterValue = column.getFilterValue()
        return (
            <input
                className="w-36 border shadow rounded"
                onChange={(e) => column.setFilterValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder={`Search...`}
                type="text"
                value={(columnFilterValue ?? '') as string}
            />
        )
    }

    return (
        <div>
            <div className="flex gap-2 mb-4">
                <Input
                    leftSection={<FaSearch size={16} />}
                    placeholder="Search"
                    type="text"
                    value={searchText}
                    onChange={(e) => {
                        setsearchText(e.target.value)
                    }}
                />
            </div>
            <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className="bg-gray-300 text-white text-left ">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                className="min-w-[50px] py-4 px-4 font-medium text-black"
                                            >
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    <div className="flex items-center">
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {header.column.getCanSort() && <BiSort />}
                                                        {{
                                                            asc: ' 🔼',
                                                            desc: ' 🔽',
                                                        }[header.column.getIsSorted() as string] ?? null}
                                                    </div>
                                                    {header.column.getCanFilter() ? (
                                                        <div>
                                                            <Filter column={header.column} table={table} />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-100">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="py-4 px-4 text-black">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            {table.getFooterGroups().map((footerGroup) => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.headers.map((header) => (
                                        <th key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.footer, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>
                    </table>
                    <div className="py-4 flex justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <ActionIcon
                                className="border rounded p-1"
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<<'}
                            </ActionIcon>
                            <ActionIcon
                                className="border rounded p-1"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<'}
                            </ActionIcon>
                            <ActionIcon
                                className="border rounded p-1"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>'}
                            </ActionIcon>
                            <ActionIcon
                                className="border rounded p-1"
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>>'}
                            </ActionIcon>
                            <span className="flex items-center gap-1">
                                <div>Page</div>
                                <strong>
                                    {table.getState().pagination.pageIndex + 1} of{' '}
                                    {table.getPageCount().toLocaleString()}
                                </strong>
                            </span>
                            <span className="flex items-center gap-1">
                                | Go to page:
                                <input
                                    type="number"
                                    min="1"
                                    max={table.getPageCount()}
                                    defaultValue={table.getState().pagination.pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                                        table.setPageIndex(page)
                                    }}
                                    className="border p-1 rounded w-16"
                                />
                            </span>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value))
                                }}
                            >
                                {[PAGINATION.PER_PAGE, 10, 20, 30, 40, 50, 100]
                                    .sort((a, b) => a - b)
                                    .map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            Showing {table.getRowModel().rows.length.toLocaleString()} of {totalData} entries
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
