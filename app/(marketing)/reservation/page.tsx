import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Listing } from "@prisma/client"
import { format } from "date-fns"

import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { ReservationForm } from "@/components/reservation-form"
import { UpdateDateModal } from "@/components/update-date-modal"
import { UpdateGuestModal } from "@/components/update-guest-modal"

interface ReservationProps {
  searchParams: {
    to: Date
    from: Date
    adults: number
    children: number
    infants: number
    listingId: string
  }
}

async function getListing(listingId: Listing["id"]) {
  return await db.listing.findFirst({
    where: { id: listingId },
    include: {
      imageSrc: true,
    },
  })
}

export default async function Reservation({ searchParams }: ReservationProps) {
  const listing = await getListing(searchParams.listingId)

  if (!listing) {
    notFound()
  }

  const diffDate = Math.ceil(
    // @ts-ignore
    (new Date(searchParams.to) - new Date(searchParams.from)) /
      (1000 * 60 * 60 * 24)
  )

  return (
    <div className="mx-auto mt-20 w-full max-w-5xl">
      <div className="flex">
        <Link
          href={`/listings/${searchParams.listingId}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-10 w-10 rounded-full p-0"
          )}
        >
          <Icons.chevronLeft className="h-6 w-6" />
        </Link>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Request to book
        </h2>
      </div>
      <div className="mt-10 grid justify-between px-2 md:grid-cols-2">
        <div>
          <h3 className="scroll-m-20 text-2xl font-medium tracking-tight">
            Your trip
          </h3>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
                Dates
              </h4>
              <div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {format(new Date(searchParams.from), "LLL dd, y")} -{" "}
                  {format(new Date(searchParams.to), "LLL dd, y")}
                </p>
              </div>
            </div>
            <UpdateDateModal from={searchParams.from} to={searchParams.to} />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
                Guests
              </h4>
              <div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {Number(searchParams.adults) + Number(searchParams.children)}{" "}
                  guest
                  {Number(searchParams.adults) +
                  Number(searchParams.children !== 1)
                    ? "s"
                    : ""}
                  {Number(searchParams.infants) !== 0 ? (
                    <span>
                      , {searchParams.infants} infant
                      {Number(searchParams.infants) !== 1 ? "s" : ""}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
            <UpdateGuestModal
              adultsCount={listing.adultCount}
              childrenCount={listing.childrenCount}
              infantsCount={listing.infantCount}
              adults={Number(searchParams.adults)}
              childrn={Number(searchParams.children)}
              infants={Number(searchParams.infants)}
            />
          </div>
          <Separator className="my-10" />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <ReservationForm
              adults={Number(searchParams.adults)}
              children={Number(searchParams.children)}
              infants={Number(searchParams.infants)}
              from={searchParams.from}
              to={searchParams.to}
              listingId={searchParams.listingId}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex gap-4">
                <Image
                  width={140}
                  height={140}
                  className="rounded-md"
                  src={listing.imageSrc[0].url}
                  alt={listing.title}
                />
                <div>
                  <CardTitle>{listing.title}</CardTitle>
                  <CardDescription>{listing.location}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-5" />
              <h3 className="scroll-m-20 text-2xl font-medium tracking-tight">
                Price details
              </h3>
              <div className="mt-5 flex justify-between">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {listing.price}$ x {diffDate} nights
                </p>
                <p className="leading-7">{listing.price * diffDate}$</p>
              </div>
              <div className="mt-3 flex justify-between">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Service fee
                </p>
                <p className="leading-7">{listing.serviceFee}$</p>
              </div>
              <Separator className="my-5" />
              <div className="flex justify-between">
                <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
                  Total
                </h4>
                <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
                  {listing.price * diffDate + listing.serviceFee}$
                </h4>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
