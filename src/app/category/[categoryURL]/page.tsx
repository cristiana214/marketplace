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
import ListCategoryTypes from "@/components/list-category-types";

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
    (category) => category.categoryUrl === params.categoryURL,
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="mb-8 text-4xl font-bold">
          {specificCategory?.categoryName}
        </h1>
      </div>
      <ListCategoryTypes url={params?.categoryURL} />
      <ListProducts type="categoryUrl" url={params?.categoryURL} />
    </div>
  );
}
