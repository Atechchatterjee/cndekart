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

export default function CreateUnitAlertDialog({
  units,
  isLoading,
  refetch,
}: {
  units: any[];
  isLoading: boolean;
  refetch: Function;
}) {
  const form = useForm<{ unit: string }>({ defaultValues: { unit: "" } });
  const [open, setOpen] = useState<boolean>(false);
  const [unitToDelete, setUnitToDelete] = useState<string>("");
  const animationParent = useRef(null);

  const createUnitMutation = trpc.createUnit.useMutation();
  const deleteUnitMutation = trpc.deleteUnit.useMutation();

  useEffect(() => {
    if (open && units.length === 0) refetch();
    if (animationParent.current) autoAnimate(animationParent.current);
  }, [open, units]);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex gap-3 self-end"
          onClick={() => setOpen(!open)}
        >
          <GiWeight size={17} />
          Units
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Units</AlertDialogTitle>
          <AlertDialogDescription>
            Fill This form to create units for products.
          </AlertDialogDescription>
          <div
            ref={animationParent}
            className="flex flex-col gap-2 w-full pt-5"
          >
            {isLoading ? (
              <LoadingSpinner className="justify-center self-center" />
            ) : (
              units?.map((unit, i) => (
                <div
                  className="flex flex-1 border border-slate-200 rounded-lg p-3 text-sm"
                  key={i}
                >
                  {unit.unit}
                  <IoMdClose
                    className={cn(
                      "ml-auto self-center cursor-pointer hover:text-primary",
                      deleteUnitMutation.isLoading &&
                        unitToDelete === unit.id &&
                        "hidden"
                    )}
                    onClick={() => {
                      setUnitToDelete(unit.id);
                      deleteUnitMutation.mutate(
                        {
                          unitId: unit.id,
                        },
                        {
                          onSuccess: () => {
                            refetch();
                          },
                        }
                      );
                    }}
                  />
                  {deleteUnitMutation.isLoading && unitToDelete === unit.id && (
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
                const { unit } = form.getValues();
                console.log({ unit });
                createUnitMutation.mutate(
                  { unit },
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
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="Create Unit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-end mt-8">
                <Button variant="primary">
                  {createUnitMutation.isLoading ? (
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
