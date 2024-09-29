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
    icon: "/agrilogo.png",
    shortcut: "/agrilogo.png",
    apple: "/agrilogo.png",
  },
};
export default function CategoryPage() {
  return (
    <GridLayout>
      <GridItemEight>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Category List
        </h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum ut
        possimus veritatis cupiditate a vitae nisi est dolorum, quaerat iste
        tempore accusamus voluptate! Dolore nam vel, totam quaerat sed
        doloremque?
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
