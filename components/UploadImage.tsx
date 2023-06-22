"use client";
import { IKContext, IKUpload } from "imagekitio-react";

export default function UploadImage({
  uploadInputRef,
}: {
  uploadInputRef: any;
}) {
  const onUploadStart = (evt: any) => {
    console.log("Started", evt);
  };

  const onUploadProgress = (evt: any) => {
    console.log("Progress: ", evt);
  };

  const onError = (err: any) => {
    alert("Image upload failed");
    console.error("Error");
    console.log(err);
  };

  const onSuccess = (res: any) => {
    alert("Successfully uploaded image to imagekit");
    console.log("Success");
    console.log(res);
  };

  return (
    <IKContext
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticationEndpoint="http://localhost:3000/api/imagekit-auth"
    >
      <IKUpload
        className="hidden"
        inputRef={uploadInputRef}
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={onUploadStart}
        onUploadProgress={onUploadProgress}
      />
    </IKContext>
  );
}
