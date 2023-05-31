import * as z from "zod"

export const categoryPatchSchema = z.object({
  title: z.string().min(3).max(20),
})
