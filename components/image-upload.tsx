"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { toast } from "@/components/ui/use-toast"

async function uploadCloudinary(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "saiktqjz")

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    formData
  )

  if (!data) {
    return new Error("Upload Error")
  }

  return { publicId: data?.public_id, url: data?.secure_url }
}

export function ImageUpload({ listingId }: { listingId: string }) {
  const [file, setFile] = React.useState<File[]>([])
  const [isLoading, setIsloading] = React.useState<boolean>(false)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsloading(true)
    try {
      let listingImages: any = []
      for (let i = 0; i < file.length; i++) {
        const data = await uploadCloudinary(file[i])
        listingImages.push(data)
      }

      const response = await fetch(`/api/image/${listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingImages }),
      })

      setIsloading(false)

      router.refresh()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <Input
            type="file"
            multiple={true}
            onChange={(e: any) => setFile(e.target.files)}
          />
          <Button type="submit" disabled={isLoading || file.length === 0}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.post className="mr-2 h-4 w-4" />
            )}
            Upload
          </Button>
        </div>
      </form>
    </div>
  )
}
