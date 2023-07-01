import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/utils/prisma-client";

async function ProductImage({ productImages }: { productImages: any }) {
  const WIDTH = 500,
    HEIGHT = 300;
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

export default async function ProductPage({
  params,
}: {
  params: { [slug: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.productId },
    include: {
      images: {},
      categoryRelation: {},
      priceRelation: {},
      unitRelation: {},
    },
  });
  return (
    <div className="pl-[15rem] pr-[15rem]">
      <Navbar route="browse" padding={false} />
      <div className="flex gap-20 mt-20">
        {/* @ts-ignore-error Server Component */}
        <ProductImage productImages={product?.images} />
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl text-slate-800 font-bold">
            {product?.title}
          </h1>
          <p className="text-slate-500 w-[80%]">{product?.description}</p>
          <div className="flex gap-2 items-baseline mt-[1rem]">
            <p className="font-semibold text-[1.1rem]">
              ₹{product?.priceRelation[0].price}/{product?.unitRelation?.unit}
            </p>
            <p className="font-semibold text-slate-600">
              for {product?.priceRelation[0].range}{" "}
              {product?.unitRelation?.unit}
            </p>
          </div>
          <div className="flex gap-3 w-[20rem] mt-[3rem]">
            <Button variant="primary" className="flex-1" size="lg">
              Buy Now
            </Button>
            <Button variant="secondary" className="flex-1" size="lg">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
