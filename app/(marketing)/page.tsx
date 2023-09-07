import Image from "next/image"
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
      <section className="container mx-auto grid space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-10">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Taxing Laughter: The Joke Tax Chronicles
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Once upon a time, in a far-off land, there was a very lazy king who
            spent all day lounging on his throne. One day, his advisors came to
            him with a problem: the kingdom was running out of money.
          </p>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <Image
            src="/hero2.png"
            priority
            width={1000}
            height={1000}
            quality={100}
            className="pointer-events-none select-none rounded-md"
            alt="hero section photo"
            style={{ objectFit: "cover", objectPosition: "75%" }}
          />
        </div>
      </section>
      <div className="container rounded-md bg-secondary py-8 dark:bg-transparent md:py-12 lg:py-24">
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Suggestions for discovery
        </h2>
        <p className="text-muted-foreground">
          Popular places to stay that Chisfis recommends for you
        </p>
        <Categories categories={categories} />
        {listings && listings.length > 0 ? (
          <section className="grid-col-1 grid gap-6 pb-8 pt-6 sm:grid-cols-2 md:grid-cols-3 md:py-4 lg:grid-cols-4 xl:grid-cols-5 ">
            {listings.map((property) => (
              <PropertyCard key={property.id} listing={property} />
            ))}
          </section>
        ) : (
          <div className="container mt-4">
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
      </div>
    </>
  )
}
