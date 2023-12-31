import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

import { Profile } from "@/types/types";
import useGetProfileByUserId from "@/hooks/use-get-profile-by-user-id";

interface ProfileStore {
  currentProfile: Profile | null;
  setCurrentProfile: (userId: string) => void;
}

export const useProfileStore = create<ProfileStore>()(
  devtools(
    persist(
      (set) => ({
        currentProfile: null,

        setCurrentProfile: async (userId: string) => {
          /* eslint-disable-next-line react-hooks/rules-of-hooks */
          const result = await useGetProfileByUserId(userId);
          set({ currentProfile: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
