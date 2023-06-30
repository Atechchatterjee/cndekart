"use client";
import { useState } from "react";
import ProductDetailsForm from "./ProductDetailsForm";
import ImageUploadCard from "./ImageUploadCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { ProductFormValues } from "./type";
import { Product } from "@prisma/client";

export default function CreateProduct() {
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
  const [productFormLoading, setProductFormLoading] = useState<boolean>(false);

  async function createProductImages(product: Product) {
    // alert("uploading images");
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
    // alert("creating a price");
    productPricesMutation.mutate({
      range: productFormValues.range,
      price: productFormValues.price,
      productId: res.id,
    });
  }

  useQuery({
    enabled: createProductTrigger,
    queryKey: [createProductTrigger],
    queryFn: async function createProduct() {
      setProductFormLoading(true);
      const productFormValues = form.getValues();
      // alert(JSON.stringify({ values: productFormValues }));
      const res = productMutation.mutate(
        {
          title: productFormValues?.title ?? "",
          description: productFormValues?.description ?? "",
          category: productFormValues?.category ?? "",
          unit: productFormValues?.unit ?? "",
          gst: productFormValues?.gst ?? "",
        },
        {
          onSuccess: (res) => {
            if (res) {
              createProductPrice(res);
              createProductImages(res);
            }
            setProductFormLoading(false);
          },
          onError: () => setProductFormLoading(false),
        }
      );
      return res;
    },
  });

  return (
    <div className="relative flex gap-5 w-full flex-wrap flex-shrink-0 mt-8">
      <ProductDetailsForm form={form} />
      <ImageUploadCard
        images={imagesToUpload}
        setImagesToUpload={setImagesToUpload}
        onUpload={(currentUploadedImages) => {
          setImagesToUpload((exisitingImages) => [
            ...exisitingImages,
            ...currentUploadedImages,
          ]);
        }}
        isLoading={productFormLoading}
        onCreate={() => setCreateProductTrigger(true)}
      />
    </div>
  );
}
