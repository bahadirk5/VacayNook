import { Category } from "@prisma/client"

import { Skeleton } from "@/components/ui/skeleton"
import { CategoryOperations } from "@/components/category-operations"

interface CategoryItemProps {
  category: Pick<Category, "id" | "title">
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">{category.title}</div>
      <CategoryOperations
        category={{ id: category.id, title: category.title }}
      />
    </div>
  )
}

CategoryItem.Skeleton = function CategoryItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
