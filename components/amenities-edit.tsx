"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Amenities, AmenitiesTitles } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const AmenitiesArr = [
  {
    value: "ESSENTIALS",
    label: "Essentials",
  },
  {
    value: "FEATURES",
    label: "Features",
  },
  {
    value: "SAFETY",
    label: "Safety",
  },
  {
    value: "LOCATION",
    label: "Location",
  },
] as const

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  title: z.nativeEnum(AmenitiesTitles, {
    required_error: "Please select an email to display.",
  }),
  icon: z.string(),
})

interface AmenitiesEditProps {
  amenities: Pick<Amenities, "id" | "title" | "name" | "icon">
}

export function AmenitiesEdit({ amenities }: AmenitiesEditProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: amenities.title,
      name: amenities.name,
      icon: amenities.icon,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true)

    const response = await fetch(`/api/amenities/${amenities.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        name: values.name,
        icon: values.icon,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.push("/admin-dashboard/amenities")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a amenities title" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AmenitiesArr.map((amenity) => (
                    <SelectItem value={amenity.value}>
                      {amenity.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSaving}>
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  )
}
