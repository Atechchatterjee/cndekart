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
import { useToast } from "@/components/ui/use-toast";

export default function CreateProduct({
  refetchProductLists,
}: {
  refetchProductLists?: Function;
}) {
  const [imagesToUpload, setImagesToUpload] = useState<any[]>([]);
  const [createProductTrigger, setCreateProductTrigger] =
    useState<boolean>(false);

  const form = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      manufacturer: "",
      unit: "",
      range: "",
      igst: "",
      cgst: "",
      sgst: "",
    },
  });

  const productMutation = trpc.createProduct.useMutation();
  const productPricesMutation = trpc.createProductPrices.useMutation();
  const updateProductImageMutation =
    trpc.updateProductWithImageUrl.useMutation();
  const [productFormLoading, setProductFormLoading] = useState<boolean>(false);

  const { toast } = useToast();

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
      images: uploadedFileNames,
      productId: product.id || "",
    });
    // form.reset();
    setImagesToUpload([]);
    if (refetchProductLists) refetchProductLists();
    return res;
  }

  function createProductPrice(res: Product) {
    const productFormValues = form.getValues();
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
      const res = productMutation.mutate(
        {
          title: productFormValues?.title ?? "",
          description: productFormValues?.description ?? "",
          category: productFormValues?.category ?? "",
          unit: productFormValues?.unit ?? "",
          sgst:
            productFormValues?.sgst === ""
              ? 0
              : parseInt(productFormValues?.sgst),
          cgst:
            productFormValues?.cgst === ""
              ? 0
              : parseInt(productFormValues?.cgst),
          igst:
            productFormValues?.igst === ""
              ? 0
              : parseInt(productFormValues?.igst),
        },
        {
          onSuccess: async (res) => {
            if (res) {
              createProductPrice(res);
              await createProductImages(res);
              toast({
                title: "Product Created Successfully",
                description: `The product with title: ${productFormValues.title} has been created successfully`,
                variant: "success",
              });
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
        onCreate={async () => {
          setCreateProductTrigger(true);
        }}
      />
    </div>
  );
}
