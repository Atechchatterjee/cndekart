"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Form, FormProvider } from "react-hook-form";
import { z } from "zod";

const signUpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Your name should be atleast 2 characters",
  }),
  emailId: z
    .string()
    .regex(
      new RegExp(
        "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/"
      ),
      {
        message: "Not a valid email address",
      }
    ),
  phoneNo: z.string().min(10, {
    message: "Not a valid phone number",
  }),
  password: z
    .string()
    .regex(new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$"), {
      message:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
    }),
  GSTNo: z
    .string()
    .regex(
      new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")
    )
    .optional(),
  PanNo: z.string().regex(new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}")).optional(),
  address: z.string().optional(),
});
export default function Test() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      emailId: "",
      phoneNo: "",
      password: "",
      GSTNo: "",
      PanNo: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    console.log(values);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
