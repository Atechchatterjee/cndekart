import { Button } from "@/components/ui/button";
import { prisma } from "utils/prisma-client";

async function ProductImage({
  productId,
  productImages,
}: {
  productId: string;
  productImages: any;
}) {
  const WIDTH = 200,
    HEIGHT = 150;
  // return JSON.stringify({ productImages }, null, 2);
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

export default async function ProductList() {
  const productLists = await prisma.product.findMany({
    include: {
      images: {},
      categoryRelation: {},
      priceRelation: {},
      unitRelation: {},
    },
  });

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
      {productLists.map((product, i) => (
        <div
          className="flex gap-10 border border-slate-200 rounded-lg p-5 h-[14rem] w-full mt-5 hover:border-slate-300 transition-all"
          key={i}
        >
          {/* @ts-expect-error Server Component */}
          <ProductImage productId={product.id} productImages={product.images} />
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-[1.2rem]">{product.title}</h2>
                <p className="font-slate-200">{product.description}</p>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Price: </span>
                <span>{product.priceRelation[0].range}: </span>
                <span>
                  ₹{product.priceRelation[0].price}/{product.unitRelation?.unit}
                </span>
              </div>
            </div>
            <Button variant="primary" className="w-[8rem]" size="sm">
              Edit Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
