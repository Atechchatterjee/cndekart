"use client";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { sora } from "../fonts";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  signUpFormSchemaPage1,
  signUpFormSchemaPage2,
} from "@/app/login/formSchema";
import { supabase } from "@/utils/supabase-client";
import { trpc } from "@/utils/trpc";

function Page1({
  form,
  onSubmit,
}: {
  form: UseFormReturn<z.infer<typeof signUpFormSchemaPage1>>;
  onSubmit: (values: z.infer<typeof signUpFormSchemaPage1>) => void;
}) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="91+ 9817263541" {...field} />
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
                  <Input placeholder="*********" type="password" {...field} />
                </FormControl>
                {!form.formState.errors.password && (
                  <FormDescription>
                    Minimum eight characters, at least one uppercase letter, one
                    lowercase letter and one number
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          variant="primary"
          className="w-full"
          type="submit"
          onClick={() => form.trigger()}
        >
          Next
        </Button>
      </form>
    </FormProvider>
  );
}

function Page2({
  form,
  onSubmit,
  onBack,
}: {
  form: UseFormReturn<z.infer<typeof signUpFormSchemaPage2>>;
  onSubmit: (values: z.infer<typeof signUpFormSchemaPage2>) => void;
  onBack: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <FormProvider {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="gst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST No.</FormLabel>
                <FormControl>
                  <Input placeholder="GST Number" {...field} />
                </FormControl>

                {!form.formState.errors.gst && (
                  <FormDescription>Format: 22AABCU9603R1ZX</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Number</FormLabel>
                <FormControl>
                  <Input placeholder="PAN Number" {...field} />
                </FormControl>
                {!form.formState.errors.pan && (
                  <FormDescription>Format: ABCTY1234D</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type Your Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-3">
          <Button
            variant="primary"
            className="w-full"
            type="submit"
            onClick={() => form.trigger()}
          >
            Submit
          </Button>
          <Button variant="secondary" className="w-full" onClick={onBack}>
            Back
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

function SignUp() {
  const [formPageNo, setFormPageNo] = useState<1 | 2>(1);

  const moveToNextPage = () => setFormPageNo(2);
  const moveToPrevPage = () => setFormPageNo(1);

  const formPage1 = useForm<z.infer<typeof signUpFormSchemaPage1>>({
    resolver: zodResolver(signUpFormSchemaPage1),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const formPage2 = useForm<z.infer<typeof signUpFormSchemaPage2>>({
    resolver: zodResolver(signUpFormSchemaPage2),
    defaultValues: {
      gst: "",
      pan: "",
      address: "",
    },
  });

  const createUserMutation = trpc.createUser.useMutation({
    onMutate: () => {
      formPage1.reset();
      formPage2.reset();
      setFormPageNo(1);
    },
  });

  async function handlePage2Submit() {
    const form1Values = formPage1.getValues();
    const form2Values = formPage2.getValues();

    if (form1Values && form2Values) {
      const res = await supabase.auth.signUp({
        email: form1Values.email,
        password: form1Values.password,
      });

      const userId = res.data.user?.id;

      createUserMutation.mutate({
        id: userId ?? "",
        ...form1Values,
        ...form2Values,
      });
    }
  }

  function handlePage1Submit() {
    if (formPage1.formState.isValid) moveToNextPage();
  }

  switch (formPageNo) {
    case 1:
      return <Page1 form={formPage1} onSubmit={handlePage1Submit} />;
    case 2:
      <Page2
        form={formPage2}
        onSubmit={handlePage2Submit}
        onBack={moveToPrevPage}
      />;
    default:
      return <></>;
  }
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="bg-slate-200 h-[100svh] overflow-x-auto">
      <Navbar />
      <div className="flex flex-col gap-10 p-10 pl-14 mt-[6rem] mb-[6rem] w-[40rem] bg-white rounded-lg shadow-xl shadow-slate-300 left-0 right-0 top-0 bottom-0 m-auto">
        <div className="flex flex-col gap-2">
          <h1 className={`${sora.className} text-2xl font-bold`}>
            Create an Account or Sign In
          </h1>
          <p className="text-slate-600 text-md">
            Your Steel Oasis Awaits: Login or Sign Up to Experience Tailored
            Solutions!
          </p>
        </div>
        <Tabs defaultValue="account" className="w-[450px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Sign In</TabsTrigger>
            <TabsTrigger value="password">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardDescription>
                  Already have an Account. Sign In using your email id or use
                  google oAuth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email Id</Label>
                  <Input
                    id="email"
                    placeholder="example@gmail.com"
                    value={email}
                    defaultValue={""}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input
                    id="password"
                    value={password}
                    defaultValue={""}
                    placeholder="**********"
                    type="password"
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    supabase.auth
                      .signInWithPassword({ email, password })
                      .then(() => {
                        alert("sign in successfull");
                      })
                      .catch(() => alert("sign in failure"));
                  }}
                >
                  Submit
                </Button>
                <Button variant="secondary" className="w-full gap-3">
                  <BsGoogle />
                  Google Sign
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardDescription>
                  Don’t have an account. Sign up using your credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <SignUp />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
