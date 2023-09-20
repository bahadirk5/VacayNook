import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const heroSectionUpdateSchema = z.object({
  title: z.string(),
  description: z.string(),
})

export async function PATCH(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = heroSectionUpdateSchema.parse(json)
    console.log(body)

    const heroSection = await db.heroSection.findFirst()

    await db.heroSection.update({
      where: { id: heroSection?.id },
      data: {
        title: body.title,
        description: body.description,
      },
    })
    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
