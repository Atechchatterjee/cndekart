"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import CreateUnitAlertDialog from "./CreateUnitAlertDialog";

export default function ProductDetailsForm({
  form,
}: {
  form: UseFormReturn<ProductFormValues>;
}) {
  const [fetchedUnits, setFetchedUnits] = useState<boolean>(false);
  const [fetchedCategories, setFetchedCategories] = useState<boolean>(false);

  const {
    data: allUnits,
    isLoading: isLoadingUnits,
    refetch: refetchUnits,
  } = trpc.fetchUnits.useQuery(
    {},
    {
      enabled: false,
    }
  );

  const {
    data: allCategories,
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = trpc.fetchCategories.useQuery({}, { enabled: false });

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
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <Select
                          onOpenChange={() => {
                            if (!fetchedCategories) {
                              refetchCategories();
                              setFetchedCategories(true);
                            }
                          }}
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
                <Button variant="primary" className="self-end">
                  Create Category
                </Button>
              </div>
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Select
                          onOpenChange={() => {
                            if (!fetchedUnits) {
                              refetchUnits();
                              setFetchedUnits(true);
                            }
                          }}
                          onValueChange={(value) =>
                            field.onChange({
                              target: { name: field.name, value: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Product Unit"
                              {...field}
                            />
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
                <CreateUnitAlertDialog createCb={() => refetchUnits()} />
              </div>
              <div className="flex gap-3 w-full">
                <FormField
                  control={form.control}
                  name="sgst"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>SGST</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product SGST"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cgst"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>CGST</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product CGST"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="igst"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>IGST</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product IGST"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
