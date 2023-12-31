import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

import { CommentWithProfile } from "@/types/types";
import useGetCommentsByPostId from "@/hooks/use-get-comments-by-post-id";

interface CommentStore {
  commentsByPost: CommentWithProfile[];
  setCommentsByPost: (postId: string) => void;
}

export const useCommentStore = create<CommentStore>()(
  devtools(
    persist(
      (set) => ({
        commentsByPost: [],

        setCommentsByPost: async (postId: string) => {
          /* eslint-disable-next-line react-hooks/rules-of-hooks */
          const result = await useGetCommentsByPostId(postId);
          set({ commentsByPost: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
