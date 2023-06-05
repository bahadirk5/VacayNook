import { notFound, redirect } from "next/navigation"
import { Amenities } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"

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

export default async function UpdateAmenities({params}: UpdateCategoryProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const category = await getAmenities(params.amenitiesId)

  if (!category) {
    notFound()
  }
  return <div>{params.amenitiesId}</div>
}