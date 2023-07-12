import { publicProcedure } from "../trpc";
import { prisma } from "@/utils/prisma-client";
import * as z from "zod";
import ImageKit from "imagekit";

export function createProduct() {
  return publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        unit: z.string().optional(),
        cgst: z.number().optional(),
        igst: z.number().optional(),
        sgst: z.number().optional(),
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
            cgst: input.cgst ?? 0,
            sgst: input.sgst ?? 0,
            igst: input.igst ?? 0,
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

export function fetchProducts() {
  return publicProcedure.input(z.object({})).query(
    async () =>
      await prisma.product.findMany({
        include: {
          images: {},
          unitRelation: {},
          priceRelation: {},
          categoryRelation: {},
        },
      })
  );
}

export function fetchSubCategories() {
  return publicProcedure
    .input(z.object({ categoryId: z.string() }))
    .query(async ({ input }) => {
      if (input.categoryId === "root" || input.categoryId === "") {
        return await prisma.category.findMany({
          where: { root: true },
          include: {
            childCategory: true,
            parentCategory: true,
          },
        });
      } else {
        console.log("fetching non-rooting elements");
        const res = await prisma.category.findMany({
          where: { parentCategory: { id: input.categoryId } },
          include: { childCategory: true, parentCategory: true },
        });
        console.log(res);
        return res;
      }
    });
}

export function deleteSubCategories() {
  return publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.category.delete({ where: { id: input.categoryId } });
    });
}

export function createSubCategories() {
  return publicProcedure
    .input(
      z.object({
        parentCategoryId: z.string(),
        currentCategoryName: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.parentCategoryId === "root" || input.parentCategoryId === "") {
        return await prisma.category.create({
          data: {
            category: input.currentCategoryName,
          },
        });
      } else {
        return await prisma.category.create({
          data: {
            category: input.currentCategoryName,
            parentCategory: { connect: { id: input.parentCategoryId } },
          },
        });
      }
    });
}

export function createUnit() {
  return publicProcedure
    .input(z.object({ unit: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.unit.create({
        data: {
          unit: input.unit,
        },
      });
    });
}

export function deleteUnit() {
  return publicProcedure
    .input(z.object({ unitId: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.unit.delete({
        where: { id: input.unitId },
      });
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

export function deleteProduct() {
  return publicProcedure
    .input(z.object({ productId: z.string(), imageIds: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      try {
        console.log("productId: ", input.productId);
        console.log("imageIds on server: ", input.imageIds);

        // deleting images from imagekit
        const imagekit = new ImageKit({
          urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "",
          publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "",
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "",
        });
        const imagekitPromise = imagekit.bulkDeleteFiles(input.imageIds);

        await prisma.productPrices.deleteMany({
          where: { product: input.productId },
        });

        await prisma.product.delete({
          where: { id: input.productId },
          include: { images: {}, priceRelation: {} },
        });

        await imagekitPromise;
        return { status: 200 };
      } catch (err) {
        throw err;
      }
    });
}

export function updateProductWithImageUrl() {
  return publicProcedure
    .input(z.object({ productId: z.string(), images: z.array(z.any()) }))
    .mutation(async ({ input }) => {
      await prisma.$transaction(
        input.images.map((image) =>
          prisma.product.update({
            where: { id: input.productId },
            data: {
              images: {
                create: { imageUrl: image.url, imageId: image.fileId },
              },
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
    .query(
      async () =>
        await prisma.category.findMany({ include: { parentCategory: true } })
    );
}
