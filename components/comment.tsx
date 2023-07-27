import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

interface CommentProps {
  image?: string | null
  name: string | null
  message: string
  createdAt: Date
}

export default function Comment({
  image,
  name,
  message,
  createdAt,
}: CommentProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar>
          {image ? (
            <AvatarImage alt="Picture" src={image} />
          ) : (
            <AvatarFallback>
              <span className="sr-only">{name}</span>
              <Icons.user className="h-6 w-6" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="text-lg font-semibold">{name}</div>
        <p className="text-muted-foreground">
          {format(new Date(createdAt), "LLL dd, y")}
        </p>
      </div>
      <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-4">
        {message}{" "}
      </p>
      <Separator className="my-4" />
    </div>
  )
}
