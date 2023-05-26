import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function PropertyCard() {
  return (
    <div className="group relative col-span-1 cursor-pointer">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Image
          fill
          className="h-full w-full object-cover transition group-hover:scale-110"
          src="/villa.webp"
          alt="Listing"
        />
        <div className="absolute right-3 top-3">
          <Button size="sm" className=" bg-transparent hover:bg-transparent">
            <Icons.heart className="fill-neutral-500/70" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Cape Villa at Sounio</div>
        <div className="flex">
          <Icons.star className="w-4 fill-black" />
          4.5
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Lavrion, Attica, Yunanistan
      </p>
      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">299$</div>
      </div>
    </div>
  )
}
