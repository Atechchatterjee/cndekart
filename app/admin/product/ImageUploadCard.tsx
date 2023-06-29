"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import Dropzone from "react-dropzone";
import Image from "next/image";

function ImagePreview({ images }: { images: any[] }) {
  return (
    <>
      {images.map((image, i) => (
        <div className="flex gap-3" key={i}>
          <Image
            src={URL.createObjectURL(image)}
            width={100}
            height={100}
            alt=""
          />
          <p>{image.name}</p>
        </div>
      ))}
    </>
  );
}

export default function ImageUploadCard({
  images,
  onUpload: uploadCb,
  onCreate,
}: {
  images: any[];
  onUpload?: (images: any[]) => void;
  onCreate?: () => void;
}) {
  const handleDrop = useCallback((files: any) => {
    uploadCb && uploadCb(files);
  }, []);

  return (
    <Card className="flex-1 mt-8">
      <CardContent className="flex flex-col gap-5">
        <Dropzone onDrop={handleDrop}>
          {({ isDragActive, getRootProps, getInputProps }) => (
            <div
              {...getRootProps({
                className:
                  "flex w-full border border-dashed h-[20rem] border-slate-200 rounded-lg mt-5 cursor-pointer justify-center",
              })}
            >
              <input {...getInputProps()} />
              <div className="self-center">
                {images && images.length > 0 ? (
                  <ImagePreview images={images} />
                ) : isDragActive ? (
                  <p>Drop your images here</p>
                ) : (
                  <p>Drag n Drop images or click to upload</p>
                )}
              </div>
            </div>
          )}
        </Dropzone>
        <Button
          variant="primary"
          className="w-full gap-3"
          type="submit"
          size="lg"
          onClick={() => onCreate && onCreate()}
        >
          Create Product
        </Button>
      </CardContent>
    </Card>
  );
}
