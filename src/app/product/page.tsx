import ListCategory from "@/components/list-category";
import { GridItemEight, GridItemFour, GridLayout } from "@/components/ui/grid";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
export default function ItemPage() {
  return (
    <GridLayout>
      <GridItemEight>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Product Item
        </h1>
        <h2 className="text-4xl">Add to cart</h2>
        this will be updated with actual page content Lorem ipsum, dolor sit
        amet consectetur adipisicing elit. Harum ut possimus veritatis
        cupiditate a vitae nisi est dolorum, quaerat iste tempore accusamus
        voluptate! Dolore nam vel, totam quaerat sed doloremque?
        <ListCategory />
      </GridItemEight>
      <GridItemFour>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex facere,
        mollitia natus sit unde error ducimus perferendis, ipsam pariatur id
        excepturi non quae qui, placeat laudantium dolorem odit asperiores
        impedit.
      </GridItemFour>
    </GridLayout>
  );
}