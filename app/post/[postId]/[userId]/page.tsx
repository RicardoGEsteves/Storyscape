"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { PostPageTypes } from "@/types/component";
import CommentsHeader from "../../_components/comments-header";
import Comments from "../../_components/comments";
import ClientOnly from "@/components/client-only";

export default function PostPage({ params }: PostPageTypes) {
  const router = useRouter();

  const postById = {
    id: "1",
    user_id: "1",
    video_url: "/mockVideo.mp4",
    text: "text",
    created_at: "2021-09-01T00:00:00.000Z",
    profile: {
      user_id: "1",
      name: "user name",
      image: "https://placehold.co/100",
    },
  };

  const loopThroughPostsUp = () => {
    console.log("loopThroughPostsUp");
  };

  const loopThroughPostsDown = () => {
    console.log("loopThroughPostsDown");
  };

  return (
    <div
      id="PostPage"
      className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
    >
      <div className="lg:w-[calc(100%-540px)] h-full relative">
        <Link
          href={`/profile/${params?.userId}`}
          className="absolute text-neutral-950 z-20 m-5 rounded-full bg-lime-500 p-0.5 hover:bg-lime-600"
        >
          <AiOutlineClose size="27" />
        </Link>

        <>
          <button
            onClick={loopThroughPostsUp}
            className="absolute text-neutral-950 z-20 right-4 top-5 flex items-center justify-center rounded-full bg-lime-500 hover:bg-lime-600"
          >
            <BiChevronUp size="32" />
          </button>

          <button
            onClick={loopThroughPostsDown}
            className="absolute text-neutral-950 z-20 right-4 top-20 flex items-center justify-center rounded-full bg-lime-500 hover:bg-lime-600"
          >
            <BiChevronDown size="32" />
          </button>
        </>

        <Image
          className="absolute z-20 top-[16px] left-[70px] rounded-full lg:mx-0 mx-auto"
          width={40}
          height={40}
          src="/logo.png"
          alt="Logo"
        />

        {postById?.video_url ? (
          <video
            className="fixed object-cover w-full my-auto z-[0] h-screen"
            src="/mockVideo.mp4"
          />
        ) : null}

        <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
          {postById?.video_url ? (
            <video
              autoPlay
              controls
              loop
              muted
              className="h-screen mx-auto"
              src="/mockVideo.mp4"
            />
          ) : null}
        </div>
      </div>

      <div
        id="InfoSection"
        className="lg:max-w-[550px] relative w-full h-full bg-white"
      >
        <div className="py-7" />

        <ClientOnly>
          {postById ? (
            <CommentsHeader
              post={postById}
              params={params}
            />
          ) : null}
        </ClientOnly>

        <Comments params={params} />
      </div>
    </div>
  );
}
