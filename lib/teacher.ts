import { currentProfile } from "./current-profile"

export const isTeacher = async () => {
    const profile  = await currentProfile();

    // write values to console
    //console.log("C:\\Data\\Dev\\Fullstack\\NextLMS\\lib\\teacher.ts isTeacher", profile);

    if (profile) {
        console.log("teacher.ts_IsTeacher: ", profile.role === "ADMIN" || profile.role === "TEACHER")
        return profile.role === "ADMIN" || profile.role === "TEACHER";
     }
    return false;
}