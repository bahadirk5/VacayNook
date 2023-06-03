import * as React from "react"

import { Icons } from "@/components/icons"

interface DynamicIconProps extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons
}

export function DynamicIcons({ name, className, ...props }: DynamicIconProps) {
  const Icon = Icons[name]

  if (!Icon) {
    return null
  }

  return <Icon className={className} {...props} />
}
