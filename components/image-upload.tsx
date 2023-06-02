"use client"

import { useCallback } from "react"
import Image from "next/image"
import { Camera } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"

import { Button } from "@/components/ui/button"

declare global {
  var cloudinary: any
}

const uploadPreset = "saiktqjz"

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

export function ImageUpload({ onChange, value }: ImageUploadProps) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
      console.log(result)
    },
    [onChange]
  )
  return (
    <>
      {value && (
        <div className="overflow-hidden rounded-md">
          <Image
            src={value}
            alt="villa"
            width={250}
            height={300}
            className="portrait h-auto w-auto object-cover transition-all hover:scale-105"
          />
        </div>
      )}
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset={uploadPreset}
        options={{ maxFiles: 10 }}
      >
        {({ open }) => {
          return (
            <Button onClick={() => open?.()}>
              <Camera className="mr-2 h-4 w-4" />
              <span>Upload</span>
            </Button>
          )
        }}
      </CldUploadWidget>
    </>
  )
}
