/**
 * tanstack table with serverside pagination.
 *
 */

import React, { useEffect } from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'
import { PAGINATION } from '@/constants/pagination'

type Props = {
    clientSide?: boolean
    totalData: number
    rows: object[]
    columns: {
        header: string | any
        field?: string
        [key: string]: any
    }[]
    filter: any
    setFilter: (any) => void
    [key:string]:any
}

export default function BaseTable({ rows, columns, totalData, filter, setFilter,...rest }: Props) {
    const columnHelper = createColumnHelper()

    let colmns = React.useMemo(() => {
        return columns.map((el) => {
            const { header, field, ...rest } = el
            return columnHelper.accessor(field as any, {
                header: el.header,
                cell: (info) => info.getValue(),
                ...rest,
            })
        })
    }, [])

    const [pagination, setPagination] = React.useState({
        pageIndex: filter.currentPage - 1,
        pageSize: filter.perPage,
    })

    useEffect(() => {
        setFilter((prev) => ({ ...prev, perPage: pagination.pageSize, currentPage: pagination.pageIndex + 1 }))
    }, [pagination])

    const table = useReactTable({
        data: rows,
        columns: colmns,
        rowCount: totalData,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true, // server side pagination
        debugTable: true,
    })

    useEffect(()=>{
        rest.setSelectedTableRows(table.getState().rowSelection)
    },[table.getState().rowSelection])

    return (
        <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-slate-200 text-left dark:bg-meta-4">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-100">
                                {row.getVisibleCells().map((cell) => (
                                    <td className="py-4 px-4 text-black dark:text-white" key={cell.id}>
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

                <div className="flex items-center gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
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
    )
}
