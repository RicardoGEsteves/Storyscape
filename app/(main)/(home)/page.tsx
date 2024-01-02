"use client";

import { useEffect } from "react";

import ClientOnly from "@/components/client-only";
import { usePostStore } from "@/store/post";
import PostMain from "../_components/post-main";

export default function HomePage() {
  const { allPosts, setAllPosts } = usePostStore();

  useEffect(() => {
    setAllPosts();
  }, [setAllPosts]);

  return (
    <main className="mt-[80px] w-[calc(100%-90px)] max-w-[690px] ml-auto">
      <ClientOnly>
        {allPosts.map((post) => (
          <PostMain
            post={post}
            key={post.id}
          />
        ))}
      </ClientOnly>
    </main>
  );
}
