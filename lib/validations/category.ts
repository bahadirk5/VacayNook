import * as z from "zod"

export const categoryPatchSchema = z.object({
  name: z.string().min(3).max(20),
  icon: z.string().min(3).max(20),
})
