import * as React from "react"
import * as icons from "lucide-react"

interface DynamicIconProps extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof icons
}

export function DynamicIcons({ name, className, ...props }: DynamicIconProps) {
  const Icon = icons[name]

  if (!Icon) {
    return null
  }
  // @ts-ignore
  return <Icon className={className} {...props} />
}
