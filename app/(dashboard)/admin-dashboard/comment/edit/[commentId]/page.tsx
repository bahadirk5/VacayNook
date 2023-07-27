import { notFound, redirect } from "next/navigation"
import { Category } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import getCurrentUser from "@/lib/session"
import { CommentEdit } from "@/components/comment-edit"

async function getCategory(commentId: Category["id"]) {
  return await db.comment.findFirst({
    where: {
      id: commentId,
    },
  })
}

interface UpdateCategoryProps {
  params: { commentId: string }
}

export default async function UpdateCategory({ params }: UpdateCategoryProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const comment = await getCategory(params.commentId)

  if (!comment) {
    notFound()
  }

  return (
    <CommentEdit
      comment={{
        id: comment.id,
        name: comment.name,
        message: comment.message,
        listingId: comment.listingId,
      }}
    />
  )
}
