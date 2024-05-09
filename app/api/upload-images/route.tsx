import { NextRequest, NextResponse } from "next/server";
import { imagekit } from "@/utils/imagekit";

async function uploadImageHandler(req: NextRequest) {
  try {
    const formData = await req.formData();

    let uploadedFileNames: any[] = [];
    for (const pair of formData.entries()) {
      const file = pair[1] as Blob | null;
      console.log(file);

      if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        try {
          const res = await imagekit.upload({
            file: buffer,
            fileName: file.name,
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
    return NextResponse.json({ fileNames: uploadedFileNames, status: 200 });
  } catch (err) {
    return NextResponse.json({ status: 500 });
  }
}
export { uploadImageHandler as GET, uploadImageHandler as POST };
