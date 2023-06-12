"use client"

import { useSearchParams } from "next/navigation"
import { Category } from "@prisma/client"

import { CategoryBox } from "@/components/category-box"

interface CategoriesProps {
  categories: Category[]
}

export function Categories({ categories }: CategoriesProps) {
  const params = useSearchParams()
  const category = params?.get("category")

  return (
    <div className="container">
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map((item) => (
          <CategoryBox
            key={item.id}
            label={item.name}
            icon={item.icon}
            selected={category === item.name}
          />
        ))}
      </div>
    </div>
  )
}
