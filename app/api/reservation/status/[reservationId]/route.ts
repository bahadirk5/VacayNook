import { ReservationStatus } from "@prisma/client"
import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    reservationId: z.string(),
  }),
})

const reservationStatusSchema = z.object({
  status: z.nativeEnum(ReservationStatus),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = reservationStatusSchema.parse(json)

    await db.reservation.update({
      where: {
        id: params.reservationId,
      },
      data: {
        status: body.status,
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
