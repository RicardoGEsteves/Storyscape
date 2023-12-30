"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { User, UserContextTypes } from "@/types/types";
import { account, ID } from "@/libs/appwrite-client";
import useGetProfileByUserId from "@/hooks/use-get-profile-by-user-id";
import useCreateProfile from "@/hooks/use-create-profile";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextTypes | null>(null);
const UserProvider = ({ children }: UserProviderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const checkUser = async () => {
    try {
      const currentSession = await account.getSession("current");
      if (!currentSession) return;

      const promise = (await account.get()) as any;
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      const profile = await useGetProfileByUserId(promise?.$id);

      setUser({
        id: promise?.$id,
        name: promise?.name,
        bio: profile?.bio,
        image: profile?.image,
      });
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      // Create account
      const promise = await account.create(ID.unique(), email, password, name);
      // Log user in
      await account.createEmailSession(email, password);

      // Create user profile
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      await useCreateProfile(
        promise?.$id,
        name,
        String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID),
        ""
      );
      // Check user/ Confirm user data
      await checkUser();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Log user in
      await account.createEmailSession(email, password);
      // Check user/ Confirm user data
      checkUser();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      // Log user out
      await account.deleteSession("current");
      // Clear user data
      setUser(null);
      // Refresh page
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout, checkUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
