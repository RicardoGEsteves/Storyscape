import { Query, database } from "@/libs/appwrite-client";
import useGetProfileByUserId from "./use-get-profile-by-user-id";

const useGetAllPosts = async () => {
  try {
    const response = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_POST),
      [Query.orderDesc("$id")]
    );
    const documents = response.documents;

    const objPromises = documents.map(async (doc) => {
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      let profile = await useGetProfileByUserId(doc?.user_id);

      return {
        id: doc?.$id,
        user_id: doc?.user_id,
        video_url: doc?.video_url,
        text: doc?.text,
        created_at: doc?.created_at,
        profile: {
          user_id: profile?.user_id,
          name: profile?.name,
          image: profile?.image,
        },
      };
    });

    const result = await Promise.all(objPromises);
    return result;
  } catch (error) {
    throw error;
  }
};

export default useGetAllPosts;
