"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, CheckSquare } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"

export function ReservationCard({ price }: { price: number }) {
  const [adults, setAdults] = React.useState<number>(0)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const diffDate = Math.ceil(
    // @ts-ignore
    (new Date(date?.to) - new Date(date?.from)) / (1000 * 60 * 60 * 24)
  )

  const disabledDays = [{ before: new Date() }]

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
          <div className="grid gap-2">
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
                {adults} Adults, 2 children, 2 infants
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
                  <div className="grid grid-cols-2 items-center justify-between gap-4">
                    <Label htmlFor="adults">Adults</Label>
                    <Input
                      id="adults"
                      type="number"
                      value={adults}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const parse = Number(e.target.value)
                        setAdults(parse)
                      }}
                      className="h-8"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center justify-between gap-4">
                    <Label htmlFor="children">Children</Label>
                    <Input
                      id="children"
                      type="number"
                      defaultValue="0"
                      className="h-8"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center justify-between gap-4">
                    <Label htmlFor="infants">Infants</Label>
                    <Input
                      id="infants"
                      type="number"
                      defaultValue="0"
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CheckSquare className="mr-2 h-4 w-4" /> Reserve
        </Button>
      </CardFooter>
    </Card>
  )
}
