import PropertyCard from "@/components/property-card";

export default function IndexPage() {
  return (
    <section className="grid-col-1 container grid gap-6 pb-8 pt-6 sm:grid-cols-2 md:grid-cols-3 md:py-10 lg:grid-cols-4 xl:grid-cols-5 ">
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
    </section>
  )
}
