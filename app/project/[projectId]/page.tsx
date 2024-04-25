"use client";

import { staatlitches } from "@/app/fonts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Tiptap from "@/components/Tiptap";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/tailwind-merge";
import { trpc } from "@/utils/trpc";

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
      <div className="w-[100rem] m-auto">
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
                  "text-[3rem] w-[80%] leading-tight mt-[3rem] font-medium"
                )}
              >
                {projects.data?.title}
              </h1>
              <p>These are some images of this project</p>
              <div className="grid grid-cols-3 gap-4 w-full mt-[3rem]">
                {projects.data?.images.map((image, i) => (
                  <img
                    key={i}
                    src={image.imageUrl}
                    className="h-full w-full max-w-[500px] max-h-[500px] object-cover"
                  />
                ))}
              </div>
              <div className="mt-[2rem]">
                <Tiptap
                  content={parseJSONSafely(projects.data?.description || "")}
                  editable={false}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {!projects.isLoading && <Footer />}
    </>
  );
}
