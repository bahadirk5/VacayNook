import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const listingUpdateSchema = z.object({
  title: z.string(),
  description: z.string(),
  roomCount: z.string(),
  bathRoomCount: z.string(),
  guestCount: z.string(),
  price: z.string(),
  location: z.string(),
  latlng: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  categoryId: z.string(),
  amenities: z.array(z.string()),
})

const routeContextSchema = z.object({
  params: z.object({
    listingId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    // Delete the listing.
    await db.listing.delete({
      where: {
        id: params.listingId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = listingUpdateSchema.parse(json)

    // Update the listing.
    await db.listing.update({
      where: {
        id: params.listingId,
      },
      data: {
        title: body.title,
        description: body.description,
        roomCount: body.roomCount,
        bathRoomCount: body.bathRoomCount,
        guestCount: body.guestCount,
        price: body.price,
        location: body.location,
        latlng: body.latlng,
        userId: session.user.id,
        categoryId: body.categoryId,
        amenities: {
          set: body.amenities.map((amenities) => ({
            id: amenities,
          })),
        },
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
