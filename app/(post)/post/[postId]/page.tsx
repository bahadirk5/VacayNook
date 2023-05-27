import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import ListingForm from "@/components/listing-form"

interface PostPageProps {
  params: { postId: string }
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin-dashboard"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-col justify-center">
        <ListingForm />
      </div>
    </div>
  )
}
