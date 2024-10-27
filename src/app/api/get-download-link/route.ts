import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, filesCollection } from "@/models/name";
import { Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  try {
    const fileEntryId = req.nextUrl.searchParams.get("fileEntryId");

    if (!fileEntryId) {
      return NextResponse.json(
        { success: false, message: "file is required" },
        { status: 422 }
      );
    }

    const res = await databases.listDocuments(db, filesCollection, [
      Query.equal("$id", fileEntryId),
    ]);

    let file = res.documents[0];

    if (!file) {
      return NextResponse.json(
        { success: false, message: "file not found" },
        { status: 404 }
      );
    }

    if (!file.isPasswordEnabled) {
      return NextResponse.json(
        {
          message: "download link generated successfully",
          isPasswordEnabled: false,
          fileId: file.fileId,
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "download link generated successfully",
          isPasswordEnabled: true,
          fileId: "",
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: "something went wrong while preparing your download",
      },
      { status: 500 }
    );
  }
}
