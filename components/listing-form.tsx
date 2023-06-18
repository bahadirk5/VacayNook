"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Amenities, Category, Listing } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { LocationForm } from "@/components/location-form"

import { Icons } from "./icons"

const postFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  categoryId: z.string(),
  description: z.string().min(4),
  location: z
    .string()
    .min(2, {
      message: "Location must be at least 2 characters.",
    })
    .max(30, {
      message: "Location must not be longer than 30 characters.",
    }),
  amenities: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  latlng: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  roomCount: z.number().max(3),
  bathRoomCount: z.number().max(3),
  bedCount: z.number().max(3),
  adultCount: z.number().max(3),
  childrenCount: z.number().max(3),
  infantCount: z.number().max(3),
  price: z.number(),
})

type PostFormValues = z.infer<typeof postFormSchema>

interface ListingFormProps {
  categories: Pick<Category, "id" | "name" | "icon">[]
  amenities: Pick<Amenities, "id" | "title" | "name" | "icon">[]
  listing?: Listing
}

export default function ListingForm({
  categories,
  amenities,
  listing,
}: ListingFormProps) {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: listing?.title,
      description: listing?.description,
      location: listing?.location,
      price: listing?.price,
      categoryId: listing?.categoryId,
      roomCount: listing?.roomCount,
      bathRoomCount: listing?.bathRoomCount,
      adultCount: listing?.adultCount,
      childrenCount: listing?.childrenCount,
      infantCount: listing?.infantCount,
      //@ts-ignore
      latlng: listing?.latlng,
      //@ts-ignore
      amenities: listing?.amenities.map((e) => e.id) || [],
    },
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const router = useRouter()

  async function onSubmit(data: PostFormValues) {
    toast(<pre>{JSON.stringify(data)}</pre>)
    // setIsSaving(true)

    // let response: any

    // if (listing?.id) {
    //   response = await fetch(`/api/listing/${listing.id}`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    // } else {
    //   response = await fetch("/api/listing", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    // }

    // setIsSaving(false)

    // if (!response?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your lisitng was not created. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    // if (listing?.id) {
    //   toast({
    //     description: "Your listing has been updated.",
    //   })
    // } else {
    //   toast({
    //     description: "Your listing has been created.",
    //   })
    // }

    // router.push("/admin-dashboard")
    // router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-0">
          <h3 className="text-lg font-medium">General Info</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
          <Separator className="my-7" />
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display property name. You can change this
                any time.
              </FormDescription>
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
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display property name. You can change this
                any time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display property name. You can change this
                any time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-0">
          <h3 className="text-lg font-medium">Categories</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
          <Separator className="my-7" />
        </div>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage categories in category menu
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-0">
          <h3 className="text-lg font-medium">Capacity</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
          <Separator className="my-7" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="adultCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adult count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display property name. You can change this
                  any time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="childrenCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Children count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display property name. You can change this
                  any time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="infantCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Infant count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display property name. You can change this
                  any time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display property name. You can change this
                  any time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathRoomCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bath room count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display property name. You can change this
                  any time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bed count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display property name. You can change this
                  any time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-0">
          <h3 className="text-lg font-medium">Location</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
          <Separator className="my-7" />
        </div>
        <FormField
          control={form.control}
          name="latlng"
          render={({ field }) => (
            <FormItem>
              <LocationForm value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-0">
          <h3 className="text-lg font-medium">Amenities</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
          <Separator className="my-7" />
        </div>
        <div className="space-y-5 sm:flex sm:gap-10 md:space-y-0">
          <FormField
            control={form.control}
            name="amenities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Essentials</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {amenities
                  .filter((e) => e.title === "ESSENTIALS")
                  .map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Features</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {amenities
                  .filter((e) => e.title === "FEATURES")
                  .map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5 sm:flex sm:gap-10 md:space-y-0">
          <FormField
            control={form.control}
            name="amenities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Safety</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {amenities
                  .filter((e) => e.title === "SAFETY")
                  .map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Location</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {amenities
                  .filter((e) => e.title === "LOCATION")
                  .map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button type="submit" disabled={isSaving}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit post
          </Button>
        </div>
      </form>
    </Form>
  )
}
