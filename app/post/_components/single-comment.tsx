import { useState } from "react";

import { SingleCommentCompTypes } from "@/types/component";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { BiLoaderCircle } from "react-icons/bi";
import { TfiTrash } from "react-icons/tfi";

export default function SingleComment({
  comment,
  params,
}: SingleCommentCompTypes) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteThisComment = () => {
    console.log("deleteThisComment");
  };

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
            src={comment.profile.image}
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

            {true ? (
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
