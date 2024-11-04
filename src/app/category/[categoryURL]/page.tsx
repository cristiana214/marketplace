"use client";

import ListProducts from "@/components/list-products";

// import { siteConfig } from "@/config/site";
// import type { Metadata } from "next";
import { categories } from "@/lib/data/farm";
import ListCategoryTypes from "@/components/list-category-types";
import { useCategory } from "@/hooks/query/useCategory";

export default function CategoryPage({
  params,
}: {
  params: { categoryURL: string };
}) {
  const specificCategory = categories.find(
    (category) => category.categoryUrl === params.categoryURL,
  );
  const { data, isLoading, error } = useCategory({
    categoryUrl: params?.categoryURL,
  });
  const category = data?.category;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{category?.categoryName}</h1>
        </div>
        <h2 className="text-1xl mt-2 font-normal leading-tight tracking-tighter">
          {category?.categoryDescription}
        </h2>
        {/* <Link href={`/category/${categoryType?.categoryUrl}/`}>
          <Badge variant="outline">{categoryType?.categoryName}</Badge>
        </Link> */}
      </div>
      <ListCategoryTypes url={params?.categoryURL} />
      <ListProducts type="categoryUrl" url={params?.categoryURL} />
    </div>
  );
}
