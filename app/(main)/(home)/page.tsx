"use client";

import ClientOnly from "@/components/client-only";
import PostMain from "../_components/post-main";

export default function Home() {
  return (
    <main className="mt-[80px] w-[calc(100%-90px)] max-w-[690px] ml-auto">
      <ClientOnly>
        <PostMain
          post={{
            id: "1",
            user_id: "1",
            video_url: "/mockVideo.mp4",
            text: "text",
            created_at: "date",
            profile: {
              user_id: "1",
              name: "user name",
              image: "https://placehold.co/100",
            },
          }}
        />
      </ClientOnly>
    </main>
  );
}
