import { Category, Course } from '@prisma/client';

import { CourseCard } from './course-card';

interface CoursesListProps {
    items: Course[];
}

export const CoursesList = ({ items }: CoursesListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((course) => (
                <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    imageUrl ={course.imageUrl!}
                    chaptersLength={course.chapters.length}
                    price={course.price!}
                    progress={course.progress}
                    category={course?.category?.name}
                    description={course.description}
                />
            ))}
            </div>
            {items.length === 0 && (
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-200">No courses found</p>
                </div>   
            )}
        </div>
    );
};