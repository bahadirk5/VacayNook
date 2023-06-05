import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const amenitiesSchema = z.object({
  id: z.string(),
  title: z.string(),
  name: z.string(),
  icon: z.string(),
})

export type Task = z.infer<typeof amenitiesSchema>
