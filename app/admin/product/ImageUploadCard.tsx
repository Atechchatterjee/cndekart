"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import Dropzone from "react-dropzone";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import { AiFillShop } from "react-icons/ai";
import { BsCloudUploadFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";

function ImagePreview({
  images,
  setImagesToUpload,
}: {
  images: any[];
  setImagesToUpload: Function;
}) {
  return (
    <div className="p-10 relative flex gap-5 border border-slate-200 rounded w-full h-[10rem]">
      {images.length === 0 ? (
        <p className="m-auto text-slate-500">No images uploaded yet</p>
      ) : (
        images.map((image, i) => (
          <div className="flex gap-3" key={i}>
            <div className="flex flex-col gap-2">
              <Image
                src={URL.createObjectURL(image)}
                width={100}
                height={100}
                alt=""
              />
              <p>{image.name}</p>
            </div>
            <IoMdClose
              className="self-start ml-auto cursor-pointer"
              onClick={() => {
                const newImages = images.filter((img) => {
                  console.log({
                    imgname: img.name,
                    imglastModified: img.lastModified,
                  });
                  console.log({
                    imagename: image.name,
                    imagelastModified: image.lastModified,
                  });
                  if (
                    img.name !== image.name &&
                    img.lastModified !== image.lastModified
                  )
                    return image;
                });
                console.log(newImages);
                setImagesToUpload(newImages);
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default function ImageUploadCard({
  images,
  setImagesToUpload,
  onUpload: uploadCb,
  onCreate,
  isLoading,
}: {
  images: any[];
  setImagesToUpload: (images: any[]) => void;
  onUpload?: (images: any[]) => void;
  onCreate?: () => void;
  isLoading?: boolean;
}) {
  const handleDrop = useCallback((files: any) => {
    uploadCb && uploadCb(files);
  }, []);

  return (
    <Card className="flex-1">
      <CardContent className="flex flex-col gap-5">
        <Dropzone onDrop={handleDrop}>
          {({ isDragActive, getRootProps, getInputProps }) => (
            <div
              {...getRootProps({
                className: cn(
                  "flex w-full border border-dashed h-[20rem]",
                  isDragActive ? "border-primary" : "border-slate-200",
                  " rounded-lg mt-5 cursor-pointer justify-center"
                ),
              })}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col gap-5 self-center items-center">
                <BsCloudUploadFill
                  size="1.5rem"
                  className={isDragActive ? "text-primary" : "slate-800"}
                />
                {isDragActive ? (
                  <p className="text-primary">Drop your images here</p>
                ) : (
                  <p className="slate-800">Upload your product images</p>
                )}
              </div>
            </div>
          )}
        </Dropzone>
        <ImagePreview images={images} setImagesToUpload={setImagesToUpload} />
        <Button
          variant="primary"
          className="w-full gap-3"
          type="submit"
          size="lg"
          onClick={() => {
            if (onCreate) onCreate();
          }}
        >
          {isLoading === true ? (
            <LoadingSpinner />
          ) : (
            <>
              <AiFillShop size="1.2rem" />
              <span>Create Product</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
