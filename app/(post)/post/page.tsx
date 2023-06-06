import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import ListingForm from "@/components/listing-form"

interface PostPageProps {
  params: { postId: string }
}

export default async function PostPage({ params }: PostPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const categories = await db.category.findMany()
  const amenities = await db.amenities.findMany()

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
        <ListingForm categories={categories} amenities={amenities} />
      </div>
    </div>
  )
}
