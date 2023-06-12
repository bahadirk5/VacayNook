"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

import { cn } from "@/lib/utils"
import { DynamicIcons } from "@/components/dynamic-icons"

interface CategoryBoxProps {
  label: string
  icon: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon, selected }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (params?.get("category") === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }, [label, router, params])

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center text-muted-foreground justify-center gap-2 p-3 border-b-2 transition cursor-pointer",
        selected ? "border-b-primary text-primary" : "border-transparent"
      )}
    >
      {/* @ts-ignore */}
      <DynamicIcons name={icon} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
