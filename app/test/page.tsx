"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

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

interface ImageProps {
  publicId?: string
  url?: string
}

export default function Test() {
  const [file, setFile] = React.useState<File[]>([])
  const [link, setLinks] = React.useState<ImageProps[]>([])
  const [isLoading, setIsloading] = React.useState<boolean>(false)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsloading(true)
    try {
      let arr: any = []
      for (let i = 0; i < file.length; i++) {
        const data = await uploadCloudinary(file[i])
        arr.push(data)
      }
      setLinks(arr)
    } catch (error) {
      console.log(error)
    }
    setIsloading(false)
  }

  async function deleteImage(publicId?: string | undefined) {
    setIsloading(true)
    try {
      await axios.post(`/api/image/${publicId}`)
    } catch (error) {
      console.log(error)
    }
    setIsloading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          multiple={true}
          onChange={(e: any) => setFile(e.target.files)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.post className="mr-2 h-4 w-4" />
          )}
          Upload
        </Button>
      </form>
      {link &&
        link.map((image) => (
          <div key={image.publicId}>
            <Image
              src={image.url || "/google.png"}
              width={300}
              height={300}
              alt="villa"
            />
            <Button
              disabled={isLoading}
              variant="destructive"
              onClick={async (e: any) => {
                e.preventDefault()
                await deleteImage(image.publicId)
                router.refresh()
              }}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
    </div>
  )
}
