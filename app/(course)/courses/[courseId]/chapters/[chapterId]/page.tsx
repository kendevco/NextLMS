import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/banner';
import { auth } from '@clerk/nextjs';
import { Video } from 'lucide-react';
import { redirect, useParams } from 'next/navigation';
import * as React from 'react';
import { VideoPlayer } from './_components/video-player';

const ChapterIdPage = async ({
    params
} : {
    params: { chapterId:string, courseId: string; }
}) => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/")
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    })

    if (!chapter || !course) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (  
        <div>
            {userProgress?.isCompleted && (
                <Banner 
                    variant="success"
                    label="You have completed this chapter"
                />
            )}
            {userProgress?.isCompleted && (
                <Banner 
                    variant="warning"
                    label="You need to purchase this course to watch this chapter."
                />
            )}

            <div className='flex flex-col max-w-4xl mx-auto pb-20'>
                <div className='p-4'>
                    <VideoPlayer 
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id ?? null}
                        playbackId={muxData?.playbackId ?? null}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
            </div> 


        </div>
    );
}
 
export default ChapterIdPage;