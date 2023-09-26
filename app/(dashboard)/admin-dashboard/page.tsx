import Link from "next/link"

import { db } from "@/lib/db"
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
      <div className="overflow-x-auto">
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
