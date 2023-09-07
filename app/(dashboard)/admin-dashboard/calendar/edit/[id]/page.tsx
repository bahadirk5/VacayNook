import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"

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
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const availableDays = await getAvailableDays(params.id)

  if (!availableDays) {
    return notFound()
  }

  return <AvailabilityCalendar availableDays={availableDays} />
}
