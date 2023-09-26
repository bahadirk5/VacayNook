import { db } from "@/lib/db"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export const metadata = {
  title: "Reservations",
}

export default async function Reservations() {
  const reservations = await db.reservation.findMany({
    include: {
      listing: {
        select: {
          title: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reservations"
        text="Manage reservatinos."
      ></DashboardHeader>
      <div className="overflow-x-auto p-2">
        {reservations?.length ? (
          <DataTable columns={columns} data={reservations} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No reservations</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Lorem ipsum dolor sit amet consectetur.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
