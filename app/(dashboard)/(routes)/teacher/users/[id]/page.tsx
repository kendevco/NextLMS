import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Eye, Video } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { ImageForm } from "./_components/image-form";
import { MemberRoleForm } from "./_components/member-role-form";

interface ProfileIdPageProps {
  params: {
    id: string;
  };
}

const ProfileIdPage: React.FC<ProfileIdPageProps> = async ({ params }) => {
  const { id } = params;
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    return redirect("/teacher/users/");
  }

  const profile = await db.profile.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!profile) {
    return redirect("/teacher/users/");
  }

  const requiredFields = [profile.imageUrl, profile.role];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/users/`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to user list
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Profile Management</h1>
              </div>
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300 ">
              Complete all fields {completionText}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-ceenter gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl font-medium">Customize your profile</h2>
              </div>
              <ImageForm
                initialData={profile}
                id={params.id}
              />
              <MemberRoleForm
                initialData={profile}
                id={params.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileIdPage;