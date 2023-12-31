import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

import { Post, PostWithProfile } from "@/types/types";
import useGetAllPosts from "@/hooks/use-get-all-posts";
import useGetPostsByUser from "@/hooks/use-get-posts-by-user";
import useGetPostById from "@/hooks/use-get-post-by-id";

interface PostStore {
  allPosts: PostWithProfile[];
  postsByUser: Post[];
  postById: PostWithProfile | null;
  setAllPosts: () => void;
  setPostsByUser: (userId: string) => void;
  setPostById: (postId: string) => void;
}

export const usePostStore = create<PostStore>()(
  devtools(
    persist(
      (set) => ({
        allPosts: [],
        postsByUser: [],
        postById: null,

        setAllPosts: async () => {
          /* eslint-disable-next-line react-hooks/rules-of-hooks */
          const result = await useGetAllPosts();
          set({ allPosts: result });
        },
        setPostsByUser: async (userId: string) => {
          /* eslint-disable-next-line react-hooks/rules-of-hooks */
          const result = await useGetPostsByUser(userId);
          set({ postsByUser: result });
        },
        setPostById: async (postId: string) => {
          /* eslint-disable-next-line react-hooks/rules-of-hooks */
          const result = await useGetPostById(postId);
          set({ postById: result });
        },
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
