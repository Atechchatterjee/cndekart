"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import Dropzone from "react-dropzone";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AiFillShop } from "react-icons/ai";
import { BsCloudUploadFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ImageUploadCardProps {
  images: any[];
  setImagesToUpload: (images: any[]) => void;
  onUpload?: (images: any[]) => void;
  onCreate?: () => void;
  isLoading?: boolean;
  forUpdate?: boolean;
  btnText?: string;
}

function ImagePreview({
  images,
  setImagesToUpload,
}: {
  images: any[];
  setImagesToUpload: Function;
}) {
  return (
    <ScrollArea className="w-[45rem] whitespace-nowrap rounded-md border">
      <div className="flex w-full h-[10rem] space-x-10 p-4 items-center justify-center">
        {images.length > 0 ? (
          images.map((image, i) => (
            <div key={i} className="relative shrink-0">
              <div className="overflow-hidden rounded-md">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Photo by ${image}`}
                  className="object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <IoMdClose
                className="absolute top-0 right-0 mr-[-1.5rem] cursor-pointer"
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
        ) : (
          <span className="justify-self-center">No images to preview</span>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default function ImageUploadCard({
  images,
  setImagesToUpload,
  onUpload: uploadCb,
  onCreate,
  isLoading,
  forUpdate, // if this component is being used for updating/editing a product
  btnText,
}: ImageUploadCardProps) {
  const handleDrop = useCallback((files: any) => {
    uploadCb && uploadCb(files);
  }, []);

  return (
    <Card className="flex-1 max-w-[53rem]">
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
              <span>
                {btnText
                  ? btnText
                  : forUpdate
                  ? "Update Product"
                  : "Create Product"}
              </span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
