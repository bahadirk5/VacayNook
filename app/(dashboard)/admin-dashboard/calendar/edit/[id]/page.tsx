import { notFound } from "next/navigation"

import { db } from "@/lib/db"

import { AvailabilityCalendar } from "./components/availability-calendar"

interface CalendarProps {
  params: { id: string }
}

async function getAvailableDays(id: string) {
  return await db.availableDays.findUnique({
    where: {
      id: id,
    },
  })
}

export default async function availableDaysEdit({ params }: CalendarProps) {
  const availableDays = await getAvailableDays(params.id)

  if (!availableDays) {
    return notFound()
  }

  return <AvailabilityCalendar availableDays={availableDays} />
}
