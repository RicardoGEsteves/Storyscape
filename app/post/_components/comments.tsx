import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

import { CommentsCompTypes } from "@/types/component";
import SingleComment from "./single-comment";
import ClientOnly from "@/components/client-only";

export default function Comments({ params }: CommentsCompTypes) {
  const [comment, setComment] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const addComment = () => {
    console.log("addComment");
  };

  const commentsByPost = [
    {
      id: "1",
      user_id: "1",
      post_id: "1",
      text: "text",
      created_at: "2021-09-01T00:00:00.000Z",
      profile: {
        user_id: "1",
        name: "user name",
        image: "https://placehold.co/100",
      },
    },
  ];

  return (
    <>
      <div
        id="Comments"
        className="relative bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <div className="pt-2" />

        <ClientOnly>
          {commentsByPost.length < 1 ? (
            <div className="text-center mt-6 text-xl text-gray-500">
              No comments...
            </div>
          ) : (
            <div>
              {commentsByPost.map((comment) => (
                <SingleComment
                  key={comment.id}
                  comment={comment}
                  params={params}
                />
              ))}
            </div>
          )}
        </ClientOnly>

        <div className="mb-28" />
      </div>

      <div
        id="CreateComment"
        className="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
      >
        <div
          className={`
                        bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]
                        ${
                          inputFocused
                            ? "border-2 border-gray-400"
                            : "border-2 border-[#F1F1F2]"
                        }
                    `}
        >
          <input
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onChange={(e) => setComment(e.target.value)}
            value={comment || ""}
            className="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
            type="text"
            placeholder="Add comment..."
          />
        </div>

        {!isUploading ? (
          <button
            disabled={!comment}
            onClick={() => addComment()}
            className={`
                            font-semibold text-sm ml-2 px-4 py-2.5 rounded-lg
                            ${
                              comment
                                ? "text-white bg-lime-500 cursor-pointer hover:bg-lime-600"
                                : "text-gray-400"
                            }
                        `}
          >
            Post
          </button>
        ) : (
          <BiLoaderCircle
            className="animate-spin"
            color="#84cc16"
            size="20"
          />
        )}
      </div>
    </>
  );
}
