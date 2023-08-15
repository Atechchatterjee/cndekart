"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import UnauthorisedPage from "@/components/UnauthorisedPage";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductFormValues } from "../type";
import { trpc } from "@/utils/trpc";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsForm from "../ProductDetailsForm";
import ImageUploadCard from "../ImageUploadCard";
import { useQuery } from "@tanstack/react-query";
import AdminSidebar from "@/components/AdminSidebar";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { FetchOnMountContext } from "./FetchOnMountContext";

export default function ProductEdit({
  params,
}: {
  params: { [slug: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { status } = useSession();

  const [initialFetchedImages, setInitialFetchedImages] = useState<string[]>();
  const [imagesToUpload, setImagesToUpload] = useState<any[]>([]);
  const [updateProductTrigger, setUpdateProductTrigger] =
    useState<boolean>(false);

  const { data: fetchedProduct, refetch: refetchProduct } =
    trpc.fetchProduct.useQuery(
      { productId: params.productId },
      {
        enabled: false,
      }
    );

  useEffect(() => {
    refetchProduct();
  }, [status]);

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

  const [productFormLoading, setProductFormLoading] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    if (fetchedProduct) {
      const labels = ["title", "description", "igst", "cgst", "sgst"] as const;
      labels.forEach((formLabels) => {
        form.setValue(formLabels as any, fetchedProduct[formLabels], {
          shouldValidate: true,
        });
      });
      form.setValue("category", fetchedProduct.categoryRelation.id, {
        shouldValidate: true,
      });
      form.setValue("unit", fetchedProduct.unitRelation?.id || "", {
        shouldValidate: true,
      });
      form.setValue(
        "price",
        fetchedProduct.priceRelation[0]?.price.toString(),
        {
          shouldValidate: true,
        }
      );
      form.setValue(
        "range",
        fetchedProduct.priceRelation[0]?.range.toString(),
        {
          shouldValidate: true,
        }
      );
    }
    fetchedProduct?.images.forEach(async (image) => {
      const res = await fetch(image.imageUrl);
      const imageBlob = await res.blob();
      setImagesToUpload([...imagesToUpload, imageBlob]);
    });
  }, [fetchedProduct]);

  const updateProductMutation = trpc.updateProduct.useMutation();

  useQuery({
    enabled: updateProductTrigger,
    queryKey: [updateProductTrigger],
    queryFn: async function updateProduct() {
      const { price, range, cgst, sgst, igst, ...val } = form.getValues();

      if (fetchedProduct) {
        setProductFormLoading(true);
        updateProductMutation.mutate(
          {
            id: fetchedProduct.id,
            price: {
              id: fetchedProduct.priceRelation[0].id,
              price: price,
              range: range,
            },
            cgst: parseInt(cgst),
            sgst: parseInt(sgst),
            igst: parseInt(igst),
            ...val,
          },
          {
            onSuccess: () => {
              setProductFormLoading(false);
              toast({ title: "Product Updated Sucessfully" });
            },
          }
        );
      }
    },
  });

  const { data: allUnits } = trpc.fetchUnits.useQuery({});

  const { data: allCategories } = trpc.fetchCategories.useQuery({});

  if (status === "authenticated")
    return (
      <div className="min-h-screen flex flex-shrink-0 antialiased bg-slate-200 text-gray-800">
        <AdminSidebar active="product" />
        <div className="bg-white rounded-lg fixed top-3 left-[21.5rem] bottom-3 right-3 p-7 pl-10 overflow-x-auto">
          <div className="flex flex-col gap-2 border-b pb-5 border-gray-200">
            <div className="flex gap-4 items-center">
              <BsFillRocketTakeoffFill
                className="text-slate-600"
                size="1.2rem"
              />
              <h1 className="text-2xl text-slate-800 font-bold">
                Edit Your Products
              </h1>
            </div>
            <p className="text-gray-600 font-semibold text-sm">
              Product Id: #{params.productId}
            </p>
          </div>
          <FetchOnMountContext.Provider
            value={{ fetchCategoriesOnMount: true, fetchUnitsOnMount: true }}
          >
            <div className="relative flex gap-5 w-full flex-wrap flex-shrink-0 mt-8">
              <ProductDetailsForm
                form={form}
                providedCategories={allCategories}
                providedUnits={allUnits}
              />
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
                  setUpdateProductTrigger(true);
                }}
                forUpdate={true}
              />
            </div>
          </FetchOnMountContext.Provider>
        </div>
      </div>
    );
  else if (status === "loading") return <LoadingSpinner />;
  else return <UnauthorisedPage />;
}
