import { NextRequest, NextResponse } from "next/server";
import { databases, storage } from "@/models/server/config";
import { db, filesAttachmentBucket, filesCollection } from "@/models/name";
import { ID } from "node-appwrite";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { fileId, isPasswordEnabled, password, uploadedBy } =
      await req.json();

    if (!uploadedBy || !fileId) {
      return NextResponse.json(
        { success: false, message: "email and file is required" },
        { status: 422 }
      );
    }

    if (isPasswordEnabled && !password) {
      return NextResponse.json(
        {
          success: false,
          message: "either disable password protection or enter password",
        },
        { status: 422 }
      );
    }

    const targetFile = storage.getFile(filesAttachmentBucket, fileId);

    if (!targetFile) {
      return NextResponse.json(
        {
          success: false,
          message: "invalid file",
        },
        { status: 404 }
      );
    }

    let hashedPwd;
    if (password != "" && isPasswordEnabled) {
      const salt = await bcrypt.genSalt(10);
      hashedPwd = await bcrypt.hash(password, salt);
    }

    const fileEntry = await databases.createDocument(
      db,
      filesCollection,
      ID.unique(),
      {
        fileId,
        isPasswordEnabled,
        password: isPasswordEnabled ? hashedPwd : "",
        uploadedBy,
      }
    );

    return NextResponse.json(
      {
        message: "download link generated successfully",
        fileId: fileEntry.$id,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "something went wrong while login" },
      { status: 400 }
    );
  }
}
