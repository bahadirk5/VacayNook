import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const categoryCreateSchema = z.object({
  name: z.string(),
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

    const category = await db.category.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    return new Response(JSON.stringify(category))
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
    const body = categoryCreateSchema.parse(json)

    const category = await db.category.create({
      data: {
        name: body.name,
        icon: body.icon,
      },
    })
    return new Response(JSON.stringify(category))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
