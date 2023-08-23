"use client"

import { AvailableDays } from "@prisma/client"

import { Calendar } from "@/components/ui/calendar"

interface AvailabilityCalendarProps {
  availableDays: AvailableDays[]
}

export function AvailabilityCalendar({
  availableDays,
}: AvailabilityCalendarProps) {
  const isDateAvailable = (date: any) => {
    for (const availableDay of availableDays) {
      const from = new Date(availableDay.from)
      const to = new Date(availableDay.to)

      if (date >= from && date <= to) {
        return true
      }
    }
    return false
  }

  const isDateDisabled = (date: any) => {
    return !isDateAvailable(date)
  }

  const reservedRangeStart = new Date("2023-08-25T00:00:00.000Z")
  const reservedRangeEnd = new Date("2023-08-27T00:00:00.000Z")
  const reservedDays = {
    from: reservedRangeStart,
    to: reservedRangeEnd,
  }

  const modifiers = {
    reserved: [reservedDays],
  }

  const modifiersStyles = {
    reserved: {
      color: "white",
      backgroundColor: "green",
    },
  }

  return (
    <Calendar
      className="rounded-md border p-3"
      numberOfMonths={4}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
      disabled={isDateDisabled}
    />
  )
}
