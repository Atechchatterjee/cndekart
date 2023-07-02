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
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CreateUnitAlertDialog({
  createCb,
}: {
  createCb?: Function;
}) {
  const form = useForm<{ unit: string }>({ defaultValues: { unit: "" } });
  const [open, setOpen] = useState<boolean>(false);

  const createUnitMutation = trpc.createUnit.useMutation();

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          variant="primary"
          className="self-end"
          onClick={() => setOpen(!open)}
        >
          Create Units
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Units</AlertDialogTitle>
          <AlertDialogDescription>
            Fill This form to create units for products.
          </AlertDialogDescription>
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
                      setOpen(false);
                      form.reset();
                      if (createCb) createCb();
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
                      <Input placeholder="Product Title" {...field} />
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
