"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import debounce from "debounce";
import Image from "next/image";
import Link from "next/link";
import { BiSearch, BiUser } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import { useUser } from "@/context/user";
import { useGeneralStore } from "@/store/general";
import { RandomUsers } from "@/types/types";
import useSearchProfilesByName from "@/hooks/use-search-profiles-by-name";
import useCreateBucketUrl from "@/hooks/use-create-bucket-url";
import ClientOnly from "@/components/client-only";

export default function TopNav() {
  const userContext = useUser();

  const router = useRouter();
  const pathname = usePathname();

  const [searchProfiles, setSearchProfiles] = useState<RandomUsers[]>([]);
  let [showMenu, setShowMenu] = useState<boolean>(false);

  const { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore();

  useEffect(() => {
    setIsEditProfileOpen(false);
  }, [setIsEditProfileOpen]);

  const handleSearch = debounce(
    async (event: { target: { value: string } }) => {
      if (event.target.value === "") return setSearchProfiles([]);

      try {
        /* eslint-disable-next-line react-hooks/rules-of-hooks */
        const result = await useSearchProfilesByName(event.target.value);
        if (result) return setSearchProfiles(result);

        setSearchProfiles([]);
      } catch (error) {
        console.log(error);
        setSearchProfiles([]);
      }
    },
    500
  );

  const goTo = () => {
    if (!userContext?.user) return setIsLoginOpen(true);
    router.push("/upload");
  };

  return (
    <nav
      id="TopNav"
      className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]"
    >
      <div
        className={`flex items-center justify-between gap-6 w-full px-2 mx-auto ${
          pathname === "/" ? "max-w-[1150px]" : ""
        }`}
      >
        <Link href="/">
          <Image
            className="min-w-[60px]"
            src="/logo.png"
            alt="Storyscape logo"
            width={60}
            height={60}
            priority
          />
        </Link>

        <div className="relative hidden md:flex items-center justify-end bg-[#F1F1F2] p-1 rounded-full max-w-[430px] w-full">
          <input
            type="text"
            onChange={handleSearch}
            className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
            placeholder="Search accounts"
          />
          <ClientOnly>
            {searchProfiles.length > 0 ? (
              <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1 rounded-md">
                {searchProfiles.map((profile) => (
                  <div
                    className="p-1"
                    key={profile.id}
                  >
                    <Link
                      href={`/profile/${profile?.id}`}
                      className="flex items-center justify-between w-full cursor-pointer hover:bg-lime-500 p-1 px-2 hover:text-neutral-950 rounded-md"
                      onClick={() => setSearchProfiles([])}
                    >
                      <div className="flex items-center">
                        <Image
                          className="rounded-md"
                          width={40}
                          height={40}
                          /* eslint-disable-next-line react-hooks/rules-of-hooks */
                          src={useCreateBucketUrl(profile?.image)}
                          alt="Profile picture"
                        />
                        <div className="truncate ml-2">{profile?.name}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}
          </ClientOnly>

          <div className="px-3 py-1 flex items-center border-l border-l-gray-300">
            <BiSearch
              color="#A1A2A7"
              size="22"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 ">
          <button
            onClick={goTo}
            className="flex items-center border rounded-md py-[6px] hover:bg-gray-100 pl-1.5"
          >
            <AiOutlinePlus
              color="#000000"
              size="22"
            />
            <span className="px-2 font-medium text-[15px]">Upload</span>
          </button>

          {!userContext?.user?.id ? (
            <div className="flex items-center">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center bg-lime-500 text-white border rounded-md px-3 py-[6px]"
              >
                <span className="whitespace-nowrap mx-4 font-medium text-[15px]">
                  Log in
                </span>
              </button>
              <BsThreeDotsVertical
                color="#161724"
                size="25"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setShowMenu((showMenu = !showMenu))}
                  className="mt-1 border border-gray-200 rounded-full"
                >
                  <Image
                    className="rounded-full"
                    /* eslint-disable-next-line react-hooks/rules-of-hooks */
                    src={useCreateBucketUrl(userContext?.user?.image || "")}
                    alt="Profile picture"
                    width={35}
                    height={35}
                  />
                </button>

                {showMenu ? (
                  <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[40px] right-0">
                    <button
                      onClick={() => {
                        router.push(`/profile/${userContext?.user?.id}`);
                        setShowMenu(false);
                      }}
                      className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <BiUser size="20" />
                      <span className="pl-2 font-semibold text-sm">
                        Profile
                      </span>
                    </button>

                    <button
                      onClick={async () => {
                        await userContext?.logout();
                        setShowMenu(false);
                      }}
                      className="flex items-center justify-start w-full py-3 px-1.5 hover:bg-gray-100 border-t cursor-pointer"
                    >
                      <FiLogOut size={20} />
                      <span className="pl-2 font-semibold text-sm">
                        Log out
                      </span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
