"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { DataTableColumnHeader } from "@/components/data-table-column-header"

import { DataTableRowActions } from "./data-table-row-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AvailableDays = {
  id: string
  to: Date
  from: Date
  listingId: string
}

export const columns: ColumnDef<AvailableDays>[] = [
  {
    accessorKey: "from",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From" />
    ),
    cell: ({ row }) => {
      const from = format(row.getValue("from"), "PPP")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {from.toString()}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To" />
    ),
    cell: ({ row }) => {
      const to = format(row.getValue("to"), "PPP")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {to.toString()}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
