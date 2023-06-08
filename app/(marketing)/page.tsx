import { db } from "@/lib/db"
import PropertyCard from "@/components/property-card"

export default async function IndexPage() {
  const listing = await db.listing.findMany({
    where: {
      published: true,
    },
    include: {
      amenities: true,
      category: true,
      imageSrc: true,
    },
  })

  return (
    <section className="grid-col-1 container grid gap-6 pb-8 pt-6 sm:grid-cols-2 md:grid-cols-3 md:py-10 lg:grid-cols-4 xl:grid-cols-5 ">
      {listing && listing.length > 0 ? (
        listing.map((property) => (
          <PropertyCard key={property.id} listing={property} />
        ))
      ) : (
        <div>No propert found</div>
      )}
    </section>
  )
}
