import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { FaCommentDots, FaShare } from "react-icons/fa";

import { PostMainLikesCompTypes } from "@/types/component";
import { Like, Comment } from "@/types/types";
import { useGeneralStore } from "@/store/general";
import { useUser } from "@/context/user";
import useGetCommentsByPostId from "@/hooks/use-get-comments-by-post-id";
import useGetLikesByPostId from "@/hooks/use-get-likes-by-post-id";
import useIsLiked from "@/hooks/use-is-liked";
import useCreateLike from "@/hooks/use-create-like";
import useDeleteLike from "@/hooks/use-delete-like";

export default function PostMainLikes({ post }: PostMainLikesCompTypes) {
  const { setIsLoginOpen } = useGeneralStore();
  const userContext = useUser();

  const router = useRouter();

  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const getAllCommentsByPost = useCallback(async () => {
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const result = await useGetCommentsByPostId(post?.id);
    setComments(result);
  }, [post?.id]);

  const getAllLikesByPost = useCallback(async () => {
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const result = await useGetLikesByPostId(post?.id);
    setLikes(result);
  }, [post?.id]);

  useEffect(() => {
    getAllLikesByPost();
    getAllCommentsByPost();
  }, [getAllLikesByPost, getAllCommentsByPost]);

  const hasUserLikedPost = useCallback(() => {
    if (!userContext) return;

    if (likes?.length < 1 || !userContext?.user?.id) {
      setUserLiked(false);
      return;
    }
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const res = useIsLiked(userContext?.user?.id, post?.id, likes);
    setUserLiked(res ? true : false);
  }, [likes, post?.id, userContext]);

  useEffect(() => {
    hasUserLikedPost();
  }, [hasUserLikedPost]);

  const like = async () => {
    setHasClickedLike(true);
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    await useCreateLike(userContext?.user?.id || "", post?.id);
    await getAllLikesByPost();
    hasUserLikedPost();
    setHasClickedLike(false);
  };

  const unlike = async (id: string) => {
    setHasClickedLike(true);
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    await useDeleteLike(id);
    await getAllLikesByPost();
    hasUserLikedPost();
    setHasClickedLike(false);
  };

  const likeOrUnlike = () => {
    if (!userContext?.user?.id) {
      setIsLoginOpen(true);
      return;
    }
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const res = useIsLiked(userContext?.user?.id, post?.id, likes);

    if (!res) {
      like();
    } else {
      likes.forEach((like: Like) => {
        if (
          userContext?.user?.id == like?.user_id &&
          like?.post_id == post?.id
        ) {
          unlike(like?.id);
        }
      });
    }
  };

  return (
    <div
      id={`PostMainLikes-${post?.id}`}
      className="relative mr-[75px]"
    >
      <div className="absolute bottom-0 pl-2">
        <div className="pb-4 text-center">
          <button
            disabled={hasClickedLike}
            onClick={likeOrUnlike}
            className="rounded-full bg-gray-200 p-2 cursor-pointer"
          >
            {!hasClickedLike ? (
              <AiFillHeart
                color={likes?.length > 0 && userLiked ? "#b91c1c" : ""}
                size="25"
              />
            ) : (
              <BiLoaderCircle
                className="animate-spin"
                size="25"
              />
            )}
          </button>
          <span className="text-xs text-gray-800 font-semibold">
            {likes?.length}
          </span>
        </div>

        <button
          onClick={() =>
            router.push(`/post/${post?.id}/${post?.profile?.user_id}`)
          }
          className="pb-4 text-center"
        >
          <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
            <FaCommentDots size="25" />
          </div>
          <span className="text-xs text-gray-800 font-semibold">
            {comments?.length}
          </span>
        </button>

        <button className="text-center">
          <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
            <FaShare size="25" />
          </div>
          <span className="text-xs text-gray-800 font-semibold">55</span>
        </button>
      </div>
    </div>
  );
}
