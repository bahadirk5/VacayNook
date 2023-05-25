import * as z from "zod"

export const userRegisterSchema = z.object({
  name: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().min(3).max(32),
})
