import { currentProfile } from "./current-profile"

export const isTeacher = async () => {
    const profile  = await currentProfile();

    // write values to console
    //console.log("C:\\Data\\Dev\\Fullstack\\NextLMS\\lib\\teacher.ts isTeacher", profile);

    if (profile) {
        return profile.role === "ADMIN";
        console.log("IsTeacher: ", profile.role === "ADMIN")
    }
    return false;
}