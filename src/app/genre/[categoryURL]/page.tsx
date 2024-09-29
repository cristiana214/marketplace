import CategoryList from "@/components/list-category";
import { GridItemEight, GridItemFour, GridLayout } from "@/components/ui/grid";
import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";

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
export default function productPage() {
  return (
    <GridLayout>
      <GridItemEight>
        <h1 className="mb-8 text-4xl font-bold"> Vegetables</h1>
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
