import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function getMuxAsset(assetId: string, muxAccessTokenId: string, muxAccessTokenSecret: string) {
  const response = await fetch(`https://api.mux.com/video/v1/assets/${assetId}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${muxAccessTokenId}:${muxAccessTokenSecret}`).toString("base64")}`,
    },
  });

  return response.json();
}

async function isMuxAssetPlayable(assetId: string, muxAccessTokenId: string, muxAccessTokenSecret: string) {
  const asset = await getMuxAsset(assetId, muxAccessTokenId, muxAccessTokenSecret);

  return asset.status === "ready" && asset.playback_ids?.[0]?.status === "ready";
}

async function createMuxAsset(chapter: any, params: any, muxAccessTokenId: string, muxAccessTokenSecret: string) {
  const asset = await Video.Assets.create({
    input: chapter.videoUrl,
    playback_policy: "public",
    test: false,
  });

  await db.muxData.create({
    data: {
      chapterId: params.chapterId,
      assetId: asset.id,
      playbackId: asset.playback_ids?.[0]?.id,
    },
  });
}

async function reinitializeMuxAsset(chapter: any, existingMuxData: any, params: any, muxAccessTokenId: string, muxAccessTokenSecret: string) {
  const asset = await Video.Assets.create({
    input: chapter.videoUrl,
    playback_policy: "public",
    test: false,
    passthrough: "reinitialize",
  });

  await db.muxData.create({
    data: {
      chapterId: params.chapterId,
      assetId: asset.id,
      playbackId: asset.playback_ids?.[0]?.id,
    },
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.text() || "";

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { isPublished, ...values } = body ? JSON.parse(body) : "";

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    if (chapter.videoUrl) {
      const muxAccessTokenId = process.env.MUX_TOKEN_ID || "";
      const muxAccessTokenSecret = process.env.MUX_TOKEN_SECRET || "";
      
      // Get Existing Mux Data
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });
      
      if (existingMuxData) {
        const assetPlayable = await isMuxAssetPlayable(existingMuxData.assetId, muxAccessTokenId, muxAccessTokenSecret);
      
        if (!assetPlayable) {
          // Reinitialize the Mux asset if it exists but is not playable.
          await reinitializeMuxAsset(chapter, existingMuxData, params, muxAccessTokenId, muxAccessTokenSecret);
        }
      } else {
        // Create a new Mux asset if no Mux data exists.
        await createMuxAsset(chapter, params, muxAccessTokenId, muxAccessTokenSecret);
      }
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}