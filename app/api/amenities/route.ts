import { AmenitiesTitles } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const amenitiesCreateSchema = z.object({
  name: z.string(),
  title: z.nativeEnum(AmenitiesTitles),
  icon: z.string(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    const amenities = await db.amenities.findMany({
      select: {
        id: true,
        title: true,
        name: true,
      },
    })

    return new Response(JSON.stringify(amenities))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = amenitiesCreateSchema.parse(json)

    console.log("body", body)

    const amenities = await db.amenities.create({
      data: {
        name: body.name,
        title: body.title,
        icon: body.icon,
      },
    })
    return new Response(JSON.stringify(amenities))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.log("error", error)
    return new Response(null, { status: 500 })
  }
}
