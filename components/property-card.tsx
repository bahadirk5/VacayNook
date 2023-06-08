"use client"

import { useRouter } from "next/navigation"
import { Amenities, Category, Images, Listing } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { ImageSlider } from "./image-slider"

interface PropertyCardPorps {
  listing: Listing & {
    amenities: Amenities[]
    category: Category
    imageSrc: Images[]
  }
}

export default function PropertyCard({ listing }: PropertyCardPorps) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/listings/${listing.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <ImageSlider images={listing.imageSrc} />
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{listing.title}</div>
        <div className="flex">
          <Icons.star className="w-4 fill-black" />
          4.5
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{listing.location}</p>
      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">{listing.price}$</div>
      </div>
    </div>
  )
}
