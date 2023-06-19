"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface CounterProps {
  title: string
  value: number
  onChange: (value: number) => void
}

export function Counter({ title, value, onChange }: CounterProps) {
  const onAdd = React.useCallback(() => {
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = React.useCallback(() => {
    if (value === 1) {
      return
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
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  )
}
