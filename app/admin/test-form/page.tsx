// "use client";
// import { Card, CardContent } from "@/components/ui/card";
// import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";
// import { trpc } from "@/utils/trpc";
// import { ProductFormValues } from "@/app/admin/product/type";
// import LoadingSpinner from "@/components/LoadingSpinner";
// import { Button } from "@/components/ui/button";
// import CreateUnitAlertDialog from "./CreateUnitAlertDialog";
//
// export default function TestForm() {
//   const form = useForm<ProductFormValues>({
//     defaultValues: {
//       title: "",
//       description: "",
//       price: "",
//       category: "",
//       unit: "",
//       range: "",
//       igst: "",
//       cgst: "",
//       sgst: "",
//     },
//   });
//   return (
//     <Card className="flex-1">
//       <CardContent>
//         <FormProvider {...form}>
//           <form className="space-y-5 mt-5">
//             <div className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="title"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Title</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Product Title" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </form>
//         </FormProvider>
//       </CardContent>
//     </Card>
//   );
// }
//

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
import { ProductFormValues } from "../product/type";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import CreateUnitAlertDialog from "../product/CreateUnitAlertDialog";
import ProductDetailsForm from "../product/ProductDetailsForm";

export default function Test() {
  const form = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      unit: "",
      range: "",
      igst: "",
      cgst: "",
      sgst: "",
    },
  });
  return <ProductDetailsForm form={form} />;
}
