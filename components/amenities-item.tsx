import { Amenities } from "@prisma/client"

import { Skeleton } from "@/components/ui/skeleton"
import { AmenitiesOperations } from "@/components/amenities-operations"
import { DynamicIcons } from "@/components/dynamic-icons"

interface AmenitiesItemProps {
  amenities: Pick<Amenities, "id" | "name" | "title" | "icon">
}

export function AmenitiesItem({ amenities }: AmenitiesItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <DynamicIcons name="sun" className="h-8 w-8" />
        <span>{amenities.name}</span>
      </div>
      <AmenitiesOperations
        amenities={{
          id: amenities.id,
          name: amenities.name,
          title: amenities.title,
          icon: amenities.icon,
        }}
      />
    </div>
  )
}

AmenitiesItem.Skeleton = function AmenitiesItemItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
