"use client";
import {
  UserGroupIcon,
  UserIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  HandRaisedIcon,
  TrophyIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  PERSONS_ROUTE,
  PRINCESSES_ROUTE,
  SOC_CAP_ROUTE,
  VORHOUSES_ROUTE,
  SESSIONS_ROUTE,
} from "@/routes";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Главная", href: "/dashboard", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  // { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  { name: "Персонажи", href: PERSONS_ROUTE, icon: UserIcon },
  { name: "Фор семьи", href: VORHOUSES_ROUTE, icon: UserGroupIcon },
  { name: "Заседания", href: SESSIONS_ROUTE, icon: HandRaisedIcon },
  { name: "Принцессы", href: PRINCESSES_ROUTE, icon: TrophyIcon },
  { name: "Соц. кап.", href: SOC_CAP_ROUTE, icon: ScaleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
