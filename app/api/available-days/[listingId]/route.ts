import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const availableCreateSchema = z.object({
  to: z.string(),
  from: z.string(),
})

const routeContextSchema = z.object({
  params: z.object({
    listingId: z.string(),
  }),
})

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    const listing = await db.listing.findFirst({
      where: { id: params.listingId },
    })

    if (!listing) {
      return new Response("Listing is not found", { status: 404 })
    }

    const json = await req.json()
    const body = availableCreateSchema.parse(json)

    await db.availableDays.create({
      data: {
        listingId: params.listingId,
        to: body.to,
        from: body.from,
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
