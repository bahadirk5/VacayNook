"use client"

import { useCallback } from "react"
import Image from "next/image"
import { Camera } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

export default function Test({ onChange, value }: ImageUploadProps) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange]
  )
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="saiktqjz"
      options={{ maxFiles: 3 }}
    >
      {({ open }) => {
        return (
          <Button onClick={() => open?.()}>
            <Camera className="mr-2 h-4 w-4" /> Upload 
          </Button>
        )
      }}
    </CldUploadWidget>
  )
}
