import Link from "next/link"
import getListings, { IListingsParams } from "@/actions/get-listing"

import { db } from "@/lib/db"
import { buttonVariants } from "@/components/ui/button"
import { Categories } from "@/components/categories"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import PropertyCard from "@/components/property-card"

export const dynamic = "force-dynamic"

interface HomeProps {
  searchParams: IListingsParams
}

export default async function IndexPage({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const categories = await db.category.findMany()

  return (
    <>
      <Categories categories={categories} />
      {listings && listings.length > 0 ? (
        <section className="grid-col-1 container grid gap-6 pb-8 pt-6 sm:grid-cols-2 md:grid-cols-3 md:py-10 lg:grid-cols-4 xl:grid-cols-5 ">
          {listings.map((property) => (
            <PropertyCard key={property.id} listing={property} />
          ))}
        </section>
      ) : (
        <div className="container mt-10">
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No exact matches</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Try changing or removing some of your filters.
            </EmptyPlaceholder.Description>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              Remove all filters
            </Link>
          </EmptyPlaceholder>
        </div>
      )}
    </>
  )
}
