import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
import { buttonVariants } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

import { columns } from "./components/columns"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const listing = await db.listing.findMany({
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <Link href="/post" className={buttonVariants()}>
          <Icons.add className="mr-2 h-4 w-4" /> New post
        </Link>
      </DashboardHeader>
      <div>
        {listing?.length ? (
          <DataTable columns={columns} data={listing} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <Link
              href="/post"
              className={buttonVariants({ variant: "outline" })}
            >
              <Icons.add className="mr-2 h-4 w-4" /> New post
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
