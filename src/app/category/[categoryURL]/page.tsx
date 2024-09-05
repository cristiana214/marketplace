import CategoryList from "@/components/list-category";
import { GridItemEight, GridItemFour, GridLayout } from "@/components/ui/grid";
import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: `Category ${siteConfig.name}`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
export default function CategoryPage() {
  return (
    <GridLayout>
      <GridItemEight>
        <h1 className="mb-8 text-4xl font-bold"> Memes</h1>
        <CategoryList />
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
