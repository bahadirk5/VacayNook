import { CategoryItem } from "@/components/category-item"
import { CategoryModal } from "@/components/category-modal"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Category" text="Create and manage categories.">
        <CategoryModal />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <CategoryItem.Skeleton />
        <CategoryItem.Skeleton />
        <CategoryItem.Skeleton />
        <CategoryItem.Skeleton />
        <CategoryItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
