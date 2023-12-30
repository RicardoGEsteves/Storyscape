import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

import { RandomUsers } from "@/types/types";
import useGetRandomUsers from "@/hooks/use-get-random-users";

interface GeneralStore {
  isLoginOpen: boolean;
  isEditProfileOpen: boolean;
  randomUsers: RandomUsers[];
  setIsLoginOpen: (value: boolean) => void;
  setIsEditProfileOpen: (value: boolean) => void;
  setRandomUsers: () => void;
}

export const useGeneralStore = create<GeneralStore>()(
  devtools(
    persist(
      (set) => ({
        isLoginOpen: false,
        isEditProfileOpen: false,
        randomUsers: [],

        setIsLoginOpen: (value: boolean) => set({ isLoginOpen: value }),
        setIsEditProfileOpen: (value: boolean) =>
          set({ isEditProfileOpen: value }),
        setRandomUsers: async () => {
          /* eslint-disable-next-line react-hooks/rules-of-hooks */
          const result = await useGetRandomUsers();
          set({ randomUsers: result });
        },
      }),
      {
        name: "general-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
