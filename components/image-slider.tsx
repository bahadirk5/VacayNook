"use client"

import * as React from "react"
import Image from "next/image"
import { Images } from "@prisma/client"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface ImageSliderProps {
  images: Images[]
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [curr, setCurr] = React.useState<number>(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1))

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
      <div className="flex">
        <Image
          fill
          className="h-full w-full object-cover transition"
          src={images[curr].url}
          alt="Image of summer villa"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-1">
        <Button
          onClick={prev}
          variant="ghost"
          className={cn("rounded-full p-2")}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={next}
          variant="ghost"
          className={cn("rounded-full p-2")}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="absolute right-3 top-3">
        <Button size="sm" className=" bg-transparent hover:bg-transparent">
          <Icons.heart className="fill-neutral-500/70" />
        </Button>
      </div>
      <div className="absolute inset-x-0 bottom-4">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <div
              // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
              className={`
              h-1 w-1 rounded-full bg-white transition-all ${curr === i ? "p-1" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
