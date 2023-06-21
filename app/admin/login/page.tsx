"use client";
import { sora } from "@/app/fonts";
import { signUpFormSchemaPage2 } from "@/app/login/formSchema";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";

export default function AdminLogin() {
  const form = useForm<{ email: string; password: string }>({
    resolver: zodResolver(signUpFormSchemaPage2),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit() {
    const res = await signIn("credentials", {
      ...form.getValues(),
      type: "ADMIN",
      redirect: false,
    });
    if (res?.error) {
      if (res.error === "Invalid Password" || res.error === "Empty Credentials")
        form.setError("password", { message: res.error });
      if (res.error === "Invalid Email" || res.error === "Empty Credentials")
        form.setError("email", { message: res.error });
      if (res.error === "Not an admin user")
        form.setError("email", { message: res.error });
    } else {
      alert("You are an admin");
    }
  }
  return (
    <div className="bg-slate-200 h-[100svh] overflow-x-auto">
      <Navbar />
      <Card className="flex flex-col gap-10 pt-3 pl-4 pr-4 mb-[6rem] w-[35rem] bg-white rounded-lg shadow-xl shadow-slate-300 left-0 right-0 top-0 bottom-0 m-auto mt-[6rem]">
        <CardHeader>
          <CardTitle className={`${sora.className} text-2xl font-bold`}>
            Admin Login
          </CardTitle>
          <CardDescription>
            This portal is for administrators only. If you are an admin then you
            can sign in using your designated email id and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardDescription>
                Having issues logging in? Email the our team @atechchatterjee
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <form
                  className="space-y-5"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Id</FormLabel>
                          <FormControl>
                            <Input placeholder="example@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="*****************"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button variant="primary" className="w-full" type="submit">
                    Submit
                  </Button>
                  <Button variant="secondary" className="w-full gap-3">
                    <BsGoogle />
                    Google Sign
                  </Button>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
