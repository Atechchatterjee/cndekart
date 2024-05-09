import { publicProcedure } from "../trpc";
import { prisma } from "@/utils/prisma-client";
import * as z from "zod";
import { imagekit } from "@/utils/imagekit";

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

async function uploadImages(files: any[] | null) {
  if (!files) return;
  try {
    let uploadedFileNames: any[] = [];
    for (const file of files) {
      if (file && file.image) {
        const buffer = Buffer.from(await file.image.arrayBuffer());
        try {
          const res = await imagekit.upload({
            file: buffer,
            fileName: file.image.name,
          });
          console.log("image kit reponse: ", res);
          uploadedFileNames.push(res);
        } catch (err) {
          console.log("Upload error.");
          console.error(err);
        }
      } else {
        console.log("File does not exists");
      }
    }
    return Promise.resolve({ fileNames: uploadedFileNames });
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

export function updateProject() {
  return publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let updatedProject = null;
      try {
        updatedProject = await prisma.project.update({
          data: {
            title: input.title,
            description: input.description,
            price: input.price,
          },
          where: {
            id: input.projectId,
          },
        });
      } catch (err) {
        console.error("Failed to update db with form values");
        console.error(err);
      }
      return updatedProject;
    });
}

export function deleteProject() {
  return publicProcedure
    .input(z.object({ projectId: z.string(), imageIds: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      try {
        console.log(input.imageIds);
        try {
          await prisma.project.delete({ where: { id: input.projectId } });
        } catch (err) {
          console.error("prisma rejection");
          throw err;
        }
        try {
          if (input.imageIds.length > 0) {
            // deleting images from imagekit
            const imagekitPromise = imagekit.bulkDeleteFiles(input.imageIds);
            await imagekitPromise;
          }
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

export function deleteProjectImages() {
  return publicProcedure
    .input(z.object({ projectId: z.string(), imageIds: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      return await prisma.projectImages.deleteMany({
        where: {
          projectId: input.projectId,
          imageId: {
            in: input.imageIds,
          },
        },
      });
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
