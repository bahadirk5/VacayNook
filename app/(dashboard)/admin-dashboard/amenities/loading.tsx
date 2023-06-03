import { AmenitiesItem } from "@/components/amenities-item"
import { AmenitiesModal } from "@/components/amenities-modal"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Category" text="Create and manage amenities.">
        <AmenitiesModal />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <AmenitiesItem.Skeleton />
        <AmenitiesItem.Skeleton />
        <AmenitiesItem.Skeleton />
        <AmenitiesItem.Skeleton />
        <AmenitiesItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
