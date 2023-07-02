"use client";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { HiTrash } from "react-icons/hi";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

export default function DeleteButton({ product }: { product: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const deleteProductMutation = trpc.deleteProduct.useMutation();
  const router = useRouter();

  async function deleteProduct() {
    setLoading(true);
    console.log("product to be deleted: ", product);
    const imageIds: string[] = product.images.map(
      (image: any) => image.imageId
    );
    console.log(imageIds);
    deleteProductMutation.mutate(
      { productId: product.id, imageIds },
      {
        onSuccess: () => {
          setLoading(false);
          router.refresh();
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  }
  return (
    <Button
      variant="destructive"
      className="w-[8rem] gap-2"
      size="sm"
      disabled={loading}
      onClick={deleteProduct}
    >
      {loading ? (
        <LoadingSpinner className="w-4 h-4" />
      ) : (
        <>
          <HiTrash />
          Delete
        </>
      )}
    </Button>
  );
}
