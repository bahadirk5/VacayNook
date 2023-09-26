import { ReservationStatus } from "@prisma/client"
import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const reservationSchema = z.object({
  id: z.string(),
  adults: z.number(),
  children: z.number(),
  infats: z.number(),
  from: z.string(),
  to: z.string(),
  contact: z.string(),
  isPaid: z.boolean(),
  status: z.nativeEnum(ReservationStatus),
  createdAt: z.date(),
  user: z.object({ name: z.string() }),
  listing: z.object({ title: z.string() }),
  userId: z.string(),
  listingId: z.string(),
})

export type Task = z.infer<typeof reservationSchema>
