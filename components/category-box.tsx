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

export function CategoryBox({ label, icon, selected }: CategoryBoxProps) {
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
        "flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 text-muted-foreground transition",
        selected ? "border-b-primary text-primary" : "border-transparent"
      )}
    >
      {/* @ts-ignore */}
      <DynamicIcons name={icon} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  )
}
