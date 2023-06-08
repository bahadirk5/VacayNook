import { redirect } from "next/navigation"
import { Listing } from "@prisma/client"
import { useRouter } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
import { ImageCard } from "@/components/image-card"
import { ImageUpload } from "@/components/image-upload"

export const metadata = {
  title: "Images",
}

async function getListing(listingId: Listing["id"]) {
  return await db.listing.findFirst({
    where: {
      id: listingId,
    },
    select: {
      imageSrc: true,
    },
    orderBy: {
      imageSrc: {
        _count: "desc",
      },
    },
  })
}

interface ListingImageProps {
  params: { listingId: string }
}

export default async function ListingImage({ params }: ListingImageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const listingImage = await getListing(params.listingId)

  return (
    <>
      <ImageUpload listingId={params.listingId} />
      {listingImage && listingImage.imageSrc.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listingImage.imageSrc.map((image) => (
            <ImageCard
              key={image.publicId}
              url={image.url}
              publicId={image.publicId}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10">No image found</div>
      )}
    </>
  )
}
