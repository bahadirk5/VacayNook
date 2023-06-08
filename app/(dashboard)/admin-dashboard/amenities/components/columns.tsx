"use client"

import * as React from "react"
import { AmenitiesTitles } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Amenities = {
  id: string
  title: AmenitiesTitles
  name: string
  icon: string
}

export const columns: ColumnDef<Amenities>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "icon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Icon" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("icon")}
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
