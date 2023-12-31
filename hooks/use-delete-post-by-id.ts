import { database, storage } from "@/libs/appwrite-client";
import useDeleteLike from "./use-delete-like";
import useGetCommentsByPostId from "./use-get-comments-by-post-id";
import useGetLikesByPostId from "./use-get-likes-by-post-id";
import useDeleteComment from "./use-delete-comment";

const useDeletePostById = async (postId: string, currentImage: string) => {
  try {
    const likes = await useGetLikesByPostId(postId);
    likes.forEach(async (like) => {
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      await useDeleteLike(like?.id);
    });

    const comments = await useGetCommentsByPostId(postId);
    comments.forEach(async (comment) => {
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      await useDeleteComment(comment?.id);
    });

    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
      postId
    );
    await storage.deleteFile(
      String(process.env.NEXT_PUBLIC_BUCKET_ID),
      currentImage
    );
  } catch (error) {
    throw error;
  }
};

export default useDeletePostById;
