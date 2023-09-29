import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
}

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    coursesInProgress: CourseWithProgressWithCategory[];
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
    try {

        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true
                            },
                        }
                    },
                },
            }
        });

        const courses = purchasedCourses.map((purchase) => purchase.course) as CourseWithProgressWithCategory[];

        for (let course of courses) {
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        // Handle completed and couress in progress
        const completedCourses = courses.filter((course) => course.progress === 100);
        // Handle null progress
        const coursesInProgress = courses.filter((course) => course.progress ?? 0);

        return {
            completedCourses,
            coursesInProgress
        }

    } catch (error) {
        console.log("[GET_DASHBOARD_COURSES]: ", error);
        return  {
            completedCourses: [],
            coursesInProgress: []
        }
    }
}