import { Listing } from "@prisma/client"

import { db } from "@/lib/db"

async function getListing(listingId: Listing["id"]) {
  return await db.listing.findFirst({
    where: { id: listingId },
  })
}

interface ListingPageProps {
  params: { listingId: string }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const listing = await getListing(params.listingId)
  return (
    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
      <code className="text-white">{JSON.stringify(listing, null, 2)}</code>
    </pre>
  )
}
