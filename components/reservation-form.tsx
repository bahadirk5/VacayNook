"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const reservationFormSchema = z.object({
  phone_number: z.string(),
})

type reservationFormValues = z.infer<typeof reservationFormSchema>

interface ReservationFormProps {
  adults: number
  childrn: number
  infants: number
  from: Date
  to: Date
  listingId: string
}

export function ReservationForm({
  adults,
  childrn,
  infants,
  from,
  to,
  listingId,
}: ReservationFormProps) {
  const form = useForm<reservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      phone_number: "",
    },
  })
  const [isLoading, setIsloading] = React.useState<boolean>(false)

  async function onSubmit(data: z.infer<typeof reservationFormSchema>) {
    setIsloading(true)
    try {
      await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adults,
          children: childrn,
          infants,
          from,
          to,
          listingId,
          contact: data.phone_number,
        }),
      })

      setIsloading(false)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please provide an accurate phone number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Reserve
          {isLoading && <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  )
}
