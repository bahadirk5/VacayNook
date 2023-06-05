import { AmenitiesTitles } from "@prisma/client"
import * as z from "zod"

export const amenitiesPatchSchema = z.object({
  name: z.string().min(3).max(20),
  title: z.nativeEnum(AmenitiesTitles),
  icon: z.string().min(2).max(20),
})
