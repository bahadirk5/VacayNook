import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const availableDaysSchema = z.object({
  id: z.string(),
  to: z.date(),
  from: z.date(),
  listingId: z.string(),
})

export type Task = z.infer<typeof availableDaysSchema>
