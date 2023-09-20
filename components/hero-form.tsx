"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const heroFormSchema = z.object({
  title: z.string(),
  description: z.string(),
})

type heroFormValues = z.infer<typeof heroFormSchema>

export function HeroForm({
  title,
  description,
}: {
  title?: string
  description?: string
}) {
  const form = useForm<heroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      title: title,
      description: description,
    },
    mode: "onChange",
  })
  const [isLoading, setIsloading] = React.useState<boolean>(false)
  const router = useRouter()

  async function onSubmit(data: heroFormValues) {
    setIsloading(true)
    try {
      await axios.patch("/api/hero-section", {
        title: data.title,
        description: data.description,
      })

      setIsloading(false)

      router.refresh()
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Header</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Update
          {isLoading && <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  )
}
