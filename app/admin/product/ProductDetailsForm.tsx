"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { ProductFormValues } from "./type";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ProductDetailsForm({
  form,
}: {
  form: UseFormReturn<ProductFormValues>;
}) {
  const [triggerFetchUnits, setTriggerFetchUnits] = useState<boolean>(false);
  const [triggerFetchCategories, setTriggerFetchCategories] =
    useState<boolean>(false);

  const { data: allUnits, isLoading: isLoadingUnits } =
    trpc.fetchUnits.useQuery({}, { enabled: triggerFetchUnits });

  const { data: allCategories, isLoading: isLoadingCategories } =
    trpc.fetchCategories.useQuery({}, { enabled: triggerFetchCategories });

  return (
    <Card className="flex-1">
      <CardContent>
        <FormProvider {...form}>
          <form className="space-y-5 mt-5">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Title" {...field} />
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
                      <Input
                        placeholder="Product Description"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 w-full">
                <FormField
                  control={form.control}
                  name="range"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Range</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Price Range"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        format: &quot;(lower limit)-(upper limit)&quot; eg: 1-2
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="₹ Product Price"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <Select
                        onOpenChange={() => setTriggerFetchCategories(true)}
                        onValueChange={(value) =>
                          field.onChange({
                            target: { name: field.name, value: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Product Category"
                            {...field}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {!isLoadingCategories ? (
                            allCategories?.map((category, i) => (
                              <SelectItem value={category.id} key={i}>
                                {category.category}
                              </SelectItem>
                            ))
                          ) : (
                            <LoadingSpinner className="justify-center" />
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select
                        onOpenChange={() => setTriggerFetchUnits(true)}
                        onValueChange={(value) =>
                          field.onChange({
                            target: { name: field.name, value: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Product Unit" {...field} />
                        </SelectTrigger>
                        <SelectContent className="flex flex-col">
                          {!isLoadingUnits ? (
                            allUnits?.map((unit, i) => (
                              <SelectItem value={unit.id} key={i}>
                                {unit.unit}
                              </SelectItem>
                            ))
                          ) : (
                            <LoadingSpinner className="justify-center" />
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gst"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST</FormLabel>
                    <FormControl>
                      <Input placeholder="Product GST" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
