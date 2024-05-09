"use client";
import AdminSidebar from "@/components/AdminSidebar";
import Tiptap from "@/components/Tiptap";
import UnauthorisedPage from "@/components/UnauthorisedPage";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaListUl } from "react-icons/fa";
import { trpc } from "@/utils/trpc";
import ProjectImageUploadCard from "./ProjectImageUpload";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function parseJSONSafely(content: string) {
  try {
    let parsedJSON = JSON.parse(content);
    return parsedJSON;
  } catch (err) {
    console.error(err);
    return {};
  }
}

function checkForImageChanges(images: UploadedBlob[]): {
  deletedImages: UploadedBlob[];
  addedImages: UploadedBlob[];
  hasChanged: boolean;
} {
  const deletedImages = images.filter((img) => img.status === "deleted");
  const addedImages = images.filter((img) => img.status === "added");

  return {
    deletedImages,
    addedImages,
    hasChanged: deletedImages.length > 0 || addedImages.length > 0,
  };
}

export type UploadedBlob = {
  id: string;
  image: Blob | any;
  status: "deleted" | "added" | "normal" | "addded-deleted";
  imageId?: string;
};

export default function ProjectEdit({
  params,
}: {
  params: { [slug: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { status } = useSession();

  interface ProjectFormValues {
    title: string;
    description: string;
    price: string;
  }

  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  });

  const [imagesToUpload, setImagesToUpload] = useState<UploadedBlob[]>([]);
  const [updateProjectTrigger, setUpdateProjectTrigger] =
    useState<boolean>(false);

  async function getImageBlob(image: any): Promise<Blob> {
    const res = await fetch(image.imageUrl);
    if (!res.ok) return Promise.reject(new Error("Failed to fetch image"));
    try {
      const imageBlob = await res.blob();
      return Promise.resolve(imageBlob);
    } catch (err) {
      Promise.reject(err);
    }
    return Promise.reject(new Error("Failed unexpectedly!"));
  }

  const currentProject = trpc.fetchProject.useQuery(
    { projectId: params.projectId },
    {
      onSuccess: async (value: any) => {
        form.setValue("title", value?.title || "");
        form.setValue("price", value?.price || "");
        form.setValue("description", parseJSONSafely(value?.description));
        // update the images in the imageUploadCard
        var imagesBlob: UploadedBlob[] = [];
        if (value) {
          for (const image of value.images) {
            try {
              const imageBlob = await getImageBlob(image);
              imagesBlob.push({
                id: image.id,
                image: imageBlob,
                status: "normal",
                imageId: image.imageId,
              });
            } catch (err) {
              console.error(err);
            }
          }
          setImagesToUpload(imagesBlob);
        }
      },
    }
  );

  const updateProjectMutation = trpc.updateProject.useMutation();
  const updateProjectWithImageUrlMutation =
    trpc.updateProjectWithImageUrl.useMutation();
  const deleteProjectImages = trpc.deleteProjectImages.useMutation();

  // updates the form values to the db
  async function updateProjectFormValues() {
    return new Promise((resolve, reject) => {
      updateProjectMutation.mutate(
        {
          price: form.getValues("price"),
          title: form.getValues("title"),
          description:
            typeof form.getValues("description") !== "string"
              ? JSON.stringify(form.getValues("description"))
              : form.getValues("description"),
          projectId: params.projectId,
        },
        {
          onSuccess: function (res) {
            // alert("updated form values successfully");
            setUpdateProjectTrigger(false);
            resolve(res);
          },
          onError: function (err) {
            console.error(err);
            setUpdateProjectTrigger(false);
            // alert("Could not update form values");
            reject(err);
          },
        }
      );
    });
  }

  // adds images to db and uploads to imagekit
  async function addImages({
    addedImages,
  }: {
    addedImages: UploadedBlob[];
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      addedImages.forEach((img, i) => {
        formData.append(`image-${i}`, img.image);
      });
      try {
        const res = await axios.post(
          `${window.origin}/api/upload-images`,
          formData
        );
        console.log("uploaded images to imagekit");
        console.log(res.data.fileNames);
        updateProjectWithImageUrlMutation.mutate(
          {
            projectId: params.projectId,
            images: res.data.fileNames,
          },
          {
            onSuccess: (res) => {
              // alert("successfully added images");
              resolve(res);
            },
            onError: (err) => {
              // alert("could not add images to db");
              reject(err);
            },
          }
        );
      } catch (err) {
        // alert("Could not upload images to imagekit");
        console.error(err);
        reject(err);
      }
    });
  }

  async function deleteImages({
    deletedImages,
  }: {
    deletedImages: UploadedBlob[];
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${window.origin}/api/delete-images`, {
          imageIds: deletedImages.map((img) => img.imageId),
        });
        console.log("successfully deleted images from db");
        console.log(res);
        deleteProjectImages.mutate(
          {
            projectId: params.projectId,
            imageIds: deletedImages.map((img) => img.imageId || ""),
          },
          {
            onSuccess: (res) => {
              // alert("Successfully deleted images from db");
              resolve(res);
            },
            onError: (err) => {
              // alert("Could not delete images from db");
              console.error(err);
              reject(err);
            },
          }
        );
      } catch (err) {
        console.error("Failed in removing images from imagekit");
        console.error(err);
        reject(err);
      }
    });
  }

  useQuery({
    queryKey: [updateProjectTrigger],
    enabled: updateProjectTrigger,
    queryFn: async function () {
      const { hasChanged, addedImages, deletedImages } =
        checkForImageChanges(imagesToUpload);
      console.log({ hasChanged, addedImages, deletedImages });

      if (hasChanged) {
        if (addedImages.length > 0 && deletedImages.length > 0)
          addImages({ addedImages }).then(() => {
            deleteImages({ deletedImages }).then(() => {
              updateProjectFormValues().then(() => {
                currentProject.refetch();
              });
            });
          });
        else if (addedImages.length > 0)
          addImages({ addedImages }).then(() => {
            updateProjectFormValues().then(() => {
              currentProject.refetch();
            });
          });
        else if (deletedImages.length > 0)
          deleteImages({ deletedImages }).then(() => {
            updateProjectFormValues().then(() => {
              currentProject.refetch();
            });
          });
      } else
        updateProjectFormValues().then(() => {
          currentProject.refetch();
        });
    },
  });

  if (status === "authenticated" && !currentProject.isLoading)
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
              <Card className="flex flex-col p-4 w-full">
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
                            <Tiptap
                              placeholder="description"
                              content={
                                parseJSONSafely(
                                  currentProject.data?.description || ""
                                ) || field.value
                              }
                              onChange={field.onChange}
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
              <ProjectImageUploadCard
                images={imagesToUpload}
                setImagesToUpload={setImagesToUpload}
                isLoading={updateProjectTrigger}
                onUpload={(currentUploadedImages) => {
                  console.log({ currentUploadedImages });
                  const uploadedImages: UploadedBlob[] =
                    currentUploadedImages.map((img) => ({
                      id: `${img.name}_${img.lastModified}`,
                      image: img,
                      status: "added",
                    }));
                  setImagesToUpload((exisitingImages) => [
                    ...exisitingImages,
                    ...uploadedImages,
                  ]);
                }}
                onCreate={() => {
                  setUpdateProjectTrigger(true);
                }}
                btnText="Update Project"
              />
            </div>
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
