import Image from "next/image"
import { Listing } from "@prisma/client"
import { ImagePlus } from "lucide-react"

import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

async function getListing(listingId: Listing["id"]) {
  return await db.listing.findFirst({
    where: { id: listingId },
    include: {
      amenities: true,
      category: true,
      imageSrc: true,
    },
  })
}

interface ListingPageProps {
  params: { listingId: string }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const listing = await getListing(params.listingId)
  return (
    <div className="mx-auto w-full max-w-6xl p-2">
      <div className="mt-1 grid-cols-4 space-y-2 md:grid md:gap-3 md:space-y-0">
        <div className="relative col-span-2 row-span-2 w-full">
          <Image
            src={listing?.imageSrc[0].url || ""}
            alt="listing"
            width={768}
            height={960}
            className="h-[500px] rounded-lg object-cover"
          />
          <Button
            variant="secondary"
            className={cn("absolute bottom-3 left-3 z-10")}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Show all photos
          </Button>
        </div>
        {listing?.imageSrc.slice(1, 5).map((image) => (
          <div
            key={image.publicId}
            className="invisible w-full rounded md:visible"
          >
            <Image
              src={image.url || ""}
              alt="listing"
              width={400}
              height={400}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
