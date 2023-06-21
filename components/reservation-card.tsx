"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, CheckSquare } from "lucide-react"
import qs from "query-string"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Counter } from "@/components/counter"
import { Icons } from "@/components/icons"

import { Separator } from "./ui/separator"

interface ReservationCardProps {
  listingId: string
  price: number
  adultsCount: number
  childrenCount: number
  infantsCount: number
  serviceFee: number
}

export function ReservationCard({
  price,
  adultsCount,
  childrenCount,
  infantsCount,
  serviceFee,
  listingId,
}: ReservationCardProps) {
  const [adults, setAdults] = React.useState<number>(1)
  const [children, setChildren] = React.useState<number>(0)
  const [infants, setInfants] = React.useState<number>(0)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const router = useRouter()
  const params = useSearchParams()

  const diffDate = Math.ceil(
    // @ts-ignore
    (new Date(date?.to) - new Date(date?.from)) / (1000 * 60 * 60 * 24)
  )

  const disabledDays = [{ before: new Date() }]

  const handleClick = React.useCallback(() => {
    const query: any = {
      listingId: listingId,
      adults: adults,
      children: children,
      infants: infants,
      to: date?.to,
      from: date?.from,
    }

    const url = qs.stringifyUrl(
      {
        url: "/reservation",
        query: query,
      },
      { skipNull: true }
    )

    router.push(url)
  }, [router, params, adults, children, infants, date])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {price}$ / night
          </h4>
          <div className="flex font-semibold">
            <Icons.star className="w-4" />
            4.5
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="date" className="shrink-0">
            Check in - Check out
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={disabledDays}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-2 space-y-2">
          <Label htmlFor="guest" className="shrink-0">
            Guests
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start rounded-md"
              >
                {adults} Adults, {children} children, {infants} infants
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    This place has a maximum of 4 guests, not including infants.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Counter
                    onChange={(value) => setAdults(value)}
                    value={adults}
                    max={adultsCount}
                    title="Adults"
                  />
                  <Counter
                    onChange={(value) => setChildren(value)}
                    value={children}
                    max={childrenCount}
                    title="Children"
                  />
                  <Counter
                    onChange={(value) => setInfants(value)}
                    value={infants}
                    max={infantsCount}
                    title="Infants"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {diffDate ? (
          <div className="mt-4 flex flex-col items-end space-y-2">
            <div className="text-sm">
              {diffDate} days {diffDate * price}$
            </div>
            <div className="text-sm">Service fee {serviceFee}$</div>
            <Separator className="w-1/2" />
            <div className="text-sm">
              Total price {diffDate * price + serviceFee}$
            </div>
          </div>
        ) : (
          ""
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!diffDate} onClick={handleClick}>
          <CheckSquare className="mr-2 h-4 w-4" /> Reserve
        </Button>
      </CardFooter>
    </Card>
  )
}
