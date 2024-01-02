import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import { TfiTrash } from "react-icons/tfi";

import { CommentsHeaderCompTypes } from "@/types/component";
import { useUser } from "@/context/user";
import { useLikeStore } from "@/store/like";
import { useCommentStore } from "@/store/comment";
import { useGeneralStore } from "@/store/general";
import useIsLiked from "@/hooks/use-is-liked";
import useCreateLike from "@/hooks/use-create-like";
import useDeleteLike from "@/hooks/use-delete-like";
import useDeletePostById from "@/hooks/use-delete-post-by-id";
import useCreateBucketUrl from "@/hooks/use-create-bucket-url";

export default function CommentsHeader({
  post,
  params,
}: CommentsHeaderCompTypes) {
  const { setLikesByPost, likesByPost } = useLikeStore();
  const { setCommentsByPost, commentsByPost } = useCommentStore();
  const { setIsLoginOpen } = useGeneralStore();

  const userContext = useUser();
  const router = useRouter();

  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);

  useEffect(() => {
    setCommentsByPost(params?.postId);
    setLikesByPost(params?.postId);
  }, [params?.postId, setCommentsByPost, setLikesByPost]);

  const hasUserLikedPost = useCallback(() => {
    if (likesByPost.length < 1 || !userContext?.user?.id) {
      setUserLiked(false);
      return;
    }
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const res = useIsLiked(userContext.user.id, params.postId, likesByPost);
    setUserLiked(res ? true : false);
  }, [likesByPost, params.postId, userContext.user?.id]);

  useEffect(() => {
    hasUserLikedPost();
  }, [hasUserLikedPost]);

  const like = async () => {
    try {
      setHasClickedLike(true);
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      await useCreateLike(userContext?.user?.id || "", params.postId);
      setLikesByPost(params.postId);
      setHasClickedLike(false);
    } catch (error) {
      console.log(error);
      setHasClickedLike(false);
    }
  };

  const unlike = async (id: string) => {
    try {
      setHasClickedLike(true);
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      await useDeleteLike(id);
      setLikesByPost(params.postId);
      setHasClickedLike(false);
    } catch (error) {
      console.log(error);
      setHasClickedLike(false);
    }
  };

  const likeOrUnlike = () => {
    if (!userContext?.user) return setIsLoginOpen(true);

    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const res = useIsLiked(userContext.user.id, params.postId, likesByPost);
    if (!res) {
      like();
    } else {
      likesByPost.forEach((like) => {
        if (
          userContext?.user?.id &&
          userContext.user.id == like.user_id &&
          like.post_id == params.postId
        ) {
          unlike(like.id);
        }
      });
    }
  };

  const deletePost = async () => {
    const res = confirm("Are you sure you want to delete this post?");
    if (!res) return;

    setIsDeleting(true);

    try {
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      await useDeletePostById(params?.postId, post?.video_url);
      router.push(`/profile/${params.userId}`);
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  const bucketUrl = useCreateBucketUrl(post?.profile.image);

  return (
    <>
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center">
          <Link href={`/profile/${post?.user_id}`}>
            {post?.profile.image ? (
              <Image
                className="rounded-full lg:mx-0 mx-auto"
                width={40}
                height={40}
                src={bucketUrl}
                alt="profile image"
              />
            ) : (
              <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
            )}
          </Link>

          <div className="ml-3 pt-0.5">
            <Link
              href={`/profile/${post?.user_id}`}
              className="relative z-10 text-[17px] font-semibold hover:underline"
            >
              {post?.profile.name}
            </Link>

            <div className="relative z-0 text-[13px] -mt-5 font-light">
              {post?.profile.name}
              <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5 ">
                .
              </span>
              <span className="font-medium">
                {moment(post?.created_at).calendar()}
              </span>
            </div>
          </div>
        </div>

        {userContext?.user?.id == post?.user_id ? (
          <div>
            {isDeleting ? (
              <BiLoaderCircle
                className="animate-spin"
                size="25"
              />
            ) : (
              <button
                disabled={isDeleting}
                onClick={deletePost}
              >
                <TfiTrash
                  className="cursor-pointer"
                  size="25"
                />
              </button>
            )}
          </div>
        ) : null}
      </div>

      <p className="px-8 mt-4 text-sm">{post?.text}</p>

      <p className="flex item-center gap-2 px-8 mt-4 text-sm font-bold">
        <ImMusic size="17" />
        original sound - {post?.profile.name}
      </p>

      <div className="flex items-center px-8 mt-8">
        <div className="pb-4 text-center flex items-center">
          <button
            disabled={hasClickedLike}
            onClick={likeOrUnlike}
            className="rounded-full bg-gray-200 p-2 cursor-pointer"
          >
            {!hasClickedLike ? (
              <AiFillHeart
                color={likesByPost.length > 0 && userLiked ? "#b91c1c" : ""}
                size="25"
              />
            ) : (
              <BiLoaderCircle
                className="animate-spin"
                size="25"
              />
            )}
          </button>
          <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">
            {likesByPost.length}
          </span>
        </div>

        <div className="pb-4 text-center flex items-center">
          <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
            <BsChatDots size={25} />
          </div>
          <span className="text-xs pl-2 text-gray-800 font-semibold">
            {commentsByPost?.length}
          </span>
        </div>
      </div>
    </>
  );
}
