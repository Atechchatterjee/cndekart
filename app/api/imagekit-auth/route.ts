import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import { imagekit } from "@/utils/imagekit";

/**
 * headers sent in the response are configured in next.config.js file
 * headers: {
 *  "Access-Control-Allow-Origin":"*",
 *  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
 * }
 * */
function imagekitAuthHandler(req: NextRequest) {
  var result = imagekit.getAuthenticationParameters();
  return NextResponse.json(result);
}

export { imagekitAuthHandler as GET, imagekitAuthHandler as POST };
