import { NextRequest } from "next/server"
import cloudinary from "cloudinary"
import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const heroImageSchema = z.object({
  url: z.string(),
  publicId: z.string(),
})

const heroImageDeleteSchema = z.object({
  publicId: z.string(),
})

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    if (session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 })
    }

    const body = await req.json()
    const payload = heroImageSchema.parse(body)

    const data = await db.heroSection.findFirst()

    await db.heroSection.update({
      where: {
        id: data?.id,
      },
      data: {
        url: payload.url,
        publicId: payload.publicId,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const json = await req.json()
    const body = heroImageDeleteSchema.parse(json)

    // Delete image in cloudinary.
    cloudinary.v2.uploader.destroy(body.publicId)

    // Delete image in db.
    await db.heroSection.update({
      where: {
        publicId: body.publicId as string,
      },
      data: {
        url: "",
        publicId: "",
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
