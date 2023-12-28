import Link from "next/link";
import { usePathname } from "next/navigation";

import MenuItem from "./menu-item";
import ClientOnly from "@/components/client-only";
import MenuItemFollow from "./menu-item-follow";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div
      id="SideNav"
      className={`
      fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto
      ${pathname === "/" ? "lg:w-[310px]" : "lg:w-[220px]"}
  `}
    >
      <div className="lg:w-full w-[55px] mx-auto">
        <Link href="/">
          <MenuItem
            iconString="For You"
            colorString={pathname == "/" ? "#84cc16" : ""}
            sizeString="25"
          />
        </Link>
        <MenuItem
          iconString="Following"
          colorString="#000000"
          sizeString="25"
        />
        <MenuItem
          iconString="LIVE"
          colorString="#000000"
          sizeString="25"
        />

        <div className="border-b lg:ml-2 mt-2" />
        <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
          Suggested accounts
        </h3>

        <div className="lg:hidden block pt-3" />

        <ClientOnly>
          <div className="cursor-pointer">
            <MenuItemFollow
              user={{
                id: "1",
                name: "user name",
                image: "https://placehold.co/50",
              }}
            />
          </div>
        </ClientOnly>

        <button className="lg:block hidden text-lime-500 pt-1.5 pl-2 text-[13px]">
          See all
        </button>

        {true ? (
          <>
            <div className="border-b lg:ml-2 mt-2" />
            <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
              Following accounts
            </h3>

            <div className="lg:hidden block pt-3" />
            <ClientOnly>
              <div className="cursor-pointer">
                <MenuItemFollow
                  user={{
                    id: "1",
                    name: "user name",
                    image: "https://placehold.co/50",
                  }}
                />
              </div>
            </ClientOnly>

            <button className="lg:block hidden text-lime-500 pt-1.5 pl-2 text-[13px]">
              See more
            </button>
          </>
        ) : null}

        <div className="lg:block hidden border-b lg:ml-2 mt-2" />

        <div className="lg:block hidden text-[11px] text-gray-500">
          <p className="pt-4 px-2">
            About Newsroom Storyscape Shop Contact Careers
          </p>
          <p className="pt-4 px-2">
            Storyscape for Good Advertise Developers Transparency Storyscape
            Rewards Storyscape Browse Storyscape Embeds
          </p>
          <p className="pt-4 px-2">
            Help Safety Terms Privacy Creator Portal Community Guidelines
          </p>
          <p className="pt-4 px-2">© 2023 Storyscape</p>
        </div>
      </div>
    </div>
  );
}
