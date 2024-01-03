"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { PostPageTypes } from "@/types/component";
import CommentsHeader from "../../_components/comments-header";
import Comments from "../../_components/comments";
import ClientOnly from "@/components/client-only";
import { useCommentStore } from "@/store/comment";
import { useLikeStore } from "@/store/like";
import { usePostStore } from "@/store/post";
import useCreateBucketUrl from "@/hooks/use-create-bucket-url";

export default function PostPage({ params }: PostPageTypes) {
  const { postById, setPostById, postsByUser, setPostsByUser } = usePostStore();
  const { setCommentsByPost } = useCommentStore();
  const { setLikesByPost } = useLikeStore();

  const router = useRouter();

  useEffect(() => {
    setPostById(params.postId);
    setCommentsByPost(params.postId);
    setLikesByPost(params.postId);
    setPostsByUser(params.userId);
  }, [
    params.postId,
    params.userId,
    setCommentsByPost,
    setLikesByPost,
    setPostById,
    setPostsByUser,
  ]);

  const loopThroughPostsUp = () => {
    postsByUser.forEach((post) => {
      if (post.id > params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    });
  };

  const loopThroughPostsDown = () => {
    postsByUser.forEach((post) => {
      if (post.id < params.postId) {
        router.push(`/post/${post.id}/${params.userId}`);
      }
    });
  };

  const bucketUrl = useCreateBucketUrl(postById?.video_url!);

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
          priority
        />

        {postById?.video_url ? (
          <video
            className="fixed object-cover w-full my-auto z-[0] h-screen"
            src={bucketUrl}
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
              src={bucketUrl}
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
