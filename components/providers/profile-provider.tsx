"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { currentProfile } from "@/lib/current-profile";
import { MemberRole } from "@prisma/client";

type Profile = {
  name: string;
  email: string;
  role: MemberRole;
};

type ProfileContextType = {
  profile: Profile | null;
  isLoading: boolean;
};

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  isLoading: true,
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await currentProfile();
        setProfile(profile);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};