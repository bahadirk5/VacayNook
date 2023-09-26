import { db } from "@/lib/db"
import { AmenitiesModal } from "@/components/amenities-modal"
import { DataTable } from "@/components/data-table"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { columns } from "./components/columns"

export const metadata = {
  title: "Amenities",
}

export default async function Amenities() {
  const amenities = await db.amenities.findMany()

  return (
    <DashboardShell>
      <DashboardHeader heading="Amenities" text="Create and manage amenities.">
        <AmenitiesModal />
      </DashboardHeader>
      <div>
        {amenities?.length ? (
          <DataTable columns={columns} data={amenities} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No amenities created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <AmenitiesModal variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
