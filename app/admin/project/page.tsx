"use client";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UnauthorisedPage from "@/components/UnauthorisedPage";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaListUl } from "react-icons/fa";
import ImageUploadCard from "../product/ImageUploadCard";
import { IoCopyOutline } from "react-icons/io5";
import { BiLinkExternal } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import { MdDelete } from "react-icons/md";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";

interface ProjectFormValues {
  title: string;
  description: string;
  price: string;
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
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const deleteProjectMutation = trpc.deleteProject.useMutation();

  const { toast } = useToast();

  return (
    <Card className="flex gap-5 p-5 w-full" key={i}>
      {project.images.length > 0 && (
        <img
          src={project.images[0]?.imageUrl}
          className="w-[250px] h-[250px] object-fill"
        />
      )}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">{project.title}</h2>
        <p className="text-ellipses overflow-clip max-h-[95px]">
          {project.description}
        </p>
        <div className="p-2 flex gap-3 mt-auto">
          <p className="font-semibold pb-4">Price: </p>
          <p>₹{project.price}</p>
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
          <Button
            variant="destructive-outline"
            onClick={() => {
              setDeleteLoading(true);
              deleteProjectMutation.mutate(
                {
                  projectId: project.id,
                  imageIds: project.images.map((image: any) => image.imageId),
                },
                {
                  onSuccess: async () => {
                    await allProjects.refetch();
                    setDeleteLoading(false);
                  },
                  onError: () => setDeleteLoading(false),
                }
              );
            }}
          >
            {deleteLoading ? <LoadingSpinner /> : <MdDelete size={18} />}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function Project() {
  const { status } = useSession();
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  });

  const [createProjectTrigger, setCreateProjectTrigger] =
    useState<boolean>(false);

  const createProjectMutation = trpc.createProject.useMutation();
  const updateProjectImageMutation =
    trpc.updateProjectWithImageUrl.useMutation();

  const [createProjectLoading, setCreateProjectLoading] =
    useState<boolean>(false);
  const allProjects = trpc.fetchAllProject.useQuery({});

  useQuery({
    enabled: createProjectTrigger,
    queryKey: [createProjectTrigger],
    queryFn: async function createProject() {
      setCreateProjectLoading(true);
      const project = form.getValues();
      const res = createProjectMutation.mutate(project, {
        onSuccess: async (createProject) => {
          const formData = new FormData();
          imagesToUpload.forEach((imageToUpload, i) =>
            formData.append(`image-${i}`, imageToUpload as any)
          );
          // uploading images to imagekit
          const res = await axios.post(
            `${window.origin}/api/upload-images`,
            formData
          );
          const uploadedFileNames = res.data.fileNames;
          // using the uploaded image urls to associate to the product
          updateProjectImageMutation.mutate(
            {
              images: uploadedFileNames,
              projectId: createProject.id || "",
            },
            {
              onSuccess: async () => {
                form.reset();
                setCreateProjectTrigger(false);
                setImagesToUpload([]);
                setCreateProjectLoading(false);
                allProjects.refetch();
              },
            }
          );
        },
        onError: () => {
          setCreateProjectTrigger(false);
          setCreateProjectLoading(false);
        },
      });
      return res;
    },
  });

  const [imagesToUpload, setImagesToUpload] = useState<any[]>([]);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  if (status === "authenticated")
    return (
      <div className="min-h-screen flex flex-shrink-0 antialiased bg-slate-200 text-gray-800">
        <AdminSidebar active="project" />
        <div className="bg-white rounded-lg fixed top-3 left-[21.5rem] bottom-3 right-3 p-7 pl-10 overflow-x-auto">
          <div className="flex flex-col gap-2 mt-3">
            <div className="flex flex-col gap-1">
              <div className="flex gap-4 items-center">
                <FaListUl className="text-slate-600" size="1.2rem" />
                <h1 className="text-2xl text-slate-800 font-bold">
                  Manage Your Projects
                </h1>
              </div>
              <p className="text-sm text-slate-600">
                Use the given form to create new projects
              </p>
            </div>
            <div className="flex gap-5 mt-10">
              <Card className="flex flex-col p-4 min-w-[50rem]">
                <FormProvider {...form}>
                  <form className="space-y-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="description"
                              className="h-[23rem]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="price"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </FormProvider>
              </Card>
              <ImageUploadCard
                images={imagesToUpload}
                setImagesToUpload={setImagesToUpload}
                isLoading={createProjectLoading}
                onUpload={(currentUploadedImages) => {
                  setImagesToUpload((exisitingImages) => [
                    ...exisitingImages,
                    ...currentUploadedImages,
                  ]);
                }}
                onCreate={() => {
                  setCreateProjectTrigger(true);
                }}
                btnText="Create Project"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full mt-[3rem]">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl text-slate-600 font-bold">
                Your Projects
              </h1>
              <p className="text-sm text-slate-600">Manage your projects</p>
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
                <ProjectCard
                  project={project}
                  allProjects={allProjects}
                  i={i}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  else if (status === "unauthenticated") return <UnauthorisedPage />;
  else
    return (
      <div className="flex w-[100vw] h-[100svh] justify-center items-center">
        ...loading
      </div>
    );
}

export default Project;
