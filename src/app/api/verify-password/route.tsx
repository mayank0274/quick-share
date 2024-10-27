import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, filesCollection } from "@/models/name";
import { Query } from "node-appwrite";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { fileEntryId, password } = await req.json();

    if (!fileEntryId || !password) {
      return NextResponse.json(
        { success: false, message: "file and password is required" },
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

    if (file.isPasswordEnabled) {
      const isPwdMatch = await bcrypt.compare(password, file.password);

      if (isPwdMatch) {
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
            message: "incorrect passowrd",
            success: false,
            fileId: "",
            isPasswordEnabled: true,
          },
          { status: 403 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "something went wrong while preparing your download",
      },
      { status: 500 }
    );
  }
}
