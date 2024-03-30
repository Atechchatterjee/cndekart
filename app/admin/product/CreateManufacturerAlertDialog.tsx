"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { trpc } from "@/utils/trpc";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IoMdClose } from "react-icons/io";
import autoAnimate from "@formkit/auto-animate";
import { cn } from "@/lib/utils";
import { GiWeight } from "react-icons/gi";
import { MdFactory } from "react-icons/md";

export default function CreateManufacturerAlertDialog({
  manufacturers,
  isLoading,
  refetch,
}: {
  manufacturers: any[];
  isLoading: boolean;
  refetch: Function;
}) {
  const form = useForm<{ manufacturer: string }>({
    defaultValues: { manufacturer: "" },
  });
  const [open, setOpen] = useState<boolean>(false);
  const [unitToDelete, setUnitToDelete] = useState<string>("");
  const animationParent = useRef(null);

  const createManufacturerMutation = trpc.createManufacturer.useMutation();
  const deleteManufacturerMutation = trpc.deleteManufacturer.useMutation();

  useEffect(() => {
    if (open && manufacturers.length === 0) refetch();
    if (animationParent.current) autoAnimate(animationParent.current);
  }, [open, manufacturers]);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex gap-3 self-end"
          onClick={() => setOpen(!open)}
        >
          <MdFactory size={17} />
          Manufacturers
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Manufacturers</AlertDialogTitle>
          <AlertDialogDescription>
            Fill This form to add manufacturers for products.
          </AlertDialogDescription>
          <div
            ref={animationParent}
            className="flex flex-col gap-2 w-full pt-5"
          >
            {isLoading ? (
              <LoadingSpinner className="justify-center self-center" />
            ) : (
              manufacturers?.map((manufacturer, i) => (
                <div
                  className="flex flex-1 border border-slate-200 rounded-lg p-3 text-sm"
                  key={i}
                >
                  {manufacturer.name}
                  <IoMdClose
                    className={cn(
                      "ml-auto self-center cursor-pointer hover:text-primary",
                      deleteManufacturerMutation.isLoading &&
                        unitToDelete === manufacturer.id &&
                        "hidden"
                    )}
                    onClick={() => {
                      setUnitToDelete(manufacturer.id);
                      deleteManufacturerMutation.mutate(
                        {
                          id: manufacturer.id,
                        },
                        {
                          onSuccess: () => {
                            refetch();
                          },
                        }
                      );
                    }}
                  />
                  {deleteManufacturerMutation.isLoading &&
                    unitToDelete === manufacturer.id && (
                      <LoadingSpinner className="ml-auto self-center" />
                    )}
                </div>
              ))
            )}
          </div>
          <FormProvider {...form}>
            <form
              className="pt-5 pb-5"
              onSubmit={async (e) => {
                const { manufacturer } = form.getValues();
                console.log({ manufacturer });
                createManufacturerMutation.mutate(
                  { name: manufacturer },
                  {
                    onSuccess: () => {
                      refetch();
                      form.reset();
                    },
                  }
                );
                e.preventDefault();
              }}
            >
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>
                    <FormControl>
                      <Input placeholder="Create Manufacturer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-end mt-8">
                <Button variant="primary">
                  {createManufacturerMutation.isLoading ? (
                    <LoadingSpinner className="self-center" />
                  ) : (
                    "Create"
                  )}
                </Button>
                <AlertDialogCancel onClick={() => setOpen(false)}>
                  Cancel
                </AlertDialogCancel>
              </div>
            </form>
          </FormProvider>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
