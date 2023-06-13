import { db } from "@/lib/db"

export interface IListingsParams {
  category?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const { category } = params

    let query: any = {
      published: true
    }

    if (category) {
      const selectedCategory = await db.category.findFirst({
        where: { name: category },
      })
      query.categoryId = selectedCategory?.id
    }

    const listings = await db.listing.findMany({
      where: query,
      include: {
        amenities: true,
        category: true,
        imageSrc: true,
      },
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
    }))

    return safeListings
  } catch (error: any) {
    throw new Error(error)
  }
}
