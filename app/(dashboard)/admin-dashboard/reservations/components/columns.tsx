"use client"

import { ReservationStatus } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export type Reservations = {
  id: string
  adults: number
  children: number
  infants: number
  from: string
  to: string
  contact: string
  isPaid: boolean
  status: ReservationStatus
  createdAt: Date
  user: { name: string | null }
  listing: { title: string }
  userId: string
  listingId: string
}

export const columns: ColumnDef<Reservations>[] = [
  {
    accessorKey: "listing",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Listing" />
    ),
    cell: ({ row }) => {
      const { title }: { title: string } = row.getValue("listing")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{title}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guest name" />
    ),
    cell: ({ row }) => {
      const { name }: { name: string } = row.getValue("user")
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{name}</span>
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
    accessorKey: "contact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("contact")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      let status
      if (row.getValue("status") === "CONFIRM") {
        status = <Badge>Confirmed</Badge>
      } else if (row.getValue("status") === "REJECT") {
        status = <Badge variant="destructive">Rejected</Badge>
      } else {
        status = <Badge variant="secondary">Pending</Badge>
      }
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "isPaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Paid" />
    ),
    cell: ({ row }) => {
      let status
      if (row.getValue("isPaid") === true) {
        status = <Badge>Paid</Badge>
      } else {
        status = <Badge variant="destructive">Not paid</Badge>
      }
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{status}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
