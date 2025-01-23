// import { products } from "@/lib/data/farm";

"use client";

import ListProducts from "@/components/list-products";

import DropdownCategory from "@/components/dropdown-category";
import ListCategoryTypes from "@/components/list-category-types";
import { useCategoryType } from "@/hooks/query/useCategoryType";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export default function SubCategory({
  params,
}: {
  params: { typeURL: string };
}) {
  const { data, isLoading, error } = useCategoryType({
    categoryTypeUrl: params?.typeURL,
  });
  const categoryType = data?.categoryType;

  return (
    <div className="container mx-auto w-8/12 p-4">
      <div className="mb-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">{categoryType?.typeName}</h1>
          <Link
            className="ml-2"
            href={`/category/${categoryType?.categoryUrl}/`}
          >
            <Badge variant="outline">{categoryType?.categoryName}</Badge>
          </Link>
        </div>
        <h2 className="text-1xl mt-2 font-normal leading-tight tracking-tighter">
          {categoryType?.typeDescription}
        </h2>
      </div>
      <ListCategoryTypes url={params.typeURL} />
      <ListProducts type="categoryTypeUrl" url={params.typeURL} />
    </div>
  );
}
