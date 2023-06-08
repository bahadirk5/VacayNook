"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/data-table-column-header"

import { DataTableRowActions } from "./data-table-row-actions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lisitng = {
  id: string
  title: string
  category: { name: string }
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Lisitng>[] = [
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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const { name }: { name: string } = row.getValue("category")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      let status
      if (row.getValue("published") === true) {
        status = <Badge>Published</Badge>
      } else {
        status = <Badge variant="destructive">Unpublished</Badge>
      }
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      const createdAt = format(row.getValue("createdAt"), "PPP")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {createdAt.toString()}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated at" />
    ),
    cell: ({ row }) => {
      const updatedAt = format(row.getValue("updatedAt"), "PPP")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {updatedAt}
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
