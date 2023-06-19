"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon, CheckSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Counter } from "@/components/counter"
import { Icons } from "@/components/icons"

const reservationFormSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z.coerce.number(),
  children: z.coerce.number(),
  infants: z.coerce.number(),
})

type ReservationFormValues = z.infer<typeof reservationFormSchema>

export function ReservationCard({ price }: { price: number }) {
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      adults: 1,
      children: 0,
      infants: 0,
    },
  })

  const disabledDays = [{ before: new Date() }]

  function onSubmit(data: ReservationFormValues) {
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {price}$ / night
          </h4>
          <div className="flex font-semibold">
            <Icons.star className="w-4" />
            4.5
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check in - Check out</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !field?.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field?.value?.from ? (
                            field.value?.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          disabled={disabledDays}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 space-y-2">
              <Label htmlFor="guest" className="shrink-0">
                Guests
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-md"
                  >
                    {form.getValues("adults")} Adults,{" "}
                    {form.getValues("children")} children,{" "}
                    {form.getValues("infants")} infants
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        This place has a maximum of 4 guests, not including
                        infants.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Counter
                                onChange={field.onChange}
                                value={field.value}
                                title="Adults"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="children"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Counter
                                onChange={field.onChange}
                                value={field.value}
                                title="Children"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="infants"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Counter
                                onChange={field.onChange}
                                value={field.value}
                                title="Infants"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Button className="w-full" type="submit">
                <CheckSquare className="mr-2 h-4 w-4" /> Reserve
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
