// import { products } from "@/lib/data/farm";

"use client";

import ListProducts from "@/components/list-products";

import DropdownCategory from "@/components/dropdown-category";
import ListCategoryTypes from "@/components/list-category-types";
import { useCategoryType } from "@/hooks/query/useCategoryType";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{categoryType?.typeName}</h1>
        </div>
        <h2 className="mt-2 text-xl font-normal leading-tight tracking-tighter">
          {categoryType?.typeDescription}
        </h2>
        <Link href={`/category/${categoryType?.categoryUrl}/`}>
          <Badge variant="outline">{categoryType?.categoryName}</Badge>
        </Link>
      </div>
      <ListCategoryTypes url={params.typeURL} />
      <ListProducts type="categoryTypeUrl" url={params.typeURL} />
    </div>
  );
}
