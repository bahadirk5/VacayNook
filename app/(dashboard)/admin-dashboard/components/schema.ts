import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const listingSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.object({
    name: z.string(),
  }),
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Task = z.infer<typeof listingSchema>
