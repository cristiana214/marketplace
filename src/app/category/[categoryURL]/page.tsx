import ListProducts from "@/components/list-products";
import {
  GridItemEight,
  GridItemFour,
  GridItemTwelve,
  GridLayout,
} from "@/components/ui/grid";
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
      <GridItemTwelve>
        <h1 className="mb-8 text-4xl font-bold">{specificCategory?.name} </h1>
        <ListProducts url={params?.categoryURL} />
      </GridItemTwelve>
    </GridLayout>
  );
}
