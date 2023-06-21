"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface CounterProps {
  title: string
  value: number
  max: number
  onChange: (value: number) => void
}

export function Counter({ title, value, max, onChange }: CounterProps) {
  const onAdd = React.useCallback(() => {
    if (value === max) return false
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = React.useCallback(() => {
    if (title === "Adults") {
      if (value === 1) return
    } else {
      if (value === 0) {
        return
      }
    }

    onChange(value - 1)
  }, [onChange, value])

  return (
    <div className="grid grid-cols-2 items-center justify-between gap-4">
      <Label htmlFor="infants">{title}</Label>
      <div className="flex justify-end">
        <div className="flex flex-row items-center gap-4">
          <Button
            onClick={onReduce}
            className="h-8 w-8 rounded-full p-2"
            variant="outline"
          >
            <Minus />
          </Button>
          <div>{value}</div>
          <Button
            onClick={onAdd}
            className="h-8 w-8 rounded-full p-2"
            variant="outline"
            disabled={!onAdd}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  )
}
