import { publicProcedure } from "../trpc";
import { prisma } from "@/utils/prisma-client";
import * as z from "zod";

export function createProduct() {
  return publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        unit: z.string().optional(),
        gst: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      console.log("creating product");
      try {
        const createdProduct = await prisma.product.create({
          data: {
            title: input.title,
            description: input.description,
            unitRelation: { connect: { id: input.unit } },
            gst: input.gst ?? "",
            categoryRelation: { connect: { id: input.category } },
          },
        });
        return createdProduct;
      } catch (err) {
        console.error(err);
        return null;
      }
    });
}

export function createProductPrices() {
  return publicProcedure
    .input(
      z.object({ range: z.string(), price: z.string(), productId: z.string() })
    )
    .mutation(async ({ input }) => {
      await prisma.productPrices.create({
        data: {
          range: input.range,
          price: parseInt(input.price),
          productRelation: { connect: { id: input.productId } },
        },
      });
    });
}

export function updateProductWithImageUrl() {
  return publicProcedure
    .input(z.object({ productId: z.string(), imageUrls: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      await prisma.$transaction(
        input.imageUrls.map((imageUrl) =>
          prisma.product.update({
            where: { id: input.productId },
            data: {
              images: { create: { imageUrl } },
            },
          })
        )
      );
    });
}

export function fetchUnits() {
  return publicProcedure
    .input(z.object({}))
    .query(async () => await prisma.unit.findMany());
}

export function fetchCategories() {
  return publicProcedure
    .input(z.object({}))
    .query(async () => await prisma.category.findMany());
}
