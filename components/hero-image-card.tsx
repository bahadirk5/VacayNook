"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export function HeroImageCard({
  url,
  publicId,
}: {
  url: string
  publicId: string
}) {
  const [isLoading, setIsloading] = React.useState<boolean>(false)

  const router = useRouter()

  async function deleteImage(publicId: string) {
    setIsloading(true)
    try {
      await axios.delete(`/api/hero-section/image`, { data: { publicId } })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      })
    }
    setIsloading(false)
  }
  return (
    <div className="relative">
      <Image
        src={url}
        alt={""}
        width={400}
        height={400}
        className="rounded-md"
      />
      <Button
        className="absolute right-2 top-2"
        disabled={isLoading}
        variant="destructive"
        onClick={async (e: any) => {
          e.preventDefault()
          await deleteImage(publicId)
          router.refresh()
        }}
      >
        Delete image
        {isLoading ? (
          <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.trash className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
