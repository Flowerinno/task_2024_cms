'use client'

import * as React from 'react'
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

type User = {
  id: string
  email: string
  role: string
  is_blocked: boolean
  is_deleted: boolean
}

export const columns: ColumnDef<User>[] = [
  {
    accessorFn: (row) => row.role,
    accessorKey: 'role',
    header: () => <div className='text-left'>Role</div>,
    cell: ({ row }) => {
      return <div className='text-left font-medium'>{row.getValue('role')}</div>
    },
  },
  {
    accessorFn: (row) => row.email,
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
  },
  {
    accessorFn: (row) => row.id,
    accessorKey: 'id',
    header: () => <div className='text-right'>User ID</div>,
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{row.getValue('id')}</div>
    },
  },
  {
    accessorFn: (row) => row.is_blocked,
    accessorKey: 'is_blocked',
    header: () => <div className='text-right'>Block status</div>,
    cell: ({ row }) => {
      return (
        <div
          className='text-right font-medium'
          style={{
            color: row.original.is_blocked ? 'red' : 'black',
          }}
        >
          {row.original.is_blocked ? 'Blocked' : 'Not blocked'}
        </div>
      )
    },
  },
  {
    accessorFn: (row) => row.is_deleted,
    accessorKey: 'is_deleted',
    header: () => <div className='text-right'>Delete status</div>,
    cell: ({ row }) => {
      return (
        <div
          className='text-right font-medium'
          style={{
            color: row.original.is_deleted ? 'red' : 'black',
          }}
        >
          {row.getValue('is_deleted') ? 'Deleted' : 'Not deleted'}
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.email)}>
              Copy user email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy user id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => (window.location.pathname = '/dashboard/users/edit/' + user.id)}
            >
              Edit user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function UsersTable({
  users,
  page,
  email,
  maxPage,
}: {
  users: User[]
  page: number
  email: string
  maxPage: number
}) {
  const [emailFilter, setEmailFilter] = React.useState(email ?? '')
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    pageCount: maxPage,
  })

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <form method='GET' className='w-6/12 flex flex-row gap-2'>
          <Input
            placeholder='Filter by email...'
            name='email'
            value={emailFilter}
            onChange={(event) => setEmailFilter(event.target.value)}
            className='max-w-sm'
          />
          <Button className='h-10' type='submit' variant='outline' size='sm'>
            Search
          </Button>
          <Button
            onClick={() => setEmailFilter('')}
            className='h-10'
            type='submit'
            variant='outline'
            size='sm'
          >
            Reset
          </Button>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-4 py-4'>
        <Link
          aria-label='Previous page'
          href={`/dashboard/users?page=${page - 1 > 0 ? page - 1 : 1}`}
          className='border-[1px] border-gray-400 p-1 rounded-md min-w-[100px] text-center hover:border-gray-600'
        >
          Previous
        </Link>
        <Link
          aria-label='Next page'
          href={`/dashboard/users?page=${page + 1 < maxPage ? page + 1 : maxPage}`}
          className={`border-[1px] border-gray-400 p-1 rounded-md min-w-[100px] text-center hover:border-gray-600 ${page === maxPage ? 'cursor-not-allowed' : ''}`}
        >
          Next
        </Link>
      </div>
    </div>
  )
}
