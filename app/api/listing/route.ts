import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const listingCreateSchema = z.object({
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

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    const listing = await db.listing.findMany({
      select: {},
    })

    return new Response(JSON.stringify(listing))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = listingCreateSchema.parse(json)

    const listing = await db.listing.create({
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
          connect: body.amenities.map((amenities) => ({
            id: amenities,
          })),
        },
      },
      include: {
        category: true,
        amenities: true,
      },
    })
    
    return new Response(JSON.stringify(listing))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
