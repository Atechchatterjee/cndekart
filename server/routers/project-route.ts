import { publicProcedure } from "../trpc";
import { prisma } from "@/utils/prisma-client";
import * as z from "zod";
import ImageKit from "imagekit";

export function fetchProject() {
  return publicProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.project.findFirst({
        include: { images: {} },
        where: { id: input.projectId },
      });
    });
}

export function fetchAllProject() {
  return publicProcedure.input(z.object({})).query(async () => {
    return await prisma.project.findMany({
      include: { images: {} },
    });
  });
}

export function createProject() {
  return publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        price: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.project.create({
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
        },
      });
    });
}

export function deleteProject() {
  return publicProcedure
    .input(z.object({ projectId: z.string(), imageIds: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      try {
        console.log(input.imageIds);
        // deleting images from imagekit
        const imagekit = new ImageKit({
          urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "",
          publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "",
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "",
        });
        const imagekitPromise = imagekit.bulkDeleteFiles(input.imageIds);

        try {
          await prisma.project.delete({ where: { id: input.projectId } });
        } catch (err) {
          console.error("prisma rejection");
          throw err;
        }
        try {
          if (input.imageIds.length > 0) await imagekitPromise;
        } catch (err) {
          console.error("imagekit promise rejection");
          throw err;
        }
        return { status: 200 };
      } catch (err) {
        throw err;
      }
    });
}

export function updateProjectWithImageUrl() {
  return publicProcedure
    .input(z.object({ projectId: z.string(), images: z.array(z.any()) }))
    .mutation(async ({ input }) => {
      await prisma.$transaction(
        input.images.map((image) =>
          prisma.project.update({
            where: { id: input.projectId },
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
