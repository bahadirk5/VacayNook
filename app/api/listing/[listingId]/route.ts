import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const listingUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  roomCount: z.string().optional(),
  bathRoomCount: z.string().optional(),
  guestCount: z.string().optional(),
  price: z.string().optional(),
  location: z.string().optional(),
  latlng: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  categoryId: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  publised: z.boolean().optional(),
})

const routeContextSchema = z.object({
  params: z.object({
    listingId: z.string(),
  }),
})

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
    const body = await req.json()
    console.log(body)
    const payload = listingUpdateSchema.parse(body)

    // Update the listing.
    await db.listing.update({
      where: {
        id: params.listingId,
      },
      data: {
        title: payload.title || undefined,
        description: payload.description || undefined,
        roomCount: payload.roomCount || undefined,
        bathRoomCount: payload.bathRoomCount || undefined,
        guestCount: payload.guestCount || undefined,
        price: payload.price || undefined,
        location: payload.location || undefined,
        latlng: payload.latlng || undefined,
        userId: session.user.id || undefined,
        published: body.publised || undefined,
        categoryId: payload.categoryId || undefined,
        amenities: {
          connect:
            payload.amenities?.map((amenities) => ({
              id: amenities,
            })) || undefined,
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
