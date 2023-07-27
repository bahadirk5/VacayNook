import { CommentItem } from "@/components/comment-item"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Comments"
        text="Create and manage comments."
      ></DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <CommentItem.Skeleton />
        <CommentItem.Skeleton />
        <CommentItem.Skeleton />
        <CommentItem.Skeleton />
        <CommentItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
