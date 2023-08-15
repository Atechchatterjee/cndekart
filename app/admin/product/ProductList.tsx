"use client";
import { Button } from "@/components/ui/button";
import { RiEditBoxFill } from "react-icons/ri";
import DeleteButton from "./DeleteButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

function ProductImage({
  productImages,
}: {
  productId: string;
  productImages: any;
}) {
  const WIDTH = 200,
    HEIGHT = 150;
  if (productImages.length > 0)
    return (
      <img
        src={`${productImages[0].imageUrl}?tr=w-${WIDTH}`}
        className="rounded-lg"
        width={WIDTH}
        height={HEIGHT}
        alt=""
      />
    );
}

export default function ProductList({
  productLists,
  isLoading,
}: {
  productLists: any[] | undefined;
  isLoading: boolean;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 mt-10">
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl text-slate-700 font-bold">Product List</h1>
        </div>
        <p className="text-sm text-slate-600">
          List of all product that has been created.
        </p>
      </div>
      {isLoading ? (
        <LoadingSpinner className="self-center ml-auto mr-auto" />
      ) : (
        productLists?.map((product, i) => (
          <div
            className="flex gap-10 border border-slate-200 rounded-lg p-5 h-[14rem] w-full mt-5 hover:border-slate-300 transition-all"
            key={i}
          >
            {/* @ts-ignore-error Server Component */}
            <ProductImage productImages={product.images} />
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-[1.2rem]">{product.title}</h2>
                  <p className="font-slate-200">{product.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Price: </span>
                  <span>{product?.priceRelation[0]?.range}: </span>
                  <span>
                    ₹{product.priceRelation[0].price}/
                    {product.unitRelation?.unit}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="w-[8rem] gap-2"
                  size="sm"
                  onClick={() => {
                    router.push(`/admin/product/${product.id}`);
                  }}
                >
                  <RiEditBoxFill />
                  Edit
                </Button>
                <DeleteButton product={product} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
