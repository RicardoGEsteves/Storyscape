"use client";

import Image from "next/image";

import { ProfilePageTypes } from "@/types/component";
import { User } from "@/types/types";
import { FaRegEdit } from "react-icons/fa";
import ClientOnly from "@/components/client-only";
import PostUser from "./_components/post-user";

export default function ProfilePage({ params }: ProfilePageTypes) {
  const currentProfile = {
    id: "1",
    user_id: "1",
    name: "test",
    image: "https://placehold.co/200",
    bio: "This is a test bio",
  };

  const post = {
    id: "1",
    text: "This is a test post",
    video_url: "/mockVideo.mp4",
    user_id: "1",
    created_at: "2021-08-01T00:00:00.000Z",
  };

  return (
    <div className="pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">
      <div className="flex w-[calc(100vw-230px)]">
        {true ? (
          <Image
            className="min-w-[120px] w-auto h-auto rounded-full"
            src={currentProfile?.image}
            alt="profile image"
            width={120}
            height={120}
            priority
          />
        ) : (
          <div className="min-w-[150px] h-[150px] bg-gray-200 rounded-full" />
        )}
        <div className="ml-5 w-full">
          {(currentProfile as User)?.name ? (
            <div>
              <p className="text-[30px] font-bold truncate">
                {currentProfile?.name}
              </p>
              <p className="text-[18px] truncate">{currentProfile?.name}</p>
            </div>
          ) : (
            <div className="h-[60px]" />
          )}

          {true ? (
            <button
              //TODO: Add edit profile functionality
              onClick={() => console.log("Edit profile button clicked")}
              className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
            >
              <FaRegEdit
                className="mt-0.5 mr-1"
                size="18"
              />
              <span>Edit profile</span>
            </button>
          ) : (
            <button className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-lime-500">
              Follow
            </button>
          )}
        </div>
        E
      </div>

      <div className="flex items-center pt-4">
        <div className="mr-4">
          <span className="font-bold">10K</span>
          <span className="text-gray-500 font-light text-[15px] pl-1.5">
            Following
          </span>
        </div>

        <div className="mr-4">
          <span className="font-bold">44K</span>
          <span className="text-gray-500 font-light text-[15px] pl-1.5">
            Followers
          </span>
        </div>
      </div>

      <p className="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
        {currentProfile?.bio}
      </p>

      <ul className="w-full flex items-center pt-4 border-b">
        <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">
          Videos
        </li>
        <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">
          Liked
        </li>
      </ul>

      <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
        <ClientOnly>
          <PostUser post={post} />
        </ClientOnly>
      </div>

      <div className="pb-20" />
    </div>
  );
}
