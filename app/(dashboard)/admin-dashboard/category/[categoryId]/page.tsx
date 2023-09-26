import { notFound } from "next/navigation"
import { Category } from "@prisma/client"

import { db } from "@/lib/db"
import { CategoryEdit } from "@/components/category-edit"

async function getCategory(categoryId: Category["id"]) {
  return await db.category.findFirst({
    where: {
      id: categoryId,
    },
  })
}

interface UpdateCategoryProps {
  params: { categoryId: string }
}

export default async function UpdateCategory({ params }: UpdateCategoryProps) {
  const category = await getCategory(params.categoryId)

  if (!category) {
    notFound()
  }

  return (
    <CategoryEdit
      category={{
        id: category?.id,
        name: category?.name,
        icon: category?.icon,
      }}
    />
  )
}
