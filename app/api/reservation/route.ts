import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const reservationCreateSchema = z.object({
  adults: z.number(),
  children: z.number(),
  infants: z.number(),
  from: z.string(),
  to: z.string(),
  contact: z.string(),
  listingId: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = reservationCreateSchema.parse(json)

    await db.reservation.create({
      data: {
        adults: body.adults,
        children: body.children,
        infants: body.infants,
        from: body.from,
        to: body.to,
        contact: body.contact,
        listingId: body.listingId,
        userId: session.user.id,
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
