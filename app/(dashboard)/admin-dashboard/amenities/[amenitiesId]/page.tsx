import { notFound } from "next/navigation"
import { Amenities } from "@prisma/client"

import { db } from "@/lib/db"
import { AmenitiesEdit } from "@/components/amenities-edit"

async function getAmenities(amenitiesId: Amenities["id"]) {
  return await db.amenities.findFirst({
    where: {
      id: amenitiesId,
    },
  })
}

interface UpdateCategoryProps {
  params: { amenitiesId: string }
}

export default async function UpdateAmenities({ params }: UpdateCategoryProps) {
  const amenities = await getAmenities(params.amenitiesId)

  if (!amenities) {
    notFound()
  }
  return <AmenitiesEdit amenities={amenities} />
}
