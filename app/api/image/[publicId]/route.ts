import { NextRequest } from "next/server"
import cloudinary from "cloudinary"
import * as z from "zod"

const routeContextSchema = z.object({
  params: z.object({
    publicId: z.string(),
  }),
})

export async function POST(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    console.log(params.publicId)
    cloudinary.v2.uploader.destroy(params.publicId)
    return new Response(null, { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
