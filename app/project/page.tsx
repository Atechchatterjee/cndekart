"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";
import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import { IoCopyOutline } from "react-icons/io5";

function parseJSONSafely(content: string) {
  try {
    let parsedJSON = JSON.parse(content);
    return parsedJSON;
  } catch (err) {
    console.error(err);
    return {};
  }
}

function ProjectCard({
  project,
  i,
  allProjects,
}: {
  project: any;
  i: number;
  allProjects: any;
}) {
  const { toast } = useToast();

  return (
    <Card className="flex gap-5 p-5 w-full" key={i}>
      {project.images.length > 0 && (
        <img
          src={project.images[0]?.imageUrl}
          className="min-w-[350px] max-w-[350px] h-[250px] object-fill rounded-md"
        />
      )}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">{project.title}</h2>
        <p className="line-clamp-1 max-h-[5rem] overflow-clip">
          <Tiptap
            content={parseJSONSafely(project.description || "")}
            editable={false}
            textMode
          />
        </p>
        <div className="p-[2 2] flex gap-3 mt-auto">
          {project.price && (
            <>
              <p className="font-semibold pb-4">Price: </p>
              <p>₹{project.price}</p>
            </>
          )}
        </div>
        <div className="flex gap-3">
          <Button
            variant="primary"
            className="flex gap-3"
            onClick={() => {
              window.open(`/project/${project.id}`, "_blank");
            }}
          >
            <BiLinkExternal />
            View Project
          </Button>
          <Button
            variant="outline"
            className="w-[8rem] flex gap-3 hover:text-white"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.host}/project/${project.id}`
              );
              toast({
                description: "project url copied",
              });
            }}
          >
            <IoCopyOutline />
            Copy Url
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function Project() {
  const allProjects = trpc.fetchAllProject.useQuery({});
  return (
    <>
      <div className="w-[100rem] m-auto">
        <Navbar route="project" padding={false} />
        <div className="flex flex-col gap-5 w-full mt-[3rem]">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl text-slate-600 font-bold">Our Projects</h1>
            <p className="text-sm text-slate-600">
              Explore successful case studies, creative solutions, and unique
              designs that demonstrate our commitment to excellence.
            </p>
          </div>
          {allProjects.isLoading && (
            <Card className="flex gap-5 p-5 w-full">
              <Skeleton className="flex-[1] w-[250px] h-[200px]" />
              <div className="flex flex-[4] flex-col gap-5">
                <Skeleton className="w-full h-[2rem]" />
                <Skeleton className="w-full h-[2rem]" />
                <Skeleton className="w-full h-[2rem]" />
              </div>
            </Card>
          )}
          {allProjects.data?.map((project, i) => (
            <div key={i}>
              <ProjectCard project={project} allProjects={allProjects} i={i} />
            </div>
          ))}
        </div>
      </div>
      {!allProjects.isLoading && <Footer />}
    </>
  );
}
