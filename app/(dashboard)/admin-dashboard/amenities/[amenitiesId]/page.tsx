import { notFound, redirect } from "next/navigation"
import { Amenities } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
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
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const amenities = await getAmenities(params.amenitiesId)

  if (!amenities) {
    notFound()
  }
  return (
    <AmenitiesEdit
      amenities={{
        id: amenities?.id,
        title: amenities?.title,
        name: amenities?.name,
        icon: amenities.icon,
      }}
    />
  )
}
