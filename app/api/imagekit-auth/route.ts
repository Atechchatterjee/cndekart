import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

/**
 * headers sent in the response are configured in next.config.js file
 * headers: {
 *  "Access-Control-Allow-Origin":"*",
 *  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
 * }
 * */
function imagekitAuthHandler(req: NextRequest) {
  const imagekit = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "",
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "",
  });
  var result = imagekit.getAuthenticationParameters();
  return NextResponse.json(result);
}

export { imagekitAuthHandler as GET, imagekitAuthHandler as POST };
