import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { userId } = auth();
      const { ...values } = await req.json();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const ownProfile = await db.profile.findUnique({
        where: {
          userId,
        },
      });
  
      if (!ownProfile) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const profile = await db.profile.update({
        where: {
          id: params.id,
        },
        data: {
          ...values,
        },
      });
  
      return NextResponse.json(profile);
    } catch (error) {
      console.log("[PROFILE_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }