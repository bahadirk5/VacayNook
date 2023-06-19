"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { toast } from "@/components/ui/use-toast"

export function ImageCard({
  url,
  publicId,
}: {
  url: string
  publicId: string
}) {
  const [isLoading, setIsloading] = React.useState<boolean>(false)

  const router = useRouter()

  async function deleteImage(publicId?: string | undefined) {
    setIsloading(true)
    try {
      await axios.delete(`/api/image/${publicId}`)
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
        width={200}
        height={300}
        className="rounded-md"
      />
      <Button
        className="absolute top-2 right-2"
        disabled={isLoading}
        variant="destructive"
        onClick={async (e: any) => {
          e.preventDefault()
          await deleteImage(publicId)
          router.refresh()
        }}
      >
        {isLoading ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Icons.trash className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
