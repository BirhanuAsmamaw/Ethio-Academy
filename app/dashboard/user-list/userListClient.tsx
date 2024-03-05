"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image"


interface UserListProps{
  users:any[];
}

type UserType={
 id:string, 
image:string,
name: string,
price:number;

email: string,

role: string,

courses:number

}




export const columns: ColumnDef<UserType>[] = [
  





  {
    accessorKey: "image",
    header: "Avatar",
    cell: ({ row }) => (
      <>{
        row.getValue("image")?<div className="capitalize">
      <Image
      height={30}
      width={30}
      src={row.getValue("image")}
      alt={row.getValue("name")}
      className="rounded-full"
      />
      </div>:<div className="h-30 w-30 rounded-full flex items-center justify-center">
       <FaRegUserCircle size={30}/>

      </div>
      }</>
    ),
  },


  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="">Full Name</div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },



  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="">Email</div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },




  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div className="">Role</div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
  },



  {
    accessorKey: "courses",
    header: ({ column }) => {
      return (
        <div className="">Courses</div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("courses")}</div>,
  },



  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="">Price(ETB)</div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("price")}</div>,
  },




  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-gray-200 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-[5px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },


]












const UserListClient:React.FC<UserListProps>=({users})=>{
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const data=users.map(user =>{
    let courses_no=0;
    let price=0;
   user.payedCourses.forEach((courses:any)=>{
    courses_no+=courses.courses.length;
    price+=courses.totalPrice



    })
    return {...user, courses:courses_no,price:price}
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full bg-white dark:bg-gray-800 ">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border-gray-200 dark:border-gray-700 ml-2 rounded-[5px]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto border-gray-200 dark:border-gray-600 rounded-[5px]">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"  className="border-gray-200 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-[5px]">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      <div className="rounded-[5px] border border-gray-200 dark:border-gray-700 overflow-x-auto p-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow 
              className="border-gray-200 dark:border-gray-700"
              key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                className="border-gray-200 dark:border-gray-700"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


export default UserListClient;