import { notFound } from "next/navigation"
import { Category } from "@prisma/client"

import { db } from "@/lib/db"
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
