import { useState } from "react";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { BiLoaderCircle } from "react-icons/bi";
import { TfiTrash } from "react-icons/tfi";

import { SingleCommentCompTypes } from "@/types/component";
import { useUser } from "@/context/user";
import { useCommentStore } from "@/store/comment";
import useDeleteComment from "@/hooks/use-delete-comment";
import useCreateBucketUrl from "@/hooks/use-create-bucket-url";

export default function SingleComment({
  comment,
  params,
}: SingleCommentCompTypes) {
  const userContext = useUser();
  const { setCommentsByPost } = useCommentStore();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteThisComment = async () => {
    const res = confirm("Are you sure you want to delete this comment?");
    if (!res) return;

    try {
      setIsDeleting(true);
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      await useDeleteComment(comment?.id);
      setCommentsByPost(params?.postId);
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  const bucketUrl = useCreateBucketUrl(comment.profile.image);

  return (
    <div
      id="SingleComment"
      className="flex items-center justify-between px-8 mt-4"
    >
      <div className="flex items-center relative w-full">
        <Link href={`/profile/${comment.profile.user_id}`}>
          <Image
            className="absolute top-0 rounded-full lg:mx-0 mx-auto"
            width={40}
            height={40}
            src={bucketUrl}
            alt="profile image"
          />
        </Link>

        <div className="ml-14 pt-0.5 w-full">
          <div className="text-[18px] font-semibold flex items-center justify-between">
            <span className="flex items-center">
              {comment?.profile?.name} -
              <span className="text-[12px] text-gray-600 font-light ml-1 mt-[4px]">
                {moment(comment?.created_at).calendar()}
              </span>
            </span>

            {userContext?.user?.id == comment.profile.user_id ? (
              <button
                disabled={isDeleting}
                onClick={deleteThisComment}
              >
                {isDeleting ? (
                  <BiLoaderCircle
                    className="animate-spin"
                    color="#84cc16"
                    size="20"
                  />
                ) : (
                  <TfiTrash
                    className="cursor-pointer"
                    size="25"
                  />
                )}
              </button>
            ) : null}
          </div>

          <p className="text-[15px] font-light">{comment.text}</p>
        </div>
      </div>
    </div>
  );
}
