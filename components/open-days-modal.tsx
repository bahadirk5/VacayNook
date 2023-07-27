"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AvailableDays } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import { Icons } from "./icons"

const FormSchema = z.object({
  available_days: z.object(
    { to: z.date(), from: z.date() },
    {
      required_error: "Dates are required.",
    }
  ),
})

interface OpenDaysModalProps {
  listingId: string
  availableDays: AvailableDays[]
}

export function OpenDaysModal({
  listingId,
  availableDays,
}: OpenDaysModalProps) {
  const [open, setOpen] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const router = useRouter()

  const isDateAvailable = (date: any) => {
    for (const availableDay of availableDays) {
      const from = new Date(availableDay.from)
      const to = new Date(availableDay.to)

      if (date >= from && date <= to) {
        return true
      }
    }

    return false
  }

  const isDateDisabled = (date: any) => {
    return isDateAvailable(date)
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSaving(true)

    const response = await fetch(`/api/available-days/${listingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: data.available_days.to,
        from: data.available_days.from,
      }),
    })

    setIsSaving(false)
    setOpen(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your lisitng was not created. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Success.",
    })

    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Open Days</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="available_days"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Available Days</FormLabel>
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    disabled={isDateDisabled}
                    className="mx-auto"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSaving}>
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
