"use client"

import * as React from "react"
import Lightbox from "yet-another-react-lightbox"

import "yet-another-react-lightbox/styles.css"
import Image from "next/image"

import NextJsImage from "@/components/NextJsImage"

interface ImageGalleryProps {
  slides: {
    url: string
  }[]
}

export function ImageGallery({ slides }: ImageGalleryProps) {
  const [index, setIndex] = React.useState(-1)

  const data = []
  for (let i = 0; i < slides.length; i++) {
    data.push({ src: slides[i].url })
  }

  return (
    <>
      {slides.map((image, index) => (
        <Image
          src={image.url}
          className="rounded-lg cursor-pointer"
          alt="listing photo"
          width={720}
          height={480}
          onClick={() => setIndex(index)}
        />
      ))}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={data}
        render={{ slide: NextJsImage }}
      />
    </>
  )
}
