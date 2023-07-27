import { Comment } from "@prisma/client"

import { Skeleton } from "@/components/ui/skeleton"
import { CommentOperations } from "@/components/comment-operations"

interface CommentItemProps {
  comment: Pick<Comment, "id" | "name" | "message">
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <div className="font-semibold hover:underline">{comment.name}</div>
        <p className="text-sm text-muted-foreground">{comment.message}</p>
      </div>
      <CommentOperations comment={{ id: comment.id }} />
    </div>
  )
}

CommentItem.Skeleton = function CategoryItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
