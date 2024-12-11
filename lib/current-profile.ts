import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  try {
    const session = await auth();
    const userId = session?.userId;

    if (!userId) {
      return null;
    }

    const profile = await db.profile.findUnique({
      where: {
        userId
      }
    });

    return profile;
  } catch (error) {
    console.error("CURRENT_PROFILE_ERROR", error);
    return null;
  }
};
