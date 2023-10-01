import { currentUser } from "@clerk/nextjs"

export default async function getCurrentProfile() {
  try {

    const user = await currentUser();

    console.log("getCurrentProfile user", user);

    const currentProfile = await prisma?.profile.findUnique({
      where: {
        userId: user?.id,
      }
    });

    console.log("getCurrentProfile currentProfile", currentProfile);

    if (!currentProfile) {
      return null;
    }

        // currentProfile is passed to client component and client components
        // can only pass stringified JSON objects. So we need to convert   
        // Date objects to ISO strings.
        // The ... operator is used to copy all properties from currentProfile
        // to a new object. We then overwrite the createdAt, updatedAt and
        // emailVerified properties with their ISO string values.
    return {
      ...currentProfile,
      createdAt: currentProfile.createdAt.toISOString(),
      updatedAt: currentProfile.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}

