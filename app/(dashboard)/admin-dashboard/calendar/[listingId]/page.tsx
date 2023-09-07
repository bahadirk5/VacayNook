import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
import { AvailabilityCalendar } from "@/components/availability-calendar"

import { DashboardHeader } from "@/components/header"
import { OpenDaysModal } from "@/components/open-days-modal"
import { DashboardShell } from "@/components/shell"

import { columns } from "../components/columns"
import { DataTable } from "../components/data-table"

interface CalendarProps {
  params: { listingId: string }
}

async function getListing(listingId: string) {
  return await db.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      availableDays: true,
      reservation: true,
    },
  })
}

export default async function ListingCalendar({ params }: CalendarProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const listing = await getListing(params.listingId)

  if (!listing) {
    return notFound()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Availability Calendar"
        text="Open close days and manage reservations."
      >
        <div className="flex gap-2">
          <OpenDaysModal
            listingId={params.listingId}
            availableDays={listing.availableDays}
          />
        </div>
      </DashboardHeader>
      <AvailabilityCalendar availableDays={listing.availableDays} />
      <DataTable columns={columns} data={listing.availableDays} />
    </DashboardShell>
  )
}
