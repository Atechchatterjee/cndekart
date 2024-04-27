"use client";

import { useEffect } from "react";
import { staatlitches } from "@/app/fonts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Tiptap from "@/components/Tiptap";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/tailwind-merge";
import { trpc } from "@/utils/trpc";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductImages, ProjectImages } from "@prisma/client";
import { Button } from "@/components/ui/button";

function parseJSONSafely(content: string) {
  try {
    let parsedJSON = JSON.parse(content);
    return parsedJSON;
  } catch (err) {
    console.error(err);
    return {};
  }
}

export default function ProductEdit({
  params,
}: {
  params: { [slug: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const projects = trpc.fetchProject.useQuery({ projectId: params.projectId });

  return (
    <>
      <div className="w-[70rem] m-auto">
        <Navbar route="browse" padding={false} />
        <div className="min-h-[70vh]">
          {projects.isLoading ? (
            <>
              <div className="space-y-4 mt-[3rem]">
                <Skeleton className="h-4 w-[40rem]" />
                <Skeleton className="h-4 w-[30rem]" />
              </div>
              <div className="grid grid-cols-3 gap-4 h-[50vh] mt-[3rem]">
                <Skeleton className="rounded-xl" />
                <Skeleton className="rounded-xl" />
                <Skeleton className="rounded-xl" />
              </div>
            </>
          ) : (
            <>
              <h1
                className={cn(
                  staatlitches.className,
                  "text-[3.4rem] w-[80%] leading-tight mt-[3rem] font-medium"
                )}
              >
                {projects.data?.title}
              </h1>
              <p>These are some images of this project</p>
              <Carousel className="w-full mt-[3rem] h-[15rem]">
                <CarouselContent className="select-none">
                  {projects.data?.images.map((image, i) => (
                    <CarouselItem
                      key={i}
                      className={
                        projects.data?.images &&
                        projects.data?.images.length >= 3
                          ? "md:basis-1/2 lg:basis-1/3"
                          : projects.data?.images.length == 2
                          ? "md:basis-1/2"
                          : ""
                      }
                    >
                      <img
                        key={i}
                        src={image.imageUrl}
                        className="h-[25rem] object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {projects.data?.images && projects.data?.images.length > 1 && (
                  <>
                    <CarouselPrevious className="mt-[5rem]" />
                    <CarouselNext className="mt-[5rem]" />
                  </>
                )}
              </Carousel>
              <div className="mt-[15rem]">
                <Tiptap
                  content={parseJSONSafely(projects.data?.description || "")}
                  editable={false}
                />
              </div>
            </>
          )}
          <div className="mt-[3rem]">
            <a href="/project" className="text-primary font-semibold">
              More Projects
            </a>
          </div>
        </div>
      </div>
      {!projects.isLoading && <Footer />}
    </>
  );
}
