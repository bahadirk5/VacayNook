"use client"

import { getTextMessageInput, sendMessage } from "@/actions/message"

import { Button } from "@/components/ui/button"

export function SendRequest() {
  async function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    const data = getTextMessageInput(5053666085, "deneme 2")

    const response = await sendMessage(data)

    console.log(response)
  }

  return <Button onClick={handleClick}>Request to book</Button>
}
