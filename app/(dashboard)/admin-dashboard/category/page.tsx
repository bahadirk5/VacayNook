import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
import { CategoryItem } from "@/components/category-item"
import { CategoryModal } from "@/components/category-modal"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Category",
}

export default async function Category() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  const categories = await db.category.findMany()

  return (
    <DashboardShell>
      <DashboardHeader heading="Category" text="Create and manage categories.">
        <CategoryModal />
      </DashboardHeader>
      <div>
        {categories?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No category created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <CategoryModal />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
