import * as React from "react";
import Link from "next/link";

import Image from "next/image";
import type { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import logo from "@/public/agrilogo.png";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src={logo}
          alt="Fresh Veggies Farm"
          width={40}
          height={40}
          className="border-1 rounded-md"
        />
        <span className="inline-block font-bold leading-tight md:leading-normal">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground hover:font-semibold hover:text-slate-700 dark:hover:text-slate-400",
                    item.disabled && "cursor-not-allowed opacity-80",
                    index > 0 ? "hidden md:flex" : "", // Hide all but the first item on mobile
                  )}
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null}
    </div>
  );
}
