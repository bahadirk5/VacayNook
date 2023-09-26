"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Row } from "@tanstack/react-table"
import { format } from "date-fns"
import {
  Activity,
  Calendar,
  Edit,
  FileSearch,
  Image,
  MessageSquare,
  MoreHorizontal,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { Reservations } from "./columns"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDetailDialog, setShowDetailDialog] = React.useState<boolean>(false)

  const reservation = row.original as Reservations

  const to = format(new Date(reservation.to), "PPP")
  const from = format(new Date(reservation.from), "PPP")

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onSelect={() => {
              setShowDetailDialog(true)
              document.body.style.pointerEvents = ""
            }}
          >
            <FileSearch className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reservation Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <p className="leading-7">Listing:</p>
              <p className="text-sm text-muted-foreground">
                {reservation.listing.title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="leading-7">Guest:</p>
              <p className="text-sm text-muted-foreground">
                {reservation.user.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="leading-7">Contact:</p>
              <p className="text-sm text-muted-foreground">
                {reservation.contact}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="leading-7">Stays:</p>
              <p className="text-sm text-muted-foreground">
                {to} - {from}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="leading-7">Payment:</p>
              <p className="text-sm text-muted-foreground">
                {reservation.isPaid === true ? "Paid" : "Not paid"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="leading-7">Status:</p>
              <p className="text-sm text-muted-foreground">
                {reservation.status}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
