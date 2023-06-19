import { NextRequest } from "next/server"
import cloudinary from "cloudinary"
import * as z from "zod"

import { db } from "@/lib/db"

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export async function POST(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    const body = await req.json()

    const transaction = await db.$transaction(
      body.listingImages.map((image: any) =>
        db.images.create({
          data: {
            url: image.url,
            publicId: image.publicId,
            listingId: params.id,
          },
        })
      )
    )

    return new Response(JSON.stringify(transaction))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    // Delete image in cloudinary.
    cloudinary.v2.uploader.destroy(params.id)

    // Delete image in db.
    await db.images.delete({
      where: {
        publicId: params.id as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
