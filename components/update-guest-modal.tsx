"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

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
import { Counter } from "@/components/counter"

interface UpdateGuestModalProps {
  adultsCount: number
  childrenCount: number
  infantsCount: number
  adults: number
  children: number
  infants: number
}

export function UpdateGuestModal({
  adultsCount,
  childrenCount,
  infantsCount,
  adults,
  children,
  infants,
}: UpdateGuestModalProps) {
  const [adult, setAdult] = React.useState<number>(adults)
  const [childrn, setChildren] = React.useState<number>(children)
  const [infant, setInfant] = React.useState<number>(infants)
  const [open, setOpen] = React.useState(false)

  const router = useRouter()
  const params = useSearchParams()

  const handleClick = React.useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      adults: adult,
      children: childrn,
      infants: infant,
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
  }, [router, params, adult, childrn, infant])

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Guests</DialogTitle>
          <DialogDescription>
            This place has a maximum of {adultsCount + childrenCount} guests,
            not including infants.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-2">
            <Counter
              onChange={(value) => setAdult(value)}
              value={adult}
              max={adultsCount}
              title="Adults"
            />
            <Counter
              onChange={(value) => setChildren(value)}
              value={childrn}
              max={childrenCount}
              title="Children"
            />
            <Counter
              onChange={(value) => setInfant(value)}
              value={infant}
              max={infantsCount}
              title="Infants"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
