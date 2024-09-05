import ListProducts from "@/components/list-products";
import { GridItemEight, GridItemFour, GridLayout } from "@/components/ui/grid";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { categories } from "@/lib/data/farm";

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
export default function CategoryPage({
  params,
}: {
  params: { categoryURL: string };
}) {
  const specificCategory = categories.find(
    (category) => category.url === params.categoryURL,
  );

  return (
    <GridLayout>
      <GridItemEight>
        <h1 className="mb-8 text-4xl font-bold">{specificCategory?.name} </h1>
        <ListProducts url={params?.categoryURL} />
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
