import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "./menu-item";

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
      </div>
    </div>
  );
}
