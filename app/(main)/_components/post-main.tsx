"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImMusic } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";

import { PostMainCompTypes } from "@/types/component";
import PostMainLikes from "./post-main-likes";
import useCreateBucketUrl from "@/hooks/use-create-bucket-url";

export default function PostMain({ post }: PostMainCompTypes) {
  useEffect(() => {
    const video = document.getElementById(
      `video-${post.id}`
    ) as HTMLVideoElement;
    const postMain = document.getElementById(
      `PostMain-${post.id}`
    ) as HTMLDivElement;

    if (postMain) {
      let observer = new IntersectionObserver(
        (entries) => {
          entries.at(0)?.isIntersecting ? video.play() : video.pause();
        },
        { threshold: 0.6 }
      );

      observer.observe(postMain);
    }
  }, [post.id]);

  const imageBucketUrl = useCreateBucketUrl(post?.profile?.image);
  const videoBucketUrl = useCreateBucketUrl(post?.video_url);

  return (
    <div
      id={`PostMain-${post.id}`}
      className="flex border-b py-6"
    >
      <div className="cursor-pointer">
        <Image
          className="rounded-full max-h-[60px]"
          width={60}
          height={60}
          src={imageBucketUrl}
          alt="post profile picture"
        />
      </div>

      <div className="pl-3 w-full px-4">
        <div className="flex items-center justify-between pb-0.5">
          <Link href={`/profile/${post.profile.user_id}`}>
            <span className="font-bold hover:underline cursor-pointer">
              {post.profile.name}
            </span>
          </Link>

          <button className="border text-[15px] px-[21px] py-0.5 border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-white font-semibold rounded-md">
            Follow
          </button>
        </div>
        <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">
          {post.text}
        </p>
        <p className="text-[14px] text-gray-500 pb-0.5">
          #wow #nice #good #great #amazing
        </p>
        <p className="text-[14px] pb-0.5 flex items-center font-semibold">
          <ImMusic size="17" />
          <span className="px-1">original sound - STUNNING</span>
          <AiFillHeart size="20" />
        </p>

        <div className="mt-2.5 flex">
          <div className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer">
            <video
              id={`video-${post.id}`}
              loop
              controls
              muted
              className="rounded-xl object-cover mx-auto h-full"
              src={videoBucketUrl}
            />
            <Image
              className="absolute right-1.5 bottom-16"
              width={40}
              height={40}
              src="/logo.png"
              alt="Storyscape logo"
              priority
            />
          </div>

          <PostMainLikes post={post} />
        </div>
      </div>
    </div>
  );
}
