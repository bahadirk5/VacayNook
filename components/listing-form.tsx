"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { LocationForm } from "@/components/location-form"

const essentials = [
  {
    id: "wifi",
    label: "Wifi",
  },
  {
    id: "kitchen",
    label: "Kitchen",
  },
  {
    id: "washing_machine",
    label: "Washing Machine",
  },
  {
    id: "dryer",
    label: "Dryer",
  },
  {
    id: "air_conditioning",
    label: "Air conditioning",
  },
  {
    id: "heating",
    label: "Heating",
  },
  {
    id: "dedicated_workspace",
    label: "Dedicated workspace",
  },
  {
    id: "tv",
    label: "TV",
  },
  {
    id: "hair_dryer",
    label: "Hair Dryer",
  },
  {
    id: "iron",
    label: "Iron",
  },
] as const

const features = [
  {
    id: "pool",
    label: "Pool",
  },
  {
    id: "hot_tub",
    label: "Hot tub",
  },
  {
    id: "free_parking_on_premises",
    label: "Free parking on premises",
  },
  {
    id: "ev_charger",
    label: "EV charger",
  },
  {
    id: "cot",
    label: "Cot",
  },
  {
    id: "gym",
    label: "Gym",
  },
  {
    id: "bbq_grill",
    label: "BBQ grill",
  },
  {
    id: "breakfast",
    label: "Breakfast",
  },
  {
    id: "indoor_fireplace",
    label: "Indoor fireplace",
  },
  {
    id: "smoking_allowed",
    label: "Smoking allowed",
  },
] as const

const postFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  description: z.string().max(160).min(4),
  location: z
    .string()
    .min(2, {
      message: "Location must be at least 2 characters.",
    })
    .max(30, {
      message: "Location must not be longer than 30 characters.",
    }),
  essentials: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  latlng: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

type PostFormValues = z.infer<typeof postFormSchema>

// This can come from your database or API.
const defaultValues: Partial<PostFormValues> = {
  essentials: [],
  features: [],
}

export default function ListingForm() {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
  })

  function onSubmit(data: PostFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-0">
          <h3 className="text-lg font-medium">General Info</h3>
          <p className="text-muted-foreground text-sm">
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
                <Input placeholder="shadcn" {...field} />
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
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
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
                <Input placeholder="shadcn" {...field} />
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
          <p className="text-muted-foreground text-sm">
            This is how others will see you on the site.
          </p>
          <Separator className="my-7" />
        </div>
        <div className="space-y-0">
          <h3 className="text-lg font-medium">Location</h3>
          <p className="text-muted-foreground text-sm">
            This is how others will see you on the site.
          </p>
          <Separator className="my-7" />
        </div>
        <FormField
          control={form.control}
          name="latlng"
          render={({ field }) => (
            <LocationForm
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <div className="space-y-0">
          <h3 className="text-lg font-medium">Amenities</h3>
          <p className="text-muted-foreground text-sm">
            This is how others will see you on the site.
          </p>
          <Separator className="my-7" />
        </div>
        <div className="space-y-5 sm:flex sm:gap-10 md:space-y-0">
          <FormField
            control={form.control}
            name="essentials"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Essentials</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {essentials.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="essentials"
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
                            {item.label}
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
            name="features"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Features</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {features.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="features"
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
                            {item.label}
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
        <div className="space-y-0">
          <h3 className="text-lg font-medium">Image</h3>
          <p className="text-muted-foreground text-sm">
            This is how others will see you on the site.
          </p>
          <Separator className="my-7" />
        </div>
        <Button type="submit">Submit post</Button>
      </form>
    </Form>
  )
}
