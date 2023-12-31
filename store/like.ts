import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

import { Like } from "@/types/types";
import useGetLikesByPostId from "@/hooks/use-get-likes-by-post-id";

interface LikeStore {
  likesByPost: Like[];
  setLikesByPost: (postId: string) => void;
}

export const useLikeStore = create<LikeStore>()(
  devtools(
    persist(
      (set) => ({
        likesByPost: [],

        setLikesByPost: async (postId: string) => {
          /* eslint-disable-next-line react-hooks/rules-of-hooks */
          const result = await useGetLikesByPostId(postId);
          set({ likesByPost: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
