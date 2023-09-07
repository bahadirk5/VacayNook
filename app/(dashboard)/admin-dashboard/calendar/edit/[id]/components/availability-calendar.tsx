"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AvailableDays } from "@prisma/client"
import { DateRange } from "react-day-picker"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const FormSchema = z.object({
  available_days: z.object(
    { to: z.date(), from: z.date() },
    {
      required_error: "Dates are required.",
    }
  ),
})

interface AvailabilityCalendarProps {
  availableDays: AvailableDays
}

export function AvailabilityCalendar({
  availableDays,
}: AvailabilityCalendarProps) {
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const disabledDays = [{ before: new Date() }]

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      available_days: { to: availableDays.to, from: availableDays.from },
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSaving(true)

    const response = await fetch(`/api/available-days/${availableDays.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: data.available_days.to,
        from: data.available_days.from,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your date was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Success.",
    })

    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="available_days"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Calendar
                numberOfMonths={2}
                mode="range"
                disabled={disabledDays}
                selected={field.value}
                onSelect={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSaving}>
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  )
}
