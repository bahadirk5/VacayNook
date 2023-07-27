import { getTemplateMessageInput, sendMessage } from "@/actions/message"
import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const reservationCreateSchema = z.object({
  phone: z.number(),
  listingId: z.string(),
  date: z.object({ to: z.date(), from: z.date() }),
  guests: z.number(),
  infants: z.number(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = reservationCreateSchema.parse(json)

    // const data = getTemplateMessageInput(body.phone)
    // const response = await sendMessage(data)

    // const reservation = await db

    // const listing = await db.listing.update({
    //   where: {
    //     id: body.listingId
    //   },
    //   data: {
    //     reserved_days: body.date
    //   }
    // })

  } catch (error) {}
}
