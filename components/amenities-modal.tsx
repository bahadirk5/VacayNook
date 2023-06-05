"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AmenitiesTitles } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const amenitiesFormSchema = z.object({
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

type AmenitiesFormValues = z.infer<typeof amenitiesFormSchema>

const defaultValues: Partial<AmenitiesFormValues> = {}

interface AmenitiesModalProps {
  variant?: string
}

export function AmenitiesModal({variant}: AmenitiesModalProps) {
  const router = useRouter()

  const form = useForm<AmenitiesFormValues>({
    resolver: zodResolver(amenitiesFormSchema),
    defaultValues,
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: AmenitiesFormValues) {
    setIsSaving(true)

    const response = await fetch("/api/amenities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        title: data.title,
        icon: data.icon,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your amenities was not created. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your amenities has been created.",
    })

    router.refresh()
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* @ts-ignore */}
        <Button variant={variant && variant}>
          <Icons.add className="mr-2 h-4 w-4" /> New amenities
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create amenities</DialogTitle>
          <DialogDescription>
            Add a new amenities to manage products.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amenities name</FormLabel>
                        <FormControl>
                          <Input placeholder="Wifi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>https://lucide.dev/</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
