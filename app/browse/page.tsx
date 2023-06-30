import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/utils/prisma-client";
import Link from "next/link";

async function ProductImage({ productImages }: { productImages: any }) {
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

export default async function Browse() {
  const productLists = await prisma.product.findMany({
    include: {
      images: {},
      categoryRelation: {},
      priceRelation: {},
      unitRelation: {},
    },
  });

  return (
    <div className="pl-[15rem] pr-[15rem]">
      <Navbar padding={false} route="browse" />
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
            <ProductImage productImages={product.images} />
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <Link href={`/browse/${product.id}`}>
                    <h2 className="font-bold text-[1.2rem] cursor-pointer hover:text-slate-700">
                      {product.title}
                    </h2>
                  </Link>
                  <p className="font-slate-200">{product.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Price: </span>
                  <span>
                    ₹{product.priceRelation[0].price}/
                    {product.unitRelation?.unit}
                  </span>
                  <span>
                    for {product.priceRelation[0].range}{" "}
                    {product.unitRelation?.unit}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 w-[20rem]">
                <Button variant="primary" className="flex-1" size="sm">
                  Buy Now
                </Button>
                <Button variant="secondary" className="flex-1" size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
