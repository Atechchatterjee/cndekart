"use client";
import { useState } from "react";
import WithAuth from "@/utils/WithAuth";
import AdminSidebar from "@/components/AdminSidebar";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import ProductDetailsForm from "./ProductDetailsForm";
import ImageUploadCard from "./ImageUploadCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { ProductFormValues } from "./type";
import { Product } from "@prisma/client";

function Product() {
  const [imagesToUpload, setImagesToUpload] = useState<any[]>([]);
  const [createProductTrigger, setCreateProductTrigger] =
    useState<boolean>(false);

  const form = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      unit: "",
      range: "",
      gst: "",
    },
  });

  const productMutation = trpc.createProduct.useMutation();
  const productPricesMutation = trpc.createProductPrices.useMutation();
  const updateProductImageMutation =
    trpc.updateProductWithImageUrl.useMutation();

  async function createProductImages(product: Product) {
    const formData = new FormData();
    imagesToUpload.forEach((imageToUpload, i) =>
      formData.append(`image-${i}`, imageToUpload as any)
    );
    // uploading images to imagekit
    const res = await axios.post(
      `${window.origin}/api/upload-images`,
      formData
    );
    const uploadedFileNames = res.data.fileNames;
    // using the uploaded image urls to associate to the product
    updateProductImageMutation.mutate({
      imageUrls: uploadedFileNames,
      productId: product.id || "",
    });
    form.reset();
    return res;
  }

  function createProductPrice(res: Product) {
    const productFormValues = form.getValues();
    productPricesMutation.mutate(
      {
        range: productFormValues.range,
        price: productFormValues.price,
        productId: res.id,
      },
      {
        onSuccess: () => createProductImages(res),
      }
    );
  }

  useQuery({
    enabled: createProductTrigger,
    queryKey: [createProductTrigger],
    queryFn: async function createProduct() {
      const productFormValues = form.getValues();
      alert(JSON.stringify({ values: productFormValues }));
      const res = productMutation.mutate(
        {
          title: productFormValues?.title ?? "",
          description: productFormValues?.description ?? "",
          category: productFormValues?.category ?? "",
          unit: productFormValues?.unit ?? "",
          gst: productFormValues?.gst ?? "",
        },
        {
          onSuccess: createProductPrice,
        }
      );
      return res;
    },
  });

  return (
    <div className="min-h-screen flex flex-shrink-0 antialiased bg-slate-200 text-gray-800">
      <AdminSidebar active="product" />
      <div className="bg-white rounded-lg fixed top-3 left-[21.5rem] bottom-3 right-3 p-7 pl-10 overflow-x-auto">
        <div className="flex flex-col gap-2 border-b pb-5 border-gray-200">
          <div className="flex gap-4 items-center">
            <BsFillRocketTakeoffFill />
            <h1 className="text-2xl text-slate-800 font-bold">
              Manage Your Products
            </h1>
          </div>
          <p className="text-sm text-slate-600">
            Create, View and Manage all your products here.
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl text-slate-600 font-bold">
              Create Your Product
            </h1>
            <p className="text-sm text-slate-400">
              Use the given form to insert information for each product.
            </p>
          </div>
          <div className="flex gap-5 w-full flex-wrap flex-shrink-0">
            <ProductDetailsForm form={form} />
            <ImageUploadCard
              images={imagesToUpload}
              onUpload={(currentUploadedImages) => {
                setImagesToUpload((exisitingImages) => [
                  ...exisitingImages,
                  ...currentUploadedImages,
                ]);
              }}
              onCreate={() => setCreateProductTrigger(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default () => <WithAuth WrappedComponent={Product} role="ADMIN" />;
