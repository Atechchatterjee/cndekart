import { NextRequest, NextResponse } from "next/server";
import { imagekit } from "@/utils/imagekit";

async function deleteImageHandler(req: NextRequest) {
	const data = await req.json();
	console.log("JSON req data = ", data.imageIds[0]);
	try {
		const res = await imagekit.bulkDeleteFiles(data.imageIds);
		console.log("deleteImageHandler: Images deleted successfully");
		return NextResponse.json({ data: res });
	} catch (err) {
		console.error("deleteImageHandler: Failed to delete images from imagekit");
		console.error(err);
		return NextResponse.json({}, { status: 400 });
	}
}

export { deleteImageHandler as GET, deleteImageHandler as POST };
