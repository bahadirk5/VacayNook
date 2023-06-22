"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { DateRange } from "react-day-picker"

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

import { Calendar } from "./ui/calendar"

interface UpdateDateModalProps {
  from: Date
  to: Date
}

export function UpdateDateModal({ from, to }: UpdateDateModalProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(from),
    to: new Date(to),
  })

  const router = useRouter()
  const params = useSearchParams()

  const disabledDays = [{ before: new Date() }]

  const handleClick = React.useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      to: date?.to,
      from: date?.from,
    }

    const url = qs.stringifyUrl(
      {
        url: "/reservation",
        query: updatedQuery,
      },
      { skipNull: true }
    )

    setOpen(false)

    router.push(url)
  }, [router, params, date])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer scroll-m-20 border-b text-lg font-medium tracking-tight"
          onClick={() => setOpen(true)}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Guests</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="mx-auto">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={disabledDays}
            className=""
          />
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
