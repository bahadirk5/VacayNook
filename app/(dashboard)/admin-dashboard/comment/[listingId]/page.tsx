import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
import { CommentItem } from "@/components/comment-item"
import { CommentModal } from "@/components/comment-modal"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

async function getComments(listingId: string) {
  return await db.comment.findMany({
    where: {
      listingId,
    },
  })
}

interface CommentParams {
  params: { listingId: string }
}

export default async function Comment({ params }: CommentParams) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const comments = await getComments(params.listingId)

  return (
    <DashboardShell>
      <DashboardHeader heading="Comments" text="Create and manage comments.">
        <CommentModal listingId={params.listingId} />
      </DashboardHeader>
      <div>
        {comments?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {comments.map((comment) => (
              <CommentItem comment={comment} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No comment created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <CommentModal variant="outline" listingId={params.listingId} />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
