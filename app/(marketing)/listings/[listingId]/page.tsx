import Image from "next/image"
import { notFound } from "next/navigation"
import { Listing } from "@prisma/client"
import { Bath, BedDouble, ImagePlus, MapPin, User, Wifi } from "lucide-react"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DynamicIcons } from "@/components/dynamic-icons"
import { ImageGallery } from "@/components/image-gallery"
import { MapBox } from "@/components/map-box"

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

  if (!listing) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-2">
      <div className="mt-1 grid-cols-4 space-y-2 md:grid md:gap-3 md:space-y-0">
        <div className="relative col-span-2 row-span-2 w-full">
          <Image
            src={listing.imageSrc[0].url || ""}
            alt="listing"
            width={768}
            height={960}
            className="h-[500px] rounded-lg object-cover"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="absolute bottom-3 left-3 z-10"
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Show all photos
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-full">
              <ScrollArea className="h-[900px] w-full">
                <div className=" mx-auto max-w-5xl columns-1 gap-4 space-y-4 p-5 sm:columns-2 xl:columns-3">
                  <ImageGallery slides={listing.imageSrc} />
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
        {listing.imageSrc.slice(1, 5).map((image) => (
          <div key={image.publicId} className="hidden w-full rounded md:block">
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
      <div className="mt-7 grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="col-span-2">
          {/* Genral Info */}
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {listing?.title}
              </h3>
              <p className="mt-2 flex font-semibold text-muted-foreground">
                <MapPin /> {listing?.location}
              </p>
            </div>
            <Separator className="my-4 w-1/2" />
            <div className="flex gap-10">
              <p className="mt-2 flex text-muted-foreground">
                <User className="mr-2 h-6 w-6" /> {listing?.guestCount} guests
              </p>
              <p className="mt-2 flex text-muted-foreground">
                <BedDouble className="mr-2 h-6 w-6" /> {listing?.roomCount}{" "}
                bedrooms
              </p>
              <p className="mt-2 flex text-muted-foreground">
                <Bath className="mr-2 h-6 w-6" /> {listing?.bathRoomCount} baths
              </p>
            </div>
          </div>
          {/* Description */}
          <div className="mt-7 rounded-md border p-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Stay information
            </h4>
            <Separator className="my-4 w-1/2" />
            <p className="mt-2 flex text-muted-foreground">
              {listing?.description}
            </p>
          </div>
          {/* Amenities */}
          <div className="mt-7 rounded-md border p-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Amenities
            </h4>
            <p className="mt-2 flex text-muted-foreground">
              About the property&apos;s amenities and services
            </p>
            <Separator className="my-4 w-1/2" />
            <div className="grid grid-cols-3">
              {listing?.amenities.map((amenities) => (
                <p className="flex">
                  <DynamicIcons
                    // @ts-ignore
                    name={amenities.icon}
                    className="mr-2 h-6 w-6"
                  />
                  <span className="text-muted-foreground">
                    {amenities.name}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-md border p-4">Contact</div>
        </div>
      </div>
      {/* @ts-ignore */}
      <MapBox latlng={listing.latlng} />
    </div>
  )
}
