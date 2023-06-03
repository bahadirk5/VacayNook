import { notFound, redirect } from "next/navigation"
import { Category } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
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
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const category = await getCategory(params.categoryId)

  if (!category) {
    notFound()
  }

  return (
    <CategoryEdit category={{ id: category?.id, name: category?.name, icon: category?.icon }} />
  )
}
