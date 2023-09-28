import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Home } from "lucide-react"

import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Reservations",
}

export default async function MyReservations() {
  const user = await getCurrentUser()

  const reservations = await db.reservation.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      listing: {
        select: {
          id: true,
          title: true,
          location: true,
          imageSrc: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
      },
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reservations"
        text="Manage reservations."
      ></DashboardHeader>
      <div className="overflow-x-auto p-2">
        {reservations?.length ? (
          <section className="grid-col-1 grid gap-6 pb-8 pt-6 sm:grid-cols-2 md:grid-cols-3 md:py-4 lg:grid-cols-4 xl:grid-cols-5 ">
            {reservations.map((reservation) => (
              <div className="group col-span-1">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image
                    fill
                    className="h-full w-full object-cover transition"
                    src={reservation.listing.imageSrc[0].url}
                    alt="Image of summer villa"
                  />
                </div>
                <div className="text-lg font-semibold">
                  {reservation.listing.title}
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(reservation.from), "PP")} -{" "}
                  {format(new Date(reservation.to), "PP")}
                </p>
                <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-muted-foreground">Status: </p>
                  {reservation.status === "CONFIRM" ? (
                    <Badge>Confirmed</Badge>
                  ) : reservation.status === "REJECT" ? (
                    <Badge variant="destructive">Rejected</Badge>
                  ) : (
                    <Badge variant="secondary">Pending</Badge>
                  )}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="logo" />
            <EmptyPlaceholder.Title>No reservations</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any reservations yet.
            </EmptyPlaceholder.Description>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              <Home className="mr-2 h-4 w-4" /> Listings
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
